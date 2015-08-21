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
    model: Joi.object().keys(m),
    validate: function (data) {
      return Joi.validate(data, this.model, (err) => {
        return {
          pass: function (cb) {
            if (!err) { cb(); }
            return this;
          },
          fail: function (cb) {
            if (err) { cb(err); }
            return this;
          }
        };
      });
    }
  };
};
