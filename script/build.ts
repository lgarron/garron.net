import { cp, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { exit } from "node:process";
import { JSDOM } from "jsdom";
import { PrintableShellCommand } from "printable-shell-command";

let exitCode = 0;

const start = performance.now();

class BuildFile {
  constructor(
    public builder: Builder,
    public rootRelativePath: string,
  ) {}

  sourcePath(): string {
    return join(this.builder.options.srcRoot, this.rootRelativePath);
  }

  outputPath(): string {
    return join(this.builder.options.outputDir, this.rootRelativePath);
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
  relativeBuildFile(relativePath: string): BuildFile {
    const path = relative(dirname(this.rootRelativePath), relativePath);
    return new BuildFile(this.builder, path);
  }
}

interface BuilderOptions {
  srcRoot: string;
  outputDir: string;
  debugOutput?: true;
}

class Builder {
  constructor(public options: BuilderOptions) {}

  async templateReplace(
    file: BuildFile,
    dom: JSDOM,
    elementOrFragment: HTMLElement | DocumentFragment,
  ): Promise<void> {
    for (const templateIncludeElem of elementOrFragment.querySelectorAll(
      'link[rel="template"]',
    )) {
      const src = templateIncludeElem.getAttribute("href");
      if (!src) {
        console.error("Missing `href`. Ignoring.");
        exitCode = 0;
        continue;
      }
      const included = file.relativeBuildFile(src);
      if (this.options.debugOutput) {
        console.info(
          `[Include] ${file.rootRelativePath} → ${included.rootRelativePath}`,
        );
      }
      const rendered = await this.renderFragment(included, dom);
      templateIncludeElem.replaceWith(rendered);
    }
  }

  async renderFragment(file: BuildFile, dom: JSDOM): Promise<DocumentFragment> {
    const fragment = await file.sourceAsFragment();
    await this.templateReplace(file, dom, fragment);
    return fragment;
  }

  async renderPage(file: BuildFile): Promise<JSDOM> {
    const dom = await file.sourceAsDOM();
    // TODO: do we want to enforce serialized processing
    await Promise.all([
      this.templateReplace(file, dom, dom.window.document.head),
      this.templateReplace(file, dom, dom.window.document.body),
    ]);
    return dom;
  }

  async buildFile(rootRelativePath: string) {
    const file = new BuildFile(this, rootRelativePath);
    const domString = (await this.renderPage(file)).serialize();
    await writeFile(file.outputPath(), domString, "utf-8");
    console.log(`[Built file] ${file.sourcePath()} → ${file.outputPath()}`);
    await new PrintableShellCommand("bun", [
      ["x", "biome"],
      "format",
      "--write",
      file.outputPath(),
    ]).spawnNode().success;
  }

  async build(options: { files: string[] }): Promise<void> {
    console.log("<!---------------->");
    console.log("<build>");
    await cp(this.options.srcRoot, this.options.outputDir, { recursive: true }); // TODO: exclude files from `files` so we can run in parallel with building.
    await Promise.all(options.files.map((file) => this.buildFile(file)));
    console.log("</build>");
  }
}

const builder = new Builder({
  srcRoot: "./src/garron.net",
  outputDir: "./dist/web/garron.net",
  debugOutput: true,
});

await builder.build({ files: ["./index.html"] });

console.log(`Ran in ${performance.now() - start}ms`);
exit(exitCode);
