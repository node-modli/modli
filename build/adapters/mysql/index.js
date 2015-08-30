'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Promise = require('bluebird');
var mysqlModule = require('mysql');

/**
 * @namespace mysql
 */
var mysql = {};

exports.mysql = mysql;
/**
 * @propery {Object} conn The MySQL connection
 */
mysql.conn = {};

/**
 * Pass-through to direct query (promisified)
 * @memberof mysql
 * @param {String} query The query to run
 */
mysql.query = function (query) {
  return new Promise(function (resolve, reject) {
    mysql.conn.query(query, function (err, result) {
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
mysql.config = function (cfg) {
  mysql.conn = mysqlModule.createConnection(cfg);
  mysql.conn.connect(function (err) {
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
mysql.createTable = function (props) {
  // Build query
  var len = Object.keys(props).length;
  var i = 1;
  var query = 'CREATE TABLE IF NOT EXISTS ' + mysql.tableName + ' (';
  for (var prop in props) {
    var comma = i !== len ? ', ' : '';
    query += prop + ' ' + props[prop].join(' ') + comma;
    i++;
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
mysql.create = function (body) {
  var version = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  return new Promise(function (resolve, reject) {
    // Validate
    var validationErrors = mysql.validate(body, version);
    if (validationErrors) {
      reject(validationErrors);
    } else {
      // Build query
      var cols = [];
      var vals = [];
      for (var prop in body) {
        cols.push(prop);
        vals.push('"' + body[prop] + '"');
      }
      var query = 'INSERT INTO ' + mysql.tableName + ' (' + cols.join(',') + ') VALUES (' + vals.join(',') + ');';
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
mysql.read = function (query) {
  var where = undefined;
  if (query) {
    where = ' WHERE ' + query;
  } else {
    where = '';
  }
  return mysql.query('SELECT * FROM ' + mysql.tableName + where);
};

/**
 * Updates an existing record
 * @memberof mysql
 * @param {Object} query The query to identify update record(s)
 * @params {Object} body The record contents to update
 * @params {String|Number} version The version of the model
 * @returns {Object} promise
 */
mysql.update = function (query, body) {
  var version = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  return new Promise(function (resolve, reject) {
    var validationErrors = mysql.validate(body, version);
    if (validationErrors) {
      reject(validationErrors);
    } else {
      var i = 1;
      var changes = '';
      var len = Object.keys(body).length;
      for (var prop in body) {
        if (({}).hasOwnProperty.call(body, prop)) {
          var comma = i !== len ? ', ' : '';
          changes += prop + '="' + body[prop] + '"' + comma;
          i++;
        }
      }
      resolve(mysql.query('UPDATE ' + mysql.tableName + ' SET ' + changes + ' WHERE ' + query));
    }
  });
};

/**
 * Deletes a record
 * @memberof mysql
 * @param {Object} query
 * @returns {Object} promise
 */
mysql['delete'] = function (query) {
  return mysql.query('DELETE FROM ' + mysql.tableName + ' WHERE ' + query);
};

/**
 * Extends the mysql object
 * @memberof mysql
 * @param {String} name The name of the method
 * @param {Function} fn The function to extend on the object
 */
mysql.extend = function (name, fn) {
  mysql[name] = fn.bind(mysql);
};