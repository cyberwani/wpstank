REPORTER = spec

test:
	make clean
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER)

test-w:
	make clean
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER) --watch

clean:
	echo "cleaning test files"
	rm -rvf test/library test/.wpstank

.PHONY: test test-w
