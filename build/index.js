/*
 * Copyright (c) 2015 TechnologyAdvice
 */

// Libs
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _libModel = require('./lib/model');

var _libAdapter = require('./lib/adapter');

// Adapters

var _adaptersNedbIndex = require('./adapters/nedb/index');

/**
 * Binds model and adapter to make usable entity
 * @param {String} modelName The name of the model
 * @param {String} adapterName The name of the adapter
 */

var _ = require('lodash');var use = function use(modelName, adapterName) {
  // Initialize model and adapter
  var m = _libModel.model.init(modelName);
  var a = _libAdapter.adapter.init(adapterName);
  // Push schemas and validate on adapter
  a.schemas = m.schemas;
  a.validate = m.validate;
  // Return extended (in case model has arbitrary properties/methods)
  return _.extend(m, a);
};

/**
 * Entry point for the module, exports methods of the libs
 */
exports['default'] = {
  use: use, model: _libModel.model, adapter: _libAdapter.adapter, Joi: _libModel.Joi, nedb: _adaptersNedbIndex.nedb
};
module.exports = exports['default'];