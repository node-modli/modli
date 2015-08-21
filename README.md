[![Build Status](https://travis-ci.org/TechnologyAdvice/modli.svg)](https://travis-ci.org/TechnologyAdvice/modli)
[![Code Climate](https://codeclimate.com/github/TechnologyAdvice/modli/badges/gpa.svg)](https://codeclimate.com/github/TechnologyAdvice/modli)
[![Test Coverage](https://codeclimate.com/github/TechnologyAdvice/modli/badges/coverage.svg)](https://codeclimate.com/github/TechnologyAdvice/modli/coverage)

# Modli

A module for building models and adapters for multiple data sources.

## Docs

To view documentation on the code run `make doc` and access the ESDoc
output by opening `/docs/index.html` in a web browser.

## Models

...Coming soon...

## Adapters

...Coming soon...

## Makefile and Scripts

A `Makefile` is included for managing build and install tasks. The commands are
then referenced in the `package.json` `scripts` if that is the preferred
task method:

* `all` (default) will run all build tasks
* `start` will run the main script
* `clean` will remove the `/node_modules` directories
* `build` will transpile ES2015 code in `/src` to `/build`
* `test` will run all spec files in `/test/src`
* `test-cover` will run code coverage on all tests
* `lint` will lint all files in `/src`
* `doc` will run ESDoc on all files in `/src` and output to `/docs`

**Test Inidividual File**

An individual spec can be run by specifying the `FILE`:

```
make test FILE=some.spec.js
```

The `FILE` is relative to the `test/src/` directory.

**Deploys**

For deploying releases, the `deploy TAG={VERSION}` can be used where `VERSION` can be:

```
<newversion> | major | minor | patch | premajor
```

Both `make {COMMAND}` and `npm run {COMMAND}` work for any of the above commands.

## License

Glambda is licensed under the MIT license. Please see `LICENSE.txt` for full details.

## Credits

Glambda was designed and created at [TechnologyAdvice](http://www.technologyadvice.com).