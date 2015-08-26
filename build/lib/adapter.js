'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var fs = require('fs');
var path = require('path');
/**
 * Exports the core adapter object
 * @namespace adapter
 */
var adapter = {};

exports.adapter = adapter;
/**
 * Stores the adapters in memory
 * @property {Object}
 */
adapter.store = {};

/**
 * @property {Array} builtIns Available built-in adapters
 */
adapter.builtIns = [];

/**
 * Adds an adapter to the store
 * @param {Object} a The adapter to add
 */
adapter.add = function (a) {
  // Ensure properties are defined
  if (!a.name || !a.source || !a.config) {
    throw new Error('Adapter must contain a name, source and config');
  }
  // Add to memory
  adapter.store[a.name] = {
    source: a.source,
    config: a.config
  };
};

/**
 * Gets adapter and calls config
 * @memberof adapter
 * @param {String} adapter The adapter to require/import
 * @returns {Object} Adapter
 */
adapter.init = function (a) {
  // Ensure model is defined
  if (!adapter.store[a]) {
    throw new Error('Adapter not defined');
  }
  var source = adapter.store[a].source;
  var adapterPath = adapter.builtIns.indexOf(source) >= 0 ? './../adapters/' + source + '/index' : source;
  var adapterModule = require(adapterPath);
  var adapterObj = adapterModule[Object.keys(adapterModule)[0]];
  // Check config object
  /* istanbul ignore if */
  if (Object.keys(adapter.store[a].config).length) {
    // Apply opts using the config method
    adapterObj.config(adapter.store[a].config);
  }
  return adapterObj;
};

/**
 * Adds all adapters to the builtIns array
 * @memberof adapter
 */
/* istanbul ignore next */
adapter.getBuiltIns = function () {
  var src = __dirname + '/../adapters';
  fs.readdirSync(path.resolve(src)).filter(function (file) {
    if (fs.statSync(path.join(src, file)).isDirectory()) {
      adapter.builtIns.push(file);
    }
  });
};

/**
 * Run getBuiltIns to load adapters available
 */
adapter.getBuiltIns();