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
    throw new Error('Adapter must contain a name, source and config' + JSON.stringify({
      name: a.name,
      source: a.source,
      config: a.config
    }));
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
  if (typeof source === 'function') {
    adapterObj = source;
  } else {
    adapterObj = require(source);
  }
  // Instantiate adapter
  return new adapterObj(adapter.store[a].config);
};
