const Promise = require('bluebird');
const Datastore = require('nedb');

/**
 * @namespace nedb
 */
export const nedb = {};

/**
 * Accepts config parameters
 * @memberof nedb
 * @param {Object} cfg Configuration
 */
nedb.config = (cfg) => {
  nedb.db = Promise.promisifyAll(new Datastore(cfg));
  return true;
};

/**
 * Creates a new entry in the database
 * @memberof nedb
 * @param {Object} body Contents to create entry
 * @returns {Object} promise
 */
nedb.create = (body) => {
  // Test validation
  const validationErrors = nedb.validate(body);
  // Return promise
  return new Promise((resolve, reject) => {
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
nedb.read = (query) => nedb.db.findAsync(query);

/**
 * Updates an entry in the database
 * @memberof nedb
 * @param {String} query Query to locate entries to update
 * @param {Object} body Contents to update
 * @returns {Object} promise
 */
nedb.update = (query, body) => {
  // Test validation
  const validationErrors = nedb.validate(body);
  // Return promise
  return new Promise((resolve, reject) => {
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
nedb.delete = (query) => nedb.db.removeAsync(query, { multi: true });

/**
 * Extends adapter by adding new method
 * @memberof nedb
 * @param {String} name The name of the method
 * @param {Function} fn The method to add
 */
nedb.extend = (name, fn) => {
  nedb[name] = fn.bind(nedb);
};
