'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Promise = require('bluebird');
var Datastore = require('nedb');

/**
 * @namespace nedb
 */
var nedb = {};

exports.nedb = nedb;
/**
 * Accepts config parameters
 * @memberof nedb
 * @param {Object} cfg Configuration
 */
nedb.config = function (cfg) {
  nedb.db = Promise.promisifyAll(new Datastore(cfg));
  return true;
};

/**
 * Creates a new entry in the database
 * @memberof nedb
 * @param {Object} body Contents to create entry
 * @param {String|Number} [version] The version of the model to use
 * @returns {Object} promise
 */
nedb.create = function (body) {
  var version = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  // Test validation
  var validationErrors = nedb.validate(body, version);
  // Return promise
  return new Promise(function (resolve, reject) {
    /* istanbul ignore if */
    if (validationErrors) {
      reject(validationErrors);
    } else {
      resolve(nedb.db.insertAsync(body));
    }
  });
};

/**
 * Reads from the database
 * @memberof nedb
 * @param {Object} query Specific id or query to construct read
 * @returns {Object} promise
 */
nedb.read = function (query) {
  return nedb.db.findAsync(query);
};

/**
 * Updates an entry in the database
 * @memberof nedb
 * @param {String} query Query to locate entries to update
 * @param {Object} body Contents to update
 * @param {String|Number} [version] The version of the model to use
 * @returns {Object} promise
 */
nedb.update = function (query, body) {
  var version = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  // Test validation
  var validationErrors = nedb.validate(body, version);
  // Return promise
  return new Promise(function (resolve, reject) {
    /* istanbul ignore if */
    if (validationErrors) {
      reject(validationErrors);
    } else {
      resolve(nedb.db.updateAsync(query, { $set: body }, { multi: true }));
    }
  });
};

/**
 * Deletes an item from the database
 * @memberof nedb
 * @param {Object} query Query to locate entries to delete
 * @returns {Object} promise
 */
nedb['delete'] = function (query) {
  return nedb.db.removeAsync(query, { multi: true });
};

/**
 * Extends adapter by adding new method
 * @memberof nedb
 * @param {String} name The name of the method
 * @param {Function} fn The method to add
 */
nedb.extend = function (name, fn) {
  nedb[name] = fn.bind(nedb);
};