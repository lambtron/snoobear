#
# Binaries
#

nodemon = ./node_modules/.bin/nodemon --harmony --quiet
BIN := ./node_modules/.bin

#
# Default
#

default: run

#
# Remove non-checked-in dependencies
#

clean:
	@rm -rf node_modules components

#
# Run the server in debug mode
#

debug: node_modules
	@node debug --harmony ./server/server --development

#
# Run the server
#

run:
	@node --harmony ./server/server

#
# Run the server for development via nodemon
#

serve: node_modules
	@$(nodemon) --watch serve --watch serve ./server/server.js --development

# TODO: make test

#
# Targets
#

node_modules: package.json
	@npm install
	@touch node_modules

#
# Phonies
#

.PHONY: clean
.PHONY: debug
.PHONY: run
.PHONY: serve
