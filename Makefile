all: build

SITE = garron.net
JEKYLL_ARGS = --source ${SITE} --destination ${SITE}-build
URL = "https://${SITE}/"

.PHONY: build
build:
	jekyll build ${JEKYLL_ARGS}

.PHONY: serve
serve:
	jekyll serve --baseurl="" ${JEKYLL_ARGS} --watch

.PHONY: deploy
deploy: build
	rsync -avz \
		--exclude .DS_Store \
		./${SITE}-build/ \
		${SITE}:~/${SITE}/
	echo "\nDone deploying. Go to ${URL}\n"

.PHONY: open
open:
	open "${URL}"
