const Promise = require('bluebird');
const mysqlModule = require('mysql');

/**
 * @namespace mysql
 */
export const mysql = {};

/**
 * @propery {Object} conn The MySQL connection
 */
mysql.conn = {};

/**
 * Pass-through to direct query (promisified)
 * @memberof mysql
 * @param {String} query The query to run
 */
mysql.query = (query) => {
  return new Promise((resolve, reject) => {
    mysql.conn.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

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
mysql.createTable = (props) => {
  // Build query
  const len = Object.keys(props).length;
  let i = 1;
  let query = `CREATE TABLE IF NOT EXISTS ${mysql.tableName} (`;
  for (let prop in props) {
    if ({}.hasOwnProperty.call(props, prop)) {
      let comma = (i !== len) ? ', ' : '';
      query += `${prop} ${props[prop].join(' ')}${comma}`;
      i++;
    }
  }
  query += ');';
  // Run query
  return mysql.query(query);
};

/**
 * Creates a new record
 * @memberof mysql
 * @param {Object} body The record to insert
 * @param {Sting|Number} [version] The version of the model
 * @returns {Object} promise
 */
mysql.create = (body, version = false) => {
  return new Promise((resolve, reject) => {
    // Validate
    const validationErrors = mysql.validate(body, version);
    if (validationErrors) {
      reject(validationErrors);
    } else {
      // Build query
      let cols = [];
      let vals = [];
      for (let prop in body) {
        if ({}.hasOwnProperty.call(body, prop)) {
          cols.push(prop);
          vals.push('"' + body[prop] + '"');
        }
      }
      const query = `INSERT INTO ${mysql.tableName} (${cols.join(',')}) VALUES (${vals.join(',')});`;
      // Run query
      resolve(mysql.query(query));
    }
  });
};

/**
 * Queries for a record
 * @memberof mysql
 * @param {Object} query The query to execute
 * @returns {Object} promise
 */
mysql.read = (query) => {
  let where;
  if (query) {
    where = ` WHERE ${query}`;
  } else {
    where = '';
  }
  return mysql.query(`SELECT * FROM ${mysql.tableName}${where}`);
};

/**
 * Updates an existing record
 * @memberof mysql
 * @param {Object} query The query to identify update record(s)
 * @params {Object} bodt The record contents to update
 * @params {String|Number} version The version of the model
 * @returns {Object} promise
 */
mysql.update = (query, body, version = false) => {
  return new Promise((resolve, reject) => {
    const validationErrors = mysql.validate(body, version);
    if (validationErrors) {
      reject(validationErrors);
    } else {
      let i = 1;
      let changes = '';
      let len = Object.keys(body).length;
      for (let prop in body) {
        if ({}.hasOwnProperty.call(body, prop)) {
          let comma = (i !== len) ? ', ' : '';
          changes += `${prop}="${body[prop]}"${comma}`;
          i++;
        }
      }
      resolve(mysql.query(`UPDATE ${mysql.tableName} SET ${changes} WHERE ${query}`));
    }
  });
};

/**
 * Deletes a record
 * @memberof mysql
 * @param {Object} query
 * @returns {Object} promise
 */
mysql.delete = (query) => {
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
