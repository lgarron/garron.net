import { Builder } from "linkrel-ssg";
import { SRC_ROOT } from "./build";

const builder = new Builder({
  srcRoot: SRC_ROOT,
  outputDir: "./.cache/dev/web/garron.net/",
});

await builder.serve();
