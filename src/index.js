/*
 * Copyright (c) 2015 TechnologyAdvice
 */

// Libs
import { model, Joi } from './lib/model';
import { adapter } from './lib/adapter';
const _ = require('lodash');

// Adapters
let adapters = {};
adapter.builtIns.forEach((builtIn) => {
  adapters[builtIn] = require(`./adapters/${builtIn}/index`)[builtIn];
});

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
  return _.extend({}, _.extend(a, m));
};

/**
 * Main modli object
 */
const modli = {
  use, model, adapter, Joi
};

/**
 * Extend modli to include adapters
 */
export default _.extend(modli, adapters);
