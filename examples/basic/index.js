// Dependencies
var modli = require('../../build/index');
var app = require('express')();
var bodyParser = require('body-parser');

// Use Joi from modli
var Joi = modli.Joi;

// Set bodyParser to JSON
app.use(bodyParser.json());

/**
 * Create a model
 */
modli.model.add({
  name: 'user',
  version: 1,
  schema: {
    fname: Joi.string().min(3).max(30),
    lname: Joi.string().min(3).max(30),
    email: Joi.string().email().min(3).max(30).required()
  }
});

var adapter = {
  name: 'nedb',
  config: {
    inMemoryOnly: true
  }
};

var user = modli.model.use('user', adapter);

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
