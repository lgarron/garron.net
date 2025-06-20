import {
	cp,
	glob,
	mkdir,
	readFile as nodeReadFile,
	rm,
	writeFile,
} from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, relative, resolve } from "node:path";
import { cwd, cwd as processCwd } from "node:process";
import { type FSWatcher, watch } from "chokidar";
import { HtmlRenderer, Parser } from "commonmark";
import { html_beautify } from "js-beautify";
import { JSDOM } from "jsdom";
import { PrintableShellCommand } from "printable-shell-command";
import { default as handler } from "serve-handler";

const PORT = 1337;

export const Test = {
	renderPageString: Symbol("renderPageString"),
} as const;

export class BuildFile {
	constructor(
		public builder: Builder,
		public rootRelativePath: string,
	) {}

	sourcePath(): string {
		return resolve(this.builder.options.srcRoot, this.rootRelativePath);
	}

	outputPath(): string {
		return resolve(this.builder.options.outputDir, this.rootRelativePath);
	}

	toString(): string {
		return this.rootRelativePath;
	}

	async trimmedContents(): Promise<string> {
		const readFile = this.builder.options.debug?.readFile ?? nodeReadFile;
		// TODO: Optional trimming?
		return (await readFile(this.sourcePath(), "utf-8")).trim();
	}

	async sourceAsDOM(): Promise<JSDOM> {
		return new JSDOM(await this.trimmedContents());
	}

	async sourceAsFragment(): Promise<DocumentFragment> {
		return JSDOM.fragment(await this.trimmedContents());
	}

	// TODO: include in graph.
	relativeBuildFile(newPeerRelativePath: string): BuildFile {
		const newRootRelativePath = this.builder.resolve(
			this.rootRelativePath,
			newPeerRelativePath,
		);
		return new BuildFile(this.builder, newRootRelativePath);
	}
}

interface BuilderOptions {
	/** Required. */
	srcRoot: string;
	/** Required. */
	outputDir: string;
	/** Default: `false` */
	debugOutput?: boolean;
	/** Default: `true` */
	parallel?: boolean;
	commonmarkOptions?: {
		/** Default: `false` */
		safe?: boolean;
		/** Default: `"<br>"` */
		softbreak?: string;
	};
	/** Default: `undefined` */
	debug?: {
		readFile?: (rootRelativePath: string, _: "utf-8") => Promise<string>;
	};
}

// Debouncer, but always ensures a final call is made upon/after the last invocation.
// biome-ignore lint/suspicious/noExplicitAny: Required to write the type.
function rateLimited<T extends Array<any>>(
	fn: (...t: T) => void,
	milliseconds: number,
): (...t: T) => void {
	let lastFnInvocation = performance.now();
	let timeout: NodeJS.Timeout | undefined;
	return (...t: T) => {
		if (timeout) {
			return;
		}
		const invoke = () => {
			lastFnInvocation = performance.now();
			timeout = undefined;
			fn(...t);
		};
		const elapsed = performance.now() - lastFnInvocation;
		if (elapsed < milliseconds) {
			timeout = setTimeout(invoke, milliseconds - elapsed);
		} else {
			invoke();
		}
	};
}

export class Builder {
	buildIndex: number = 0;

	constructor(public options: BuilderOptions) {}

	/** Returns the number Markdown sections that were found and replaced. */
	async markdownReplace(
		elementOrFragment: HTMLElement | DocumentFragment,
	): Promise<{ foundAndReplaced: number }> {
		let foundAndReplaced = 0;
		for (const templateIncludeElem of elementOrFragment.querySelectorAll(
			'pre[data-template="markdown"]',
		)) {
			const innerHTML = templateIncludeElem.innerHTML ?? "";
			const parsed = this.commonmark.parser.parse(innerHTML);
			const htmlText = this.commonmark.writer.render(parsed);
			// TODO: recursively replace Markdown inside inline HTML inside the Markdown we just parsed? Do we need to parse in a different order to enable this? Do we want to enable this?
			templateIncludeElem.replaceWith(JSDOM.fragment(htmlText));
			foundAndReplaced++;
		}
		return { foundAndReplaced };
	}

