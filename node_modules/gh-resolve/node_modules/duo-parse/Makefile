
BIN := node_modules/.bin
SRC = $(wildcard *.js)
TESTS = $(wildcard test/*.js)

test: node_modules
	@$(BIN)/mocha

coverage: node_modules $(SRC) $(TESTS)
	@$(BIN)/istanbul cover $(BIN)/_mocha

node_modules: package.json
	@npm install
	@touch node_modules

lint: node_modules
	@$(BIN)/eslint .

clean:
	@rm -rf coverage

.PHONY: test lint clean
