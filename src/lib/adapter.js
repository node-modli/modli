/**
 * Exports the core adapter object
 * @namespace adapter
 */
export const adapter = {};

adapter.builtIns = [
  'nedb'
];

/**
 * Set the adapter
 * @memberof adapter
 * @param {String} adapter The adapter to require/import
 * @param {Object} [config] Optional configuration object for the adapter
 * @returns {Object} Adapter
 */
adapter.use = (a, opts = {}) => {
  const path = (adapter.builtIns.indexOf(a) >= 0) ? `./../adapters/${a}/index` : a;
  const module = require(path);
  // Check config object
  if (Object.keys(opts).length) {
    // Apply opts using the config method
    module.config(opts);
  }
  return module;
};
