.PHONY: build
build: clean-build
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

.PHOHY: deploy
deploy: build
	bun x @cubing/deploy

.PHONY: clean
clean: clean-build
	rm -rf ./.cache/ ./dist/

.PHONY: clean-build
clean-build:
	rm -rf ./dist/web/

.PHONY: reset
reset: clean
	rm -rf ./node_modules/
