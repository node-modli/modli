'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obey = exports.adapter = exports.model = exports.use = undefined;

var _model = require('./lib/model');

var _adapter = require('./lib/adapter');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
/*
 * Copyright (c) 2015 TechnologyAdvice
 */

// Libs
var use = function use(modelName, adapterName) {
  // Initialize model and adapter
  var m = _model.model.init(modelName);
  var a = _adapter.adapter.init(adapterName);
  // Add adapter name to returned model
  m.adapter = adapterName;
  // Return extended (in case model has arbitrary properties/methods)
  return _lodash2.default.extend(a, m, { plugin: pluginFn });
};

/**
 * Main modli object
 */
exports.use = use;
exports.model = _model.model;
exports.adapter = _adapter.adapter;
exports.obey = _model.obey;