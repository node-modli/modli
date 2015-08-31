/**
 * Exports the core adapter object
 * @namespace adapter
 */
export const adapter = {};

/**
 * Stores the adapters in memory
 * @property {Object}
 */
adapter.store = {};

/**
 * Adds an adapter to the store
 * @param {Object} a The adapter to add
 */
adapter.add = (a) => {
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
adapter.init = (a) => {
  let adapterObj;
  // Ensure model is defined
  if (!adapter.store[a]) {
    throw new Error('Adapter not defined');
  }
  const source = adapter.store[a].source;
  if (typeof source === 'object') {
    adapterObj = source;
  } else {
    adapterObj = require(source);
  }
  // Check config object
  /* istanbul ignore if */
  if (Object.keys(adapter.store[a].config).length) {
    // Apply opts using the config method
    adapterObj.config(adapter.store[a].config);
  }
  return adapterObj;
};
