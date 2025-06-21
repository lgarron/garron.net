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
          throw new Error(`Invalid path: ${path}`);
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
  return builder[Test.renderPageString](file);
}

test("basic", async () => {
  const builder = testBuilder({
    "index.html": "<h1>Hello world!</h1>",
  });
  expect(await renderFile(builder, "index.html")).toMatchSnapshot();
});

test("Full page", async () => {
  const builder = testBuilder({
    "page.html": `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="./style.css">
    <script src="./script.js" type="module"></script>
  </head>
  <body>
    <h1>Hello there!</h1>
  </body>
</html>`,
  });
  expect(await renderFile(builder, "page.html")).toMatchSnapshot();
});

test("Include", async () => {
  const builder = testBuilder({
    "main.html": `<link rel="include" href="./header.fragment">
<h1>Hi</h1>`,
    "header.fragment": `<header>
  <a href="./foo/">Foo!</a>
  <a href="./bar/">Bar?</a>
</header>`,
  });
  expect(await renderFile(builder, "main.html")).toMatchSnapshot();
});

test("Markdown", async () => {
  const builder = testBuilder({
    "index.html": `<pre data-template="markdown">
## This is is a [Markdown](https://commonmark.org/) header.
</pre>`,
  });
  expect(await renderFile(builder, "index.html")).toMatchSnapshot();
});

test("Nested Markdown", async () => {
  const builder = testBuilder({
    "index.html": `<pre data-template="markdown">
## This is is a [Markdown](https://commonmark.org/) header.
<div>
  <pre data-template="markdown">
  This is *Markdown nested inside HTML nested inside Markdown nested inside HTML*! 🤯
  </pre>
</div>
</pre>`,
  });
  expect(await renderFile(builder, "index.html")).toMatchSnapshot();
});
