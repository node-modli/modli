// Dependencies
var modli = require('../../build/index');
var app = require('express')();
var bodyParser = require('body-parser');
var nedb = require('modli-nedb').nedb;

// Use Joi from modli
var Joi = modli.Joi;

// Set bodyParser to JSON
app.use(bodyParser.json());

/**
 * Add a model
 */
modli.model.add({
  name: 'testUser',
  version: 1,
  schema: {
    fname: Joi.string().min(3).max(30),
    lname: Joi.string().min(3).max(30),
    email: Joi.string().email().min(3).max(30).required()
  }
});

/**
 * Add an adapter
 */
modli.adapter.add({
  name: 'testNEDB',
  source: nedb,
  config: {
    inMemoryOnly: true
  }
});

/**
 * Create an instance
 */
var user = modli.use('testUser', 'testNEDB');

/**
 * Define requests
 */

app.get('/user/:id', function (req, res) {
  user.read({ _id: req.params.id })
    .then(function (data) {
      res.status(200).send(data);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

app.post('/user', function (req, res) {
  user.create(req.body)
    .then(function (data) {
      res.status(201).send(data);
    })
    .catch(function (err) {
      res.status(500).send(err);
    })
});

app.put('/user/:id', function (req, res) {
  user.update({ _id: req.params.id }, req.body)
    .then(function (count) {
      res.status(200).send('Updated '+count+' record');
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

app.delete('/user/:id', function (req, res) {
  user.delete({ _id: req.params.id })
    .then(function (count) {
      res.status(200).send('Deleted '+count+' record');
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

/**
 * Start listener
 */
console.log('Example service running on port 8000');
app.listen(8000);
