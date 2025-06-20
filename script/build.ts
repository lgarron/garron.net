import { Builder } from "./ssg/Builder";

const builder = new Builder({
  srcRoot: "./src/garron.net/",
  outputDir: "./dist/web/garron.net/",
  debugOutput: true,
});

await builder.build();
