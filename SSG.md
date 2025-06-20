# Custom SSG

## Usage

```js
const builder = new Builder({
  srcRoot: "./src/garron.net/",
  outputDir: "./dist/web/garron.net/"
});

// Build once
await builder.build();

// Watch for changes and serve locally
await builder.serve();
```

## Includes

To include part of an HTML page with a fragment, use a `<link>` as follows:

```html
<link rel="template" href="./relative/path/to/file.fragment">
```

This can be used both:

- in the `<head>`, and
- in the `<body>`.

Note that:

- You can inline CSS by including a `<style>` tag in the fragment.

Note that includes currently:

- Are each inlined as a fragment, replacing the `<link>` tags that included it.
- Are recursively evaluated. Each `<link>`'s `href` attribute is resolved relative to the file it appears in.
- Do not accept any parameters. (To affect the styling of included content, use CSS.)
- Do not support any kind of customization or interpolation.

## Markdown

To render a section of Markdown, use a `<pre>` tag as follows:

```html
<pre data-template="markdown">
## This is is a [Markdown](https://commonmark.org/) header.
</pre>
```

Markdown may contain nested HTML (which is valid Markdown), but it will be round-tripped through the Markdown parser. Make sure that top-level HTML elements in the Markdown source are unindented. For example, this will probably do what you want:

```HTML:
<pre data-template="markdown">
Here is some code:
<p><code>console.log("Hello world!");</code></p>
</pre>
```

By contrast, if you indent all the contents of `<pre>`, then all the contents will be interpreted as a big code block:

```HTML:
<pre data-template="markdown">
    Here is some code:
    <p><code>console.log("Hello world!");</code></p>
</pre>
```

Nested HTML inside Markdown may itself contain nested Markdown, and so on (arbitrarily nested).

## Non-features

- No automatic theming.
- No automatic collation/indexing/blog mnagement.
- No automatic reload in dev.
- No source code highlighting for code snippets.
