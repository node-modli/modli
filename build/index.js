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

var _ = require('lodash');

// Adapters
var adapters = {};
_libAdapter.adapter.builtIns.forEach(function (builtIn) {
  adapters[builtIn] = require('./adapters/' + builtIn + '/index')[builtIn];
});

/**
 * Binds model and adapter to make usable entity
 * @param {String} modelName The name of the model
 * @param {String} adapterName The name of the adapter
 */
var use = function use(modelName, adapterName) {
  // Initialize model and adapter
  var m = _libModel.model.init(modelName);
  var a = _libAdapter.adapter.init(adapterName);
  // Return extended (in case model has arbitrary properties/methods)
  return _.extend({}, _.extend(a, m));
};

/**
 * Main modli object
 */
var modli = {
  use: use, model: _libModel.model, adapter: _libAdapter.adapter, Joi: _libModel.Joi
};

/**
 * Extend modli to include adapters
 */
exports['default'] = _.extend(modli, adapters);
module.exports = exports['default'];