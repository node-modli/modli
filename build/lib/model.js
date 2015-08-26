/**
 * Exports Joi so no additional import/require needed
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Joi = require('joi');

exports.Joi = Joi;
/**
 * Exports the core model object
 * @namespace model
 */
var model = {};

exports.model = model;
/**
 * Stores the models and their versions in memory
 * @property {Object}
 */
model.store = {};

/**
 * Adds a model to the store
 * @param {Object} m The model to add
 */
model.add = function (m) {
  // Ensure required properties
  if (!m.name || !m.version || !m.schema) {
    throw new Error('Model must contain a name, version and schema');
  }
  // Check if model exists
  if (!model.store[m.name]) {
    // Create new store entry
    model.store[m.name] = {};
  }
  // Build model object
  var modelObj = {};
  Object.keys(m).forEach(function (prop) {
    if (prop !== 'version' && prop !== 'name') {
      modelObj[prop] = m[prop];
    }
  });
  // Append to existing store entry with version and schema
  model.store[m.name][m.version] = modelObj;
};

/**
 * Initializes a model
 * @memberof model
 * @param {String} m The model name
 */
model.init = function (m) {
  // Ensure model is defined
  if (!model.store[m]) {
    throw new Error('Model not defined');
  }
  // Get model object
  return {
    defaultVersion: Object.keys(model.store[m]).pop(),
    schemas: model.store[m],
    validate: function validate(data, version) {
      var v = version || this.defaultVersion;
      // Return validation
      return Joi.validate(data, Joi.object().keys(this.schemas[v].schema), function (err) {
        if (err) {
          return model.formatValidationError(err);
        }
        return null;
      });
    }
  };
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