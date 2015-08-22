/**
 * Exports the core adapter object
 * @namespace adapter
 */
export const adapter = {};

/**
 * Set the adapter
 * @memberof adapter
 * @param {String} adapter The adapter to require/import
 * @param {Object} [config] Optional configuration object for the adapter
 * @returns {Object} Adapter
 */
adapter.use = (a, opts = {}) => {
  const module = require(a);
  // Check config object
  if (Object.keys(opts).length) {
    // Apply opts using the config method
    module.config(opts);
  }
  return module;
};
