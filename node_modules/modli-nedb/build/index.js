'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Promise = require('bluebird');
var Datastore = require('nedb');

/**
 * @class nedb
 */

var _default = (function () {

  /**
   * Accepts config parameters, constructs class
   * @memberof nedb
   * @param {Object} cfg Configuration
   */

  function _default(config) {
    _classCallCheck(this, _default);

    this.db = Promise.promisifyAll(new Datastore(config));
    return true;
  }

  /**
   * Creates a new entry in the database
   * @memberof nedb
   * @param {Object} body Contents to create entry
   * @param {String|Number} [version] The version of the model to use
   * @returns {Object} promise
   */

  _createClass(_default, [{
    key: 'create',
    value: function create(body) {
      var _this = this;

      var version = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      // Test validation
      var validationErrors = this.validate(body, version);
      // Return promise
      return new Promise(function (resolve, reject) {
        /* istanbul ignore if */
        if (validationErrors) {
          reject(validationErrors);
        } else {
          resolve(_this.db.insertAsync(body));
        }
      });
    }

    /**
     * Reads from the database
     * @memberof nedb
     * @param {Object} query Specific id or query to construct read
     * @param {Number|String} version The version of the model to match
     * @returns {Object} promise
     */
  }, {
    key: 'read',
    value: function read(query) {
      var _this2 = this;

      var version = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      return new Promise(function (resolve, reject) {
        _this2.db.findAsync(query).then(function (results) {
          var tmp = [];
          results.forEach(function (r) {
            tmp.push(_this2.sanitize(r, version));
          });
          resolve(tmp);
        })['catch'](function (err) {
          return reject(err);
        });
      });
    }

    /**
     * Updates an entry in the database
     * @memberof nedb
     * @param {String} query Query to locate entries to update
     * @param {Object} body Contents to update
     * @param {String|Number} [version] The version of the model to use
     * @returns {Object} promise
     */
  }, {
    key: 'update',
    value: function update(query, body) {
      var _this3 = this;

      var version = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      // Test validation
      var validationErrors = this.validate(body, version);
      // Return promise
      return new Promise(function (resolve, reject) {
        /* istanbul ignore if */
        if (validationErrors) {
          reject(validationErrors);
        } else {
          resolve(_this3.db.updateAsync(query, { $set: body }, { multi: true }));
        }
      });
    }

    /**
     * Deletes an item from the database
     * @memberof nedb
     * @param {Object} query Query to locate entries to delete
     * @returns {Object} promise
     */
  }, {
    key: 'delete',
    value: function _delete(query) {
      return this.db.removeAsync(query, { multi: true });
    }

    /**
     * Extends adapter by adding new method
     * @memberof nedb
     * @param {String} name The name of the method
     * @param {Function} fn The method to add
     */
  }, {
    key: 'extend',
    value: function extend(name, fn) {
      this[name] = fn.bind(this);
    }
  }]);

  return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];