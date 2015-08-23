[![Build Status](https://travis-ci.org/TechnologyAdvice/modli.svg)](https://travis-ci.org/TechnologyAdvice/modli)
[![Code Climate](https://codeclimate.com/github/TechnologyAdvice/modli/badges/gpa.svg)](https://codeclimate.com/github/TechnologyAdvice/modli)
[![Test Coverage](https://codeclimate.com/github/TechnologyAdvice/modli/badges/coverage.svg)](https://codeclimate.com/github/TechnologyAdvice/modli/coverage)

[![NPM](https://nodei.co/npm/modli.png)](https://www.npmjs.com/package/modli)

# Modli

A module for building models and adapters for multiple data sources. The core
goal of this project is to create a minimal barrier to entrance for creating
model-validated CRUD operations on data sources.

This is done by addressing two core areas:

**Models**

Create a simple, universally similar modelling structure for any and all data
sources to which an application may be connected.

**Adapters**

Create basic CRUD operations that function similarly between all adapters
which can be connected to a model to perform the CRUD operations and are easily
extensible for more complex operations.

## Installation

```
npm install modli --save
```

## Docs

To view documentation on the code run `make doc` and access the ESDoc
output by opening `/docs/index.html` in a web browser.

## Models

Models are simple objects which use [Joi](https://www.npmjs.com/package/joi) for
property definition and validation. Modli abstracts on this slightly and provides
methods for easily creating and validating data models and attaching to the
appropriate adapter.

```javascript
import { model, Joi } from 'modli';

// Create adapter object
const modelAdapter = {
  // Uses the built-in NeDB adapter
  name: 'nedb',
  // Initiates adapter with following config
  config: {
    inMemoryOnly: true
  }
};

// Create Model
const testModel = model.create({
  // Set the adapter
  adapter: modelAdapter
  // Define the schema
  schema: {
    id: Joi.number().integer(),
    fname: Joi.string().min(3).max(30),
    lname: Joi.string().min(3).max(30),
    email: Joi.string().email().min(3).max(30).required()
  }
});
```

The above example will return the model object with a number of methods for
performing data operations.

### Validate Model Data

Validating a model (using the above example) is then simply a matter of the
model's `validate` method:

```javascript
// Some data
const testData = {
  id: 12345,
  fname: 'John',
  lname: 'Doe',
  email: 'jdoe@gmail.com'
};

// Run validation
testModel.validate(testData)
  .pass(() => console.log('All good!'))
  .fail((err) => console.error('Failed', err));
```

The `validate` method returns `pass` and `fail` methods allowing the validation
to be assigned to a variable (if needed) and acted upon when required.

### Validation Error Formatting

By default, the `validation` methods `fail` response will return the Joi error
object. This can be overridden using the following:

```javascript
model.customValidationError = (err) => {
  // ... custom formatting here ...
};
```

For example, if you wanted to just show the "human" error response text:

```javascript
model.customValidationError = (err) => {
  return err.details[0].message;
}
```

The above would return `"id" must be a number` if the above model was tested
with an invalid (`string`) id.

## Adapters

Adapters allow for creating standard CRUD methods which are then extended upon
the model to make interacting with the datasource simple.

### Default methods

All adapters have 5 main methods which are exposed on the model; `create`, `read`,
`update`, `delete` and `config`.

While these methods are mostly self-explanatory, some noteworthy specifics:

The `config` method is called automatically by the model when the adapter is
bound to it (see above model example).

### Validation

Validation is performed automatically on both `create` and `update` methods. This
is done by first running the models validation, then (on `pass`) calling the
adapters native method.

To accomplish this the model will look to validate data at the first argument
in `create` and the second argument in `update`:

```javascript
// On create, first argument:
myModel.create({ foo: 'bar' })

// On update, second argument:
myModel.update({ _id: 12345 }, { foo: 'bar' });
```

## Makefile and Scripts

A `Makefile` is included for managing build and install tasks. The commands are
then referenced in the `package.json` `scripts` if that is the preferred
task method:

* `all` (default) will run all build tasks
* `start` will run the main script
* `clean` will remove the `/node_modules` directories
* `build` will transpile ES2015 code in `/src` to `/build`
* `test` will run all spec files in `/test/src`
* `test-integration` will run integration test
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