.PHONY: dev
dev: setup
	bun run ./script/build.ts
	fswatch --event=Updated --one-per-batch ./script/build.ts ./src | xargs -n1 -I{} bun run ./script/build.ts

.PHONY: lint
lint: setup
	bun x @biomejs/biome check

.PHONY: format
format: setup
	bun x @biomejs/biome check --write

.PHONY: setup
setup:
	bun install --frozen-lockfile

.PHONY: clean
clean:
	rm -rf ./dist

.PHONY: reset
reset: clean
	rm -rf ./node_modules
