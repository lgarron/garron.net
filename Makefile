.PHONY: build
build:
	mise run build

.PHONY: dev
dev:
	mise run dev

.PHONY: test
test:
	mise run test

.PHONY: test-Builder
test-Builder:
	mise run test-Builder

.PHONY: test-tsc
test-tsc:
	mise run test-tsc

.PHONY: lint
lint:
	mise run lint

.PHONY: format
format:
	mise run format

.PHONY: setup
setup:
	mise run setup

.PHONY: clean
clean:
	mise run clean

.PHONY: clean-build
clean-build:
	mise run clean-build

.PHONY: reset
reset:
	mise run reset

.PHONY: deploy
deploy:
	mise run deploy
