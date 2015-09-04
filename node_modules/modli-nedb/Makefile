.DEFAULT_GOAL := all

# Paths
DEPS    = ./node_modules
BIN     = $(DEPS)/.bin
SRC     = ./src
BUILD   = ./build
PKG     = ./package.json

# Tests
TESTS     = ./test/src
SPACE     :=
SPACE     +=
# Default to recursive, can override on run
FILE      = $(SPACE)--recursive
# ARGS
T_ARGS    = --compilers js:babel/register

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
	$(call colorecho, "Linting ./test")
	$(BIN)/eslint ./test

test:
	$(call colorecho, "Testing $(TESTS) --recursive")
	$(BIN)/mocha $(T_ARGS) $(TESTS)$(FILE)

test-cover:
	$(call colorecho, "Running coverage report")
	$(BIN)/istanbul cover $(BIN)/_mocha -- $(T_ARGS) $(TESTS)

build:
	$(call colorecho, "Building $(SRC) to $(BUILD)")
	$(BIN)/babel $(SRC) --out-dir $(BUILD)

start:
	$(call colorecho, "Starting...")
	node test/index.js

tag:
	$(call colorecho, "Deploying to Git")
	$(TAG_CMD)

deploy: lint test build tag

all: clean install lint test build


# Phonies
.PHONY: lint test test-cover build start report deploy