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
    return 'Model must contain a name, version and schema';
  }
  // Check if model exists
  if (!model.store[m.name]) {
    // Create new store entry
    model.store[m.name] = {}
  }
  // Append to existing store entry with version and schema
  model.store[m.name][m.version] = m.schema;
};

/**
 * Creates a new model
 * @memberof model
 * @param {String} m The model name
 * @param {Object} a The adapter object
 */
model.use = (m, a) => {
  // Ensure model is defined
  if (!model.store[m]) {
    return 'Model not defined';
  }
  // Get adapter object
  const adapter = model.adapter.init(a.name, a.config);
  // Get model object
  const modelObj = {
    schemas: model.store[m],
    validate: function (version, data) {
      return Joi.validate(data, Joi.object().keys(this.schemas[version]), (err) => {
        if (err) {
          return model.formatValidationError(err);
        }
        return null;
      });
    }
  };
  // Expose schema and validate method on adapter object
  adapter.schemas = modelObj.schemas;
  adapter.validate = modelObj.validate;
  // Merge model with adapter properties
  return _.extend(modelObj, adapter);
};

/**
 * Creates 

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

