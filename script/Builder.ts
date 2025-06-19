import { cp, glob, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, relative, resolve } from "node:path";
import { cwd, cwd as processCwd } from "node:process";
import { type FSWatcher, watch } from "chokidar";
import { JSDOM } from "jsdom";
import { PrintableShellCommand } from "printable-shell-command";
import { default as handler } from "serve-handler";

class BuildFile {
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
  srcRoot: string;
  outputDir: string;
  debugOutput?: true;
  parallel?: boolean;
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

class Builder {
  buildIndex: number = 0;

  constructor(public options: BuilderOptions) {}

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
  async parallelDependingOnOptions<T extends Array<Promise<any>>>(
    promises: T,
  ): Promise<void> {
    if (this.options.parallel ?? true) {
      await Promise.all(promises);
    } else {
      for (const promise of promises) {
        await promise;
      }
    }
  }

  async renderFragment(file: BuildFile, dom: JSDOM): Promise<DocumentFragment> {
    const fragment = await file.sourceAsFragment();
    await this.templateReplace(file, dom, fragment);
    return fragment;
  }

  async renderPage(
    file: BuildFile,
    options?: { watcher?: FSWatcher },
  ): Promise<JSDOM> {
    const dom = await file.sourceAsDOM();
    // TODO: do we want to enforce serialized processing
    await this.parallelDependingOnOptions([
      this.templateReplace(file, dom, dom.window.document.head, options),
      this.templateReplace(file, dom, dom.window.document.body, options),
    ]);
    return dom;
  }

  private async buildFile(
    rootRelativePath: string,
    options?: { watcher?: FSWatcher },
  ) {
    const file = new BuildFile(this, rootRelativePath);
    const domString = (await this.renderPage(file, options)).serialize();
    await writeFile(file.outputPath(), domString, "utf-8");
    console.log(`[Built file] ${file.sourcePath()} → ${file.outputPath()}`);
    await new PrintableShellCommand("bun", [
      ["x", "biome"],
      "format",
      "--write",
      file.outputPath(),
    ]).spawnNode().success;
  }

  private async buildFiles(
    files: string[],
    options?: {
      watcher?: FSWatcher;
    },
  ): Promise<void> {
    const buildIndex = ++this.buildIndex;
    console.log("<!---------------->");
    console.log(`<build data-build-id=\"${buildIndex}\">`);
    console.log(`Building files:\n- ${files.join("\n- ")}`);
    await rm(this.options.outputDir, { recursive: true });
    await mkdir(this.options.outputDir, { recursive: true });
    // TODO: exclude files from `files` so we can run in parallel with building.
    // TODO: exclude fragments?
    await cp(this.options.srcRoot, this.options.outputDir, { recursive: true });
    await this.parallelDependingOnOptions(
      files.map((file) => this.buildFile(file, options)),
    );
    console.log(`</build> <!-- data-build-id=${buildIndex} -->`);
  }

  async buildAllHTML(options?: { watcher?: FSWatcher }): Promise<void> {
    const start = performance.now();

    // Recompile everything for now, because we don't have a dependency graph.
    const files: string[] = [];
    for await (const file of glob("**/*.html", { cwd: this.options.srcRoot })) {
      files.push(file);
    }
    await this.buildFiles(files, options);
    console.log(`Ran in ${performance.now() - start}ms`);
  }

  async watch(options?: { signal?: AbortSignal }): Promise<void> {
    console.info("Watching…");
    const fn = rateLimited(() => this.buildAllHTML({ watcher }), 1000);

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

  async serve(options?: { signal?: AbortSignal }): Promise<void> {
    const server = createServer((request, response) => {
      // You pass two more arguments for config and middleware
      // More details here: https://github.com/vercel/serve-handler#options
      return handler(request, response, { public: "./dist/web/garron.net/" });
    });

    server.listen(3000, () => {
      console.log("Running at http://localhost:3000");
    });

    this.watch(options);
    options?.signal?.addEventListener("abort", () => {
      server.close();
    });
    // TODO: ensure that we don't hang the main process after the `AbortSignal` is processed.
  }
}

export const builder = new Builder({
  srcRoot: "./src/garron.net",
  outputDir: "./dist/web/garron.net",
  debugOutput: true,
});