	async templateReplace(
		file: BuildFile,
		dom: JSDOM,
		elementOrFragment: HTMLElement | DocumentFragment,
		options?: { watcher?: FSWatcher },
	): Promise<void> {
		for (const templateIncludeElem of elementOrFragment.querySelectorAll(
			'link[rel="template"]',
		)) {
			const src = templateIncludeElem.getAttribute("href");
			if (!src) {
				// console.error("Missing `href`. Ignoring."); // TODO: error recovery
				throw new Error("Missing `href` on a template link.");
			}
			const included = file.relativeBuildFile(src);

			// Explicitly track changes to known dependency files, even if they are outside the source root dir.
			// TODO: check whether we need to filter out duplicates to avoid perf issues with `chokidar`?
			// TODO: It seems this causes an event to be fired just because the file was added. Can we avoid this without losing track of any other changes?
			options?.watcher?.add(resolve(cwd(), included.sourcePath()));

			if (this.options.debugOutput) {
				console.info(
					`[Include] ${file.rootRelativePath} → ${included.rootRelativePath}`,
				);
			}
			const rendered = await this.renderFragment(included, dom);
			templateIncludeElem.replaceWith(rendered);
		}
	}

	// We can't use relative URL resolution like grown-ups, so we cobble together `node`'s APIs with the finesse of Duplo blocks.
	resolve(fromRootRelativePath: string, toPeerRelativePath: string): string {
		const { srcRoot } = this.options;
		return relative(
			srcRoot,
			resolve(srcRoot, dirname(fromRootRelativePath), toPeerRelativePath),
		);
	}

	// biome-ignore lint/suspicious/noExplicitAny: Required to express the type.
	async parallelDependingOnOptions<T extends Array<() => Promise<any>>>(
		promiseFns: T,
	): Promise<void> {
		if (this.options.parallel ?? true) {
			await Promise.all(promiseFns.map((promiseFn) => promiseFn()));
		} else {
			for (const promiseFn of promiseFns) {
				await promiseFn();
			}
		}
	}

	async renderFragment(file: BuildFile, dom: JSDOM): Promise<DocumentFragment> {
		const fragment = await file.sourceAsFragment();
		await this.templateReplace(file, dom, fragment);
		return fragment;
	}

	private async renderPageDOM(
		file: BuildFile,
		options?: { watcher?: FSWatcher },
	): Promise<JSDOM> {
		const dom = await file.sourceAsDOM();
		// Process Markdown before templating, to allow interleaving.
		while (
			(await this.markdownReplace(dom.window.document.body))
				.foundAndReplaced !== 0
		) {
			/* no-op */
		}
		await this.parallelDependingOnOptions([
			() => this.templateReplace(file, dom, dom.window.document.head, options),
			() => this.templateReplace(file, dom, dom.window.document.body, options),
		]);
		return dom;
	}

	private async renderPageString(
		file: BuildFile,
		options?: { watcher?: FSWatcher },
	): Promise<string> {
		return html_beautify((await this.renderPageDOM(file, options)).serialize());
	}
	[Test.renderPageString](...args: Parameters<Builder["renderPageString"]>) {
		return this.renderPageString(...args);
	}

	private async buildFile(
		rootRelativePath: string,
		options?: { watcher?: FSWatcher },
	) {
		const file = new BuildFile(this, rootRelativePath);
		const domString = await this.renderPageString(file, options);
		await writeFile(file.outputPath(), domString, "utf-8");
		console.log(`[Built file] ${file.rootRelativePath}`);
	}

	private async buildFiles(
		files: string[],
		options?: {
			watcher?: FSWatcher;
		},
	): Promise<void> {
		const start = performance.now();

		const buildIndex = ++this.buildIndex;
		console.log("<!---------------->");
		console.log(`<build data-build-id=\"${buildIndex}\">`);
		if (this.options.debugOutput) {
			console.log(`Building files:\n- ${files.join("\n- ")}`);
		}
		await rm(this.options.outputDir, { recursive: true, force: true });
		await mkdir(this.options.outputDir, { recursive: true });
		// TODO: exclude files from `files` so we can run in parallel with building.
		// TODO: exclude fragments?
		await cp(this.options.srcRoot, this.options.outputDir, { recursive: true });
		await this.parallelDependingOnOptions(
			files.map((file) => () => this.buildFile(file, options)),
		);
		console.log(`Ran in ${performance.now() - start}ms`);
		console.log(`</build> <!-- data-build-id=${buildIndex} -->`);
	}

