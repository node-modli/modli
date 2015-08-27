// const Promise = require('bluebird');
const mysqlModule = require('mysql');

/**
 * @namespace mysql
 */
export const mysql = {};

/**
 * Configs the MySQL Connection
 * @memberof mysql
 * @param {Object} cfg The config object
 */
mysql.config = (cfg) => {
  mysql.conn = mysqlModule.createConnection({
    host: cfg.host,
    user: cfg.user,
    password: cfg.password,
    database: cfg.database
  }).connect((err) => {
    if (err) {
      throw new Error('MySQL Connection Error', err);
    }
  });
};

/**
 * Creates a new record
 * @memberof mysql
 * @param {String} body The record to insert
 * @param {Sting|Number} [version] The version of the model
 * @returns {Object} promise
 */
mysql.create = (body, version = false) => {
  return { body, version };
};

/**
 * Queries for a record
 * @memberof mysql
 * @param {Object} query The query to execute
 * @returns {Object} promise
 */
mysql.create = (query) => {
  return query;
};

/**
 * Updates an existing record
 * @memberof mysql
 * @param {Object} query The query to identify update record(s)
 * @params {Object} bodt The record contents to update
 * @params {String|Number} version The version of the model
 * @returns {Object} promise
 */
mysql.create = (query, body, version = false) => {
  return { query, version };
};

/**
 * Deletes a record
 * @memberof mysql
 * @param {Object} query
 * @returns {Object} promise
 */
mysql.create = (query) => {
  return query;
};

/**
 * Extends the mysql object
 * @memberof mysql
 * @param {String} name The name of the method
 * @param {Function} fn The function to extend on the object
 */
mysql.extend = (name, fn) => {
  mysql[name] = fn.bind(nedb);
};
