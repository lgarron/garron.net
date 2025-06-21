# Custom SSG

I've been writing websites for two decades, and yet to find anything that
improves on the ergonomics of PHP. That doesn't mean I want to use PHP, but it
does mean I'm reluctant to use anything that's significantly more complex to
install or use.

I'd also like to generate static sites when possible, as this ensures stable,
performant sites. But I have been dissatisfied with the assumptions built into
other static site generators.

After two decades without a good low-abstraction tool, I wrote something that:

- Is explicit rather than implicit.
  - No magic. All output is generated from explicit code in the source tree.
- Reuses existing technologies (e.g. DOM parsing and semantics) as much as possible.
- Uses composition over inheritance.
  - It should be easy to reuse templates but also simple to build a page with arbitrary contents and functionality.
- Allows writing performant pages.
  - In particular, it should be easy to inline critical code (e.g. CSS that avoids a flash of unstyled content) but also to load shared code when that makes sense.

Features are built on semantic HTML that can be written like normal using your editor's HTML language features.

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
<link rel="include" href="./relative/path/to/file.fragment">
```

This can be used both:

- in the `<head>`, and
- in the `<body>`.

Note that:

- You can inline CSS by including a `<style>` tag in the fragment.

Note that these includes currently:

- Are each inlined as a [fragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment), replacing the `<link>` tags that included it.
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

```html
<pre data-template="markdown">
Here is some code:
<p><code>console.log("Hello world!");</code></p>
</pre>
```

By contrast, if you indent all the contents of `<pre>`, then all the contents will be interpreted as a big code block:

```html
<pre data-template="markdown">
    This line and the following line's source code will be displayed together on the rendered page.
    <p><code>console.log("Hello world!");</code></p>
</pre>
```

Nested HTML inside Markdown may itself contain nested Markdown, and so on (arbitrarily nested).

## Non-features

- No theming. (Bring your own, via CSS. Consider [`minimal-html-style`](https://github.com/lgarron/minimal-html-style))
- No automatic collation/indexing/blog mnagement.
- No automatic reload in dev.
- No source code highlighting for code snippets.
