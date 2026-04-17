import { Builder } from "linkrel-ssg";

export const SRC_ROOT = "./src/garron.net/";

const builder = new Builder({
  srcRoot: SRC_ROOT,
  outputDir: "./dist/web/garron.net/",
  debugOutput: true,
});

if (import.meta.main) {
  await builder.build();
}
