// Libs
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _libModel = require('./lib/model');

// Adapters

var _adaptersNedbIndex = require('./adapters/nedb/index');

/*
 * Copyright (c) 2015 TechnologyAdvice
 */

/**
 * Entry point for the module, exports methods of the libs
 */
exports['default'] = {
  model: _libModel.model, Joi: _libModel.Joi, nedb: _adaptersNedbIndex.nedb
};
module.exports = exports['default'];