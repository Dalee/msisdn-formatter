NODE ?= node
COVERAGE_DIR ?= "./coverage"

test:
	$(NODE) ./node_modules/.bin/eslint src/
	$(NODE) ./node_modules/.bin/mocha

test-coverage:
	$(NODE) ./node_modules/.bin/eslint src/
	$(NODE) ./node_modules/.bin/babel-node \
		./node_modules/.bin/babel-istanbul cover --report=clover --report=lcov \
		./node_modules/.bin/_mocha --dir=$(COVERAGE_DIR)

build:
	$(NODE) ./node_modules/.bin/babel -d ./dist/ ./src

.PHONY: test test-coverage build
