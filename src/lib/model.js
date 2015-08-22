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
  return {
    schema: Joi.object().keys(m.schema),
    validate: function (data) {
      return Joi.validate(data, this.schema, (err) => {
        return {
          /**
           * Called when validation passes
           * @param {Function} cb The function to call
           * @returns this
           */
          pass: function (cb) {
            if (!err) { cb(); }
            return this;
          },
          /**
           * Called when validation fails
           * @param {Function} cb The function to call
           * @returns this
           */
          fail: function (cb) {
            if (err) { cb(model.formatValidationError(err)); }
            return this;
          }
        };
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
model.adapter.use = (a, opts = {}) => {
  const path = (model.adapter.builtIns.indexOf(a) >= 0) ? `./../adapters/${a}/index` : a;
  const module = require(path);
  // Check config object
  if (Object.keys(opts).length) {
    // Apply opts using the config method
    module.config(opts);
  }
  return module;
};

