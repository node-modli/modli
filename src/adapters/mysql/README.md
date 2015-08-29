# MySQL Adapter

The built-in MySQL adapter supports connection and basic CRUD operations to 
a MySQL datasource along with the ability to pass raw queries directly to the 
MySQL instance.

## Config and Usage

When defining a property which will utilize the adapter it is required that a 
`tableName` be supplied:

```javascript
model.add({
  name: 'foo',
  version: 1,
  tableName: 'tblFoo'
  schema: {
    id: Joi.number().integer(),
    fname: Joi.string().min(3).max(30),
    lname: Joi.string().min(3).max(30),
    email: Joi.string().email().min(3).max(254).required()
  }
});
```

Then add the adapter as per usual with the following config object structure:

```javascript
adapter.add({
  name: 'mysqlFoo',
  source: 'mysql'
  config: {
    host: {HOST_IP},
    username: {USERNAME},
    password: {PASSWORD},
    database: {DATABASE}
  }
});
```

You can then use the adapter with a model via:

```javascript
// Use(MODEL, ADAPTER)
const mysqlTest = use('foo', 'mysqlFoo');
```

## Methods

The following methods exist natively on the MySQL adapter:

### `config`

Runs the configuration and connects to the datasource.

### `query`

Allows for passing standard MySQL queries:

```javascript
mysqlTest.query('SELECT * FROM tblFoo')
  .then(/*...*/)
  .catch(/*...*/);
```

### `createTable`

Creates (`IF NOT EXISTS`) a table based on params:

```javascript
mysqlTest.createTable({
    'id': [ 'INT', 'NOT NULL', 'AUTO_INCREMENT', 'PRIMARY KEY'],
    'fname': [ 'VARCHAR(255)' ],
    'lname': [ 'VARCHAR(255)' ],
    'email': [ 'VARCHAR(255)' ]
  })
  .then(/*...*/)
  .catch(/*...*/);
```

### `create`

Creates a new record based on object passed:

```javascript
mysqlTest.create({
    fname: 'John',
    lname: 'Smith',
    email: 'jsmith@gmail.com'
  })
  .then(/*...*/)
  .catch(/*...*/);
```

### `read`

Runs a `SELECT` with optional `WHERE`:

```javascript
mysqlTest.read('fname="John"')
  .then(/*...*/)
  .catch(/*...*/);
```

### `update`

Updates record(s) based on query and body:

```javascript
mysqlTest.update('fname="John"', {
    fname: 'Bob',
    email: 'bsmith@gmail.com'
  })
  .then(/*...*/)
  .catch(/*...*/);
```

### `delete`

Deletes record(s) based on query:

```javascript
mysqlTest.delete('fname="Bob"')
  .then(/*...*/)
  .catch(/*...*/);
```

### `extend`

Extends the adapter to allow for custom methods:

```javascript
mysqlTest.extend('myMethod', () => {
  /*...*/
});
```

## Development

The MySQL adapter requires the following enviroment variables to be set for 
running the tests. These should be associated with the MySQL instance running 
locally.

```
MODLI_MYSQL_HOST,
MODLI_MYSQL_USERNAME,
MODLI_MYSQL_PASSWORD,
MODLI_MYSQL_DATABASE
```

This repository includes a base container config for running locally which is 
located at [/dockerfiles/mysql](/dockerfiles/mysql).