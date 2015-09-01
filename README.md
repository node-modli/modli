[![wercker status](https://app.wercker.com/status/f3739d627fd42f6eb10bf5e1a1c09a84/s/master "wercker status")](https://app.wercker.com/project/bykey/f3739d627fd42f6eb10bf5e1a1c09a84)
[![Code Climate](https://codeclimate.com/github/node-modli/modli/badges/gpa.svg)](https://codeclimate.com/github/node-modli/modli)
[![Test Coverage](https://codeclimate.com/github/node-modli/modli/badges/coverage.svg)](https://codeclimate.com/github/node-modli/modli/coverage)

# Modli

Modli is an NPM module designed to help create unified data modelling, validation
and CRUD operations across numerous data sources. It accomplishes this by exposing
a `model` object and an `adapter` object which are extended upon eachother with
the desired adapter for a data source to create a more standard, extensible
object.

## Installation

```
npm install modli --save
```

## Getting Started

Below is an example of a basic setup where a **model** and an **adapter**
are added. Once added they are available to be `use`'d to create an
instance of the object with the methods from the adapter, validation, etc.

In this example, the [modli-nedb](https://www.npmjs.com/package/modli-nedb) is
utilized (`npm install modli-nedb --save`).

```javascript
import { model, adapter, use, Joi } from 'modli';
import { nedb } from 'modli-nedb';

// Create adapter object
adapter.add({
  name: 'testNEDB',
  // Uses the built-in NeDB adapter
  source: nedb,
  // Initiates adapter with following config
  config: {
    inMemoryOnly: true
  }
});

// Add a Model
model.add({
  // Set a name
  name: 'testUser',
  // Set the version
  version: 1,
  // Define the schema
  schema: {
    id: Joi.number().integer(),
    fname: Joi.string().min(3).max(30),
    lname: Joi.string().min(3).max(30),
    email: Joi.string().email().min(3).max(254).required()
  }
});

// Create user object by using the model and adapter
const user = use('testUser', 'testNEDB');
```

The above example will return the model object with a number of methods for
performing data operations. This will always include core CRUD methods:

```javascript
// Create
user.create({ /*...data...*/ }).then(/*...*/).catch(/*...*/);

// Read
user.read({ /*...query...*/ }).then(/*...*/).catch(/*...*/);

// Update
user.update({ /*...query, data...*/ }).then(/*...*/).catch(/*...*/);

// Delete
user.delete({ /*...query...*/ }).then(/*...*/).catch(/*...*/);
```

*Yes, it's all based on Promises. You're welcome.*

## Custom Adapters

While the team behind Modli provides a number of adapters, Modli core is also
designed to accept a path to a custom adapter:

```javascript
adapter.use({
  name: 'myCustomAdapter',
  source: 'path/to/myCustomAdapter'
  config: {
    /*...custom config properties...*/
  }
});
```

To see a functional example of a custom adapter see [/examples/custom-adapter](/examples/custom-adapter)

## Extending Adapters

Adapters can be esily extended upon. For example, a custom method could be added to
the NeDB adapter used in the [Getting Started section](#getting-started):

```javascript
import { nedb } from 'modli-nedb';

nedb.extend('myCustomMethod', (someVal) => {
  // Just return the value passed
  return someVal;
});
```

All adapters contain the `extend` method which becomes part of the created object
when a model and adapter are `use`'d, so the adapter can be extended before
initialization with a model, or inline:

```javascript
// Initial setup
adapter.add({ name: 'myAdapter', /*...*/ });
model.add({ name: 'myModel', /*...*/ });
// Usable object
const myTest = use('myModel', 'myAdapter');

// Extend...
myTest.extend('myCustomMethod', (someVal) => {
  // Just return the value passed
  return someVal;
});
```

The above would allow you to then call `myTest.myCustomMethod('foo')` and expect
the response to be `foo`.

### Validate Model Data

Validation of model data is done by the adapter when data is being insertered,
i.e. create and update procedures. The adapter inherits the model's `validate`
method which utilizes the [Joi](https://github.com/hapijs/joi) library to ensure
properties are correct.

### Validation Error Formatting

By default, the `validation` method's `fail` response will return the Joi error
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
with an invalid `string` id when the expected input was an `integer`.

### Adapters and Validation

When the adapter is extended upon the model to which it is applied it exposes
the `model`'s `validate` method. Adapters can utilize this via the following:

```javascript
const validationErrors = this.validate(body);
```

The `validate` method in the above returns errors to the `validationErrors`
constant. If no validation errors are present it simply returns `null`.

## Examples

As often times it is easier to understand something when seen in practice, there
are several [examples](/examples) available.

The [`/test/index.spec.js`](/test/index.spec.js) file also serves as an integration
test suite which shows how functionality of Modli is designed.

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

## Testing

Running `make test` will run the full test suite.

**Test Inidividual File**

An individual spec can be run by specifying the `FILE`. This is convenient when
working on an individual adapter.

```
make test FILE=some.spec.js
```

The `FILE` is relative to the `test/` directory.

**Deploys**

For deploying releases, the `deploy TAG={VERSION}` can be used where `VERSION` can be:

```
<newversion> | major | minor | patch | premajor
```

Both `make {COMMAND}` and `npm run {COMMAND}` work for any of the above commands.

## License

Modli is licensed under the MIT license. Please see `LICENSE.txt` for full details.

## Credits

Modli was designed and created at [TechnologyAdvice](http://www.technologyadvice.com).