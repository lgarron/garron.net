.PHONY: build
build:
	bun run ./script/build.ts

.PHONY: dev
dev: setup
	bun run --watch ./script/dev.ts

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
