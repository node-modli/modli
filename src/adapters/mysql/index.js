const Promise = require('bluebird');
const mysqlModule = require('mysql');

/**
 * @namespace mysql
 */
export const mysql = {};

/**
 * @propery {Object} conn The MySQL connection
mysql.conn = {};

/**
 * Configs the MySQL Connection
 * @memberof mysql
 * @param {Object} cfg The config object
 *   @property {String} cfg.host
 *   @property {String} cfg.user
 *   @property {String} cfg.password
 *   @property {String} cfg.database
 */
mysql.config = (cfg) => {
  mysql.conn = mysqlModule.createConnection(cfg);
  mysql.conn.connect((err) => {
    if (err) {
      throw new Error('MySQL Connection Error', err);
    }
  });
};

/**
 * Creates a table
 * @memberof mysql
 * @param {String} name The name of the table to create
 * @param {Object} props The properties of the table
 * @returns {Object} promise
 */
mysql.createTable = (name, props) => {
  return new Promise((resolve, reject) => {
    // Build query
    const len = Object.keys(props).length;
    let i = 1;
    let query = `CREATE TABLE IF NOT EXISTS ${name} (`;
    for (let prop in props) {
      if ({}.hasOwnProperty.call(props, prop)) {
        let comma = (i !== len) ? ', ' : '';
        query += `${prop} ${props[prop].join(' ')}${comma}`;
        i++;
      }
    }
    query += ');';
    // Run query
    mysql.conn.query(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
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
