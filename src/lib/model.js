const _ = require('lodash');

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
 * Creates a new model
 * @memberof model
 * @param {Object} m The model
 */
model.create = (m) => {
  // Get adapter object
  const adapter = model.adapter.init(m.adapter.use, m.adapter.config);
  // Get model object
  const modelObj = {
    schema: Joi.object().keys(m.schema),
    validate: function (data) {
      return Joi.validate(data, this.schema, (err) => {
        if (err) {
          return model.formatValidationError(err);
        }
        return null;
      });
    }
  };
  // Expose validate method on adapter object
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

/**
 * @namespace model.adapter
 */
model.adapter = {};

/**
 * @property {Array} builtIns Available built-in adapters
 */
model.adapter.builtIns = [
  'nedb'
];

/**
 * Gets adapter and calls config
 * @memberof adapter
 * @param {String} adapter The adapter to require/import
 * @param {Object} [config] Optional configuration object for the adapter
 * @returns {Object} Adapter
 */
model.adapter.init = (a, opts = {}) => {
  const path = (model.adapter.builtIns.indexOf(a) >= 0) ? `./../adapters/${a}/index` : a;
  const module = require(path);
  const adapter = module[Object.keys(module)[0]];
  // Check config object
  if (Object.keys(opts).length) {
    // Apply opts using the config method
    adapter.config(opts);
  } else {
    _.noop();
  }
  return adapter;
};

