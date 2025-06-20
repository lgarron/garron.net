import { Builder } from "./ssg/Builder";

export const builder = new Builder({
  srcRoot: "./src/garron.net/",
  outputDir: "./dist/web/garron.net/test/",
  debugOutput: true,
});
