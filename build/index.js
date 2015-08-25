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

var vers = require('vers')();exports['default'] = {
  model: _libModel.model, Joi: _libModel.Joi, vers: vers, nedb: _adaptersNedbIndex.nedb
};
module.exports = exports['default'];