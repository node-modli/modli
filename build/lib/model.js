'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _ = require('lodash');

/**
 * Exports Joi so no additional import/require needed
 */
var Joi = require('joi');

exports.Joi = Joi;
/**
 * Exports the core model object
 * @namespace model
 */
var model = {};

exports.model = model;
/**
 * Creates a new model
 * @memberof model
 * @param {Object} m The model
 */
model.create = function (m) {
  // Get adapter object
  var adapter = model.adapter.init(m.adapter.use, m.adapter.config);
  // Get model object
  var modelObj = {
    schema: Joi.object().keys(m.schema),
    validate: function validate(data) {
      return Joi.validate(data, this.schema, function (err) {
        if (err) {
          return model.formatValidationError(err);
        }
        return null;
      });
    }
  };
  // Expose schema and validate method on adapter object
  adapter.schema = modelObj.schema;
  adapter.validate = modelObj.validate;
  // Merge model with adapter properties
  return _.extend(modelObj, adapter);
};

/**
 * Formats validation error
 * @memberof model
 * @param {Object} err The error returned from failing Joi validation
 * @returns {String|Object} The formatted validation error
 */
model.formatValidationError = function (err) {
  if (model.customValidationError) {
    // A custom formatter is defined
    return model.customValidationError(err);
  }
  return err;
};

/**
 * Placeholder for custom formatter function
 * @memberof model
 */
model.customValidationError = false;

/**
 * @namespace model.adapter
 */
model.adapter = {};

/**
 * @property {Array} builtIns Available built-in adapters
 */
model.adapter.builtIns = ['nedb'];

/**
 * Gets adapter and calls config
 * @memberof adapter
 * @param {String} adapter The adapter to require/import
 * @param {Object} [config] Optional configuration object for the adapter
 * @returns {Object} Adapter
 */
model.adapter.init = function (a) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var path = model.adapter.builtIns.indexOf(a) >= 0 ? './../adapters/' + a + '/index' : a;
  var module = require(path);
  var adapter = module[Object.keys(module)[0]];
  // Check config object
  if (Object.keys(opts).length) {
    // Apply opts using the config method
    adapter.config(opts);
  } else {
    _.noop();
  }
  return adapter;
};