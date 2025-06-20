import { expect, test } from "bun:test";
import { relative } from "node:path";
import { Builder, BuildFile, Test } from "./Builder";

function testBuilder(
  fileContents: Record<string /* rootRelativePath */, string>,
): Builder {
  return new Builder({
    srcRoot: "./test/src",
    outputDir: "./test/dist",
    debug: {
      async readFile(path: string, _: "utf-8") {
        const contents = fileContents[relative("./test/src", path)];
        if (!contents) {
          throw new Error("Invalid path");
        }
        return contents;
      },
    },
  });
}

async function renderFile(
  builder: Builder,
  rootRelativePath: string,
): Promise<string> {
  const file = new BuildFile(builder, rootRelativePath);
  const dom = await builder[Test.renderPage](file);
  return dom.serialize();
}

test("basic", async () => {
  const builder = testBuilder({
    "index.html": "<h1>Hello world!</h1>",
  });
  expect(await renderFile(builder, "index.html")).toEqual(
    `<html><head></head><body><h1>Hello world!</h1></body></html>`,
  );
});

test("Markdown", async () => {
  const builder = testBuilder({
    "index.html": `<pre data-template="markdown">
## This is is a [Markdown](https://commonmark.org/) header.
</pre>`,
  });
  expect(await renderFile(builder, "index.html")).toEqual(
    `<html><head></head><body><h2>This is is a <a href=\"https://commonmark.org/\">Markdown</a> header.</h2>\n</body></html>`,
  );
});
