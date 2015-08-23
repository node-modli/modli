.DEFAULT_GOAL := all

# Paths
DEPS    = ./node_modules
BIN     = $(DEPS)/.bin
SRC     = ./src
BUILD   = ./build
DOCS    = ./docs
PKG     = ./package.json

# Tests
TESTS   = ./test/src/
SPACE   :=
SPACE   +=
# Default to recursive, can override on run
FILE    = $(SPACE)--recursive
# ARGS
T_ARGS  = --compilers js:babel/register $(TESTS)$(FILE)

# Deploy
TAG     = 0
TAG_CMD = npm version $(TAG) && \
	    git push origin master && \
	    git push --tags

# Make things more readable
define colorecho
      @tput setaf 2
      @tput bold
      @printf "\n"
      @echo $1
      @echo ==========================================
      @tput sgr0
endef

# Tasks

clean:
	$(call colorecho, "Cleaning $(BUILD) and $(DEPS)")
	rm -rf $(DEPS)

install: $(PKG)
	$(call colorecho, "Installing")
	npm i .

lint:
	$(call colorecho, "Linting $(SRC)")
	$(BIN)/eslint $(SRC)

test:
	$(call colorecho, "Testing $(TESTS)$(FILE)")
	$(BIN)/mocha $(T_ARGS)

test-cover:
	$(call colorecho, "Running coverage report")
	$(BIN)/istanbul cover $(BIN)/_mocha -- $(T_ARGS)

test-integration:
	$(call colorecho, "Integration Testing ./test/index.js")
	$(BIN)/mocha --compilers js:babel/register ./test/index.js

build:
	$(call colorecho, "Building $(SRC) to $(BUILD)")
	$(BIN)/babel $(SRC) --out-dir $(BUILD)

start:
	$(call colorecho, "Starting...")
	node test/index.js

doc:
	$(call colorecho, "Building Docs")
	$(BIN)/esdoc -c esdoc.json

tag:
	$(call colorecho, "Deploying to Git")
	$(TAG_CMD)

deploy: lint test build doc tag

all: clean install lint test build doc


# Phonies
.PHONY: lint test doc build start report deploy