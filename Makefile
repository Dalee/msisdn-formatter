NODE ?= node
COVERAGE_DIR ?= "./coverage"

test:
	$(NODE) ./node_modules/.bin/eslint src/
	$(NODE) ./node_modules/.bin/mocha

test-coverage: test
	$(NODE) ./node_modules/.bin/babel-node \
		./node_modules/.bin/babel-istanbul cover --report=clover --report=lcov \
		./node_modules/.bin/_mocha --dir=$(COVERAGE_DIR)

.PHONY: test test-coverage
