// Dependencies
var modli = require('../../build/index');
var app = require('express')();
var bodyParser = require('body-parser');
var Promise = require('bluebird');

// Use Joi from modli
var Joi = modli.Joi;

// Use nedb adapter
var nedb = modli.nedb;

// Set bodyParser to JSON
app.use(bodyParser.json());

/**
 * Extend NeDB adapter
 */
nedb.createWithRand = function (body) {
  console.log('called createWithRand')
  console.log('db', nedb.db);
  // Automatically add a property "randNum" with value between 1 and 5
  body.randNum = Math.floor(Math.random() * 5) + 1
  // Test validation
  const validationErrors = nedb.validate(body);
  // Return promise
  return new Promise(function (resolve, reject) {
    /* global db */
    if (validationErrors) {
      reject(validationErrors);
    } else {
      resolve(nedb.db.insertAsync(body));
    }
  });
}

/**
 * Create a model
 */
var user = modli.model.create({
  adapter: {
    use: 'nedb',
    config: {
      inMemoryOnly: true
    }
  },
  schema: {
    fname: Joi.string().min(3).max(30),
    lname: Joi.string().min(3).max(30),
    email: Joi.string().email().min(3).max(30).required(),
    randNum: Joi.number().integer().min(1).max(5)
  }
});

console.log(user);

/**
 * Define requests
 */
app.post('/user', function (req, res) {
  user.createWithRand(req.body)
    .then(function (data) {
      res.status(201).send(data);
    })
    .catch(function (err) {
      res.status(500).send(err);
    })
});

/**
 * Start listener
 */
console.log('Example service running on port 8000');
app.listen(8000);