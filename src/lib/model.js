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
    model: Joi.object().keys(m.schema),
    validate: function (data) {
      return Joi.validate(data, this.model, (err) => {
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

