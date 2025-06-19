import { builder } from "./Builder";

const abortController = new AbortController();
const { signal } = abortController;

await builder.serve({ signal });
