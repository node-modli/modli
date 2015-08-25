/**
 * Exports the core adapter object
 * @namespace model
 */
export const adapter = {};

/**
 * Stores the adapters in memory
 * @property {Object}
 */
adapter.store = {};

/**
 * @property {Array} builtIns Available built-in adapters
 */
adapter.builtIns = [
  'nedb'
];

adapter.add = (a) => {
  
}

/**
 * Gets adapter and calls config
 * @memberof adapter
 * @param {String} adapter The adapter to require/import
 * @param {Object} [config] Optional configuration object for the adapter
 * @returns {Object} Adapter
 */
adapter.init = (a, opts = {}) => {
  const path = (adapter.builtIns.indexOf(a) >= 0) ? `./../adapters/${a}/index` : a;
  const module = require(path);
  const adapterObj = module[Object.keys(module)[0]];
  // Check config object
  /* istanbul ignore if */
  if (Object.keys(opts).length) {
    // Apply opts using the config method
    adapterObj.config(opts);
  }
  return adapterObj;
};