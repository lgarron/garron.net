.PHONY: check
check: lint build

.PHONY: build
build: clean-build setup
	bun run -- ./script/build.ts

.PHONY: dev
dev: setup
	bun run --watch -- ./script/dev.ts

.PHONY: lint
lint: lint-biome lint-tsc

.PHONY: lint-biome
lint-biome: setup
	bun x --no-install -- biome check

.PHONY: lint-tsc
lint-tsc: setup
	bun x --no-install -- tsc --noEmit --project .

.PHONY: format
format: setup
	bun x --no-install -- biome check --write

.PHONY: setup
setup:
	bun install --frozen-lockfile

RM_RF = bun -e 'process.argv.slice(1).map(p => process.getBuiltinModule("node:fs").rmSync(p, {recursive: true, force: true, maxRetries: 5}))' --

.PHONY: clean
clean:
	${RM_RF} -- ./.cache/ ./dist/

.PHONY: reset
reset: clean
	${RM_RF} -- ./node_modules/

.PHONY: clean-build
clean-build:
	${RM_RF} -- ./dist/web/


.PHONY: deploy
deploy: build
	bun x --no-install -- deploy
