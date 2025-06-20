import { builder } from "./common-builder";

const abortController = new AbortController();
const { signal } = abortController;

await builder.serve({ signal });
