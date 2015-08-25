/*
 * Copyright (c) 2015 TechnologyAdvice
 */

// Libs
import { model, Joi } from './lib/model';
import { adapter } from './lib/adapter';
const _ = require('lodash');
// Adapters
import { nedb } from './adapters/nedb/index';

/**
 * Binds model and adapter to make usable entity
 * @param {String} modelName The name of the model
 * @param {String} adapterName The name of the adapter
 */
const use = (modelName, adapterName) => {
  // Initialize model and adapter
  const m = model.init(modelName);
  const a = adapter.init(adapterName);
  // Push schemas and validate on adapter
  a.schemas = m.schemas;
  a.validate = m.validate;
  // Return extended (in case model has arbitrary properties/methods)
  return _.extend(m, a);
};

/**
 * Entry point for the module, exports methods of the libs
 */
export default {
  use, model, adapter, Joi, nedb
};