	async build(options?: { watcher?: FSWatcher }): Promise<void> {
		// Recompile everything for now, because we don't have a dependency graph.
		const files: string[] = [];
		for await (const file of glob("**/*.html", { cwd: this.options.srcRoot })) {
			files.push(file);
		}
		await this.buildFiles(files, options);

		// TODO: filter these during the file copy
		// TODO: `bun` has a bug, so this doesn't work at all. https://github.com/oven-sh/bun/issues/20507
		// https://github.com/oven-sh/bun/issues/20507
		// for await (const path of glob("**/*.ssg", {
		//   cwd: this.options.outputDir,
		// })) {
		//   await rm(path, { recursive: true });
		//
	}

	async watch(options?: {
		signal?: AbortSignal;
		buildDoneCallback?: () => void;
	}): Promise<void> {
		console.info("Watching…");
		const fn = rateLimited(async () => {
			await this.build({ watcher });
			options?.buildDoneCallback?.();
		}, 1000);

		const cwd = resolve(processCwd(), this.options.srcRoot);
		const watcher = watch(".", {
			// ignored: (path, stats) => stats?.isFile() && !path.endsWith(".js"), // only watch js files
			persistent: true,
			cwd,
		});
		watcher.on("add", fn);
		watcher.on("change", fn);
		watcher.on("unlink", fn);
		options?.signal?.addEventListener("abort", () => {
			watcher.close();
		});
	}

	async serve(options?: {
		signal?: AbortSignal;
		port?: number;
	}): Promise<void> {
		const server = createServer((request, response) => {
			return handler(request, response, { public: this.options.outputDir });
		});

		// TODO: interleave this more cleanly with the build.
		await mkdir(this.options.outputDir, { recursive: true });

		const port = options?.port ?? PORT;
		const url = new URL("http://localhost/");
		url.port = `${port}`;
		server.listen(port, () => {
			console.log(`Running at ${url}`);
		});

		const buildDoneCallback = (() => {
			if (
				// biome-ignore lint/complexity/useLiteralKeys: Record access
				process.env["EXPERIMENTAL_RELOAD_CHROME_MACOS"] === "1"
			) {
				const { origin } = url;
				console.log(
					`\nEXPERIMENTAL_RELOAD_CHROME_MACOS is set. The current Chrome tab (if it begins with \`${origin}\`) will refresh after every build.\n`,
				);
				return () => refreshChrome(origin);
			}
			return () => {};
		})();

		this.watch({
			...options,
			buildDoneCallback,
		});
		options?.signal?.addEventListener("abort", () => {
			server.close();
		});
		// TODO: ensure that we don't hang the main process after the `AbortSignal` is processed.
	}

	#commonmarkCached: { parser: Parser; writer: HtmlRenderer } | undefined;
	get commonmark(): { parser: Parser; writer: HtmlRenderer } {
		// biome-ignore lint/suspicious/noAssignInExpressions: Caching pattern
		return (this.#commonmarkCached ??= {
			parser: new Parser(),
			writer: new HtmlRenderer({
				safe: this.options.commonmarkOptions?.safe ?? false,
				softbreak: this.options.commonmarkOptions?.softbreak ?? "<br>",
			}),
		});
	}
}

function refreshChrome(origin: string): void {
	const validatedOrigin = new URL(origin).origin; // Validation.
	console.log(
		"🔄 Refreshing the current page in Chrome (if " +
			validatedOrigin.toString() +
			").",
	);
	new PrintableShellCommand("osascript", [
		"-e",
		`tell application "Google Chrome"
  set theURL to get URL of the active tab of its first window
  if theURL starts with ${JSON.stringify(validatedOrigin.toString())} then
    tell the active tab of its first window to reload
  end if
end tell`,
	]).spawnNode();
}
