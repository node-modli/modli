/*
 * Copyright (c) 2015 TechnologyAdvice
 */

// Libs
import { model, Joi } from './lib/model';
import { adapter } from './lib/adapter';
const _ = require('lodash');

/**
 * Binds model and adapter to make usable entity
 * @param {String} modelName The name of the model
 * @param {String} adapterName The name of the adapter
 */
const use = (modelName, adapterName) => {
  // Initialize model and adapter
  const m = model.init(modelName);
  const a = adapter.init(adapterName);
  // Return extended (in case model has arbitrary properties/methods)
  return Object.create(_.extend({}, a, m));
};

/**
 * Main modli object
 */
export {
  use, model, adapter, Joi
};
