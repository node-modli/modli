/*
 * Copyright (c) 2015 TechnologyAdvice
 */

// Libs
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libModel = require('./lib/model');

var _libAdapter = require('./lib/adapter');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/**
 * Adds plugins for extending core functionality
 * @param {Function} plugin The plugin function
 */
var pluginFn = function pluginFn(plugin) {
  this[plugin.name] = plugin;
};

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
  return _lodash2['default'].extend(a, m, { plugin: pluginFn });
};

/**
 * Main modli object
 */
exports.use = use;
exports.model = _libModel.model;
exports.adapter = _libAdapter.adapter;
exports.Joi = _libModel.Joi;