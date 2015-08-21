[![Build Status](https://travis-ci.org/TechnologyAdvice/modli.svg)](https://travis-ci.org/TechnologyAdvice/modli)
[![Code Climate](https://codeclimate.com/github/TechnologyAdvice/modli/badges/gpa.svg)](https://codeclimate.com/github/TechnologyAdvice/modli)
[![Test Coverage](https://codeclimate.com/github/TechnologyAdvice/modli/badges/coverage.svg)](https://codeclimate.com/github/TechnologyAdvice/modli/coverage)

[![NPM](https://nodei.co/npm/modli.png)](https://www.npmjs.com/package/modli)

# Modli

A module for building models and adapters for multiple data sources.

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
methods for easily creating and validating data models.

### Create Model

Simply passing an object to  `model.create` with the Joi defined properties will
create a model instance.

```javascript
import { model, Joi } from 'modli';

const testModel = model.create({
  id: Joi.number().integer(),
  fname: Joi.string().min(3).max(30),
  lname: Joi.string().min(3).max(30),
  email: Joi.string().email().min(3).max(30).required()
});
```

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