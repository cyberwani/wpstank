REPORTER = spec
YC=\x1b[33;01m
RC=\x1b[01;30m
NC=\x1b[0m

test:
	@make clean
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER)

test-w:
	@make clean
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER) --watch

clean:
	@echo "$(YC)Cleaning test files.$(RC)"
	@rm -rvf test/library test/.wpstank*
	@echo "$(NC)"

.PHONY: test test-w
