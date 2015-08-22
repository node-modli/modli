// const Datastore = require('nedb');
// const Promise = require('bluebird');

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
  return cfg;
  // const db = new Datastore(cfg);
};

/**
 * Creates a new entry in the database
 * @memberof nedb
 * @param {Object} body Contents to create entry
 * @returns {Object} promise
 */
nedb.create = (body) => {
  return body;
};

/**
 * Reads from the database
 * @memberof nedb
 * @param {String|Object} [query] Specific id or query to construct read
 * @returns {Object} promise
 */
nedb.read = (query = false) => {
  return query;
};

/**
 * Updates an entry in the database
 * @memberof nedb
 * @param {String} id The id of the entry to update
 * @param {Object} body Contents to update
 * @returns {Object} promise
 */
nedb.update = (id, body) => {
  return [id, body];
};

/**
 * Deletes an item from the database
 * @memberof nedb
 * @param {String} id The id of the entry to delete
 * @returns {Object} promise
 */
nedb.delete = (id) => {
  return id;
};
