/*
 * Copyright (c) 2015 TechnologyAdvice
 */

// Libs
import { model, obey } from './lib/model'
import { adapter } from './lib/adapter'
import _ from 'lodash'

/**
 * Adds plugins for extending core functionality
 * @param {Function} plugin The plugin function
 */
const pluginFn = function(plugin) {
  this[plugin.name] = plugin
}

/**
 * Binds model and adapter to make usable entity
 * @param {String} modelName The name of the model
 * @param {String} adapterName The name of the adapter
 */
const use = (modelName, adapterName) => {
  // Initialize model and adapter
  const m = model.init(modelName)
  const a = adapter.init(adapterName)
  // Return extended (in case model has arbitrary properties/methods)
  return _.extend(a, m, { plugin: pluginFn })
}

/**
 * Main modli object
 */
export {
  use, model, adapter, obey
}
