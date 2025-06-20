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
  expect(await renderFile(builder, "page.html")).toEqual(
    `<!DOCTYPE html><html><head>
    <meta charset=\"utf-8\">
    <title></title>
    <link rel=\"stylesheet\" href=\"./style.css\">
    <script src=\"./script.js\" type=\"module\"></script>
  </head>
  <body>
    <h1>Hello there!</h1>
  
</body></html>`,
  );
});

test("Include", async () => {
  const builder = testBuilder({
    "main.html": `<link rel="template" href="./header.fragment">
<h1>Hi</h1>`,
    "header.fragment": `<header>
  <a href="./foo/">Foo!</a>
  <a href="./bar/">Bar?</a>
</header>`,
  });
  expect(await renderFile(builder, "main.html")).toEqual(
    `<html><head><header>
  <a href=\"./foo/\">Foo!</a>
  <a href=\"./bar/\">Bar?</a>
</header>
</head><body><h1>Hi</h1></body></html>`,
  );
});

test("Markdown", async () => {
  const builder = testBuilder({
    "index.html": `<pre data-template="markdown">
## This is is a [Markdown](https://commonmark.org/) header.
</pre>`,
  });
  expect(await renderFile(builder, "index.html")).toEqual(
    `<html><head></head><body><h2>This is is a <a href=\"https://commonmark.org/\">Markdown</a> header.</h2>
</body></html>`,
  );
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
  expect(await renderFile(builder, "index.html")).toEqual(
    `<html><head></head><body><h2>This is is a <a href=\"https://commonmark.org/\">Markdown</a> header.</h2>
<div>
  <p>This is <em>Markdown nested inside HTML nested inside Markdown nested inside HTML</em>! 🤯</p>

</div>
</body></html>`,
  );
});
