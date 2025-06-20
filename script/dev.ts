import { Builder } from "./ssg";

const builder = new Builder({
  srcRoot: "./src/garron.net/",
  outputDir: "./.cache/dev/web/garron.net/",
});

await builder.serve();
