/**
 * Exports Joi so no additional import/require needed
 */
export const Joi = require('joi');

/**
 * Exports the core model object
 * @namespace model
 */
export const model = {};

/**
 * Stores the models and their versions in memory
 * @property {Object}
 */
model.store = {};

/**
 * Adds a model to the store
 * @param {Object} m The model to add
 */
model.add = (m) => {
  // Ensure required properties
  if (!m.name || !m.version || !m.schema) {
    throw new Error('Model must contain a name, version and schema');
  }
  // Check if model exists
  if (!model.store[m.name]) {
    // Create new store entry
    model.store[m.name] = {};
  }
  // Append to existing store entry with version and schema
  model.store[m.name][m.version] = m.schema;
};

/**
 * Initializes a model
 * @memberof model
 * @param {String} m The model name
 */
model.init = (m) => {
  // Ensure model is defined
  if (!model.store[m]) {
    throw new Error('Model not defined');
  }
  // Find latest version of model schema (use as default)
  const defaultVersion = Object.keys(model.store[m]).pop();
  // Get model object
  return {
    schemas: model.store[m],
    validate: function (data, version) {
      const v = version || defaultVersion;
      // Return validation
      return Joi.validate(data, Joi.object().keys(this.schemas[v]), (err) => {
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
model.formatValidationError = (err) => {
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
