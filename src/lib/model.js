/**
 * Exports Joi so no additional import/require needed
 */
export const obey = require('obey')

/**
 * Exports the core model object
 * @namespace model
 */
export const model = {}

/**
 * Stores the models and their versions in memory
 * @property {Object}
 */
model.store = {}

/**
 * Adds a model to the store
 * @param {Object} m The model to add
 */
model.add = (m) => {
  // Ensure required properties
  if (!m.name || !m.tableName || !m.version || !m.schema) {
    throw new Error('Model must contain a name, tableName, version and schema')
  }
  // Check if model exists
  if (!model.store[m.name]) {
    // Create new store entry
    model.store[m.name] = {}
  }
  // Build model object
  let modelObj = {}
  Object.keys(m).forEach((prop) => {
    if (prop !== 'version' && prop !== 'name') {
      if (prop === 'schema' && typeof m.schema.validate !== 'function') {
        // Build model
        modelObj.schema = obey.model(m.schema)
      } else {
        modelObj[prop] = m[prop]
      }
    }
  })
  // Append to existing store entry with version and schema
  model.store[m.name][m.version] = modelObj
}

/**
 * Initializes a model
 * @memberof model
 * @param {String} m The model name
 */
model.init = (m) => {
  // Ensure model is defined
  if (!model.store[m]) {
    throw new Error('Model not defined')
  }
  // Get model object
  const defaultVersion = Object.keys(model.store[m]).pop()
  return {
    name: m,
    tableName: model.store[m][defaultVersion].tableName,
    defaultVersion,
    schemas: model.store[m],
    validate: function(data, version) {
      const v = version || this.defaultVersion
      // Return validation
      return this.schemas[v].schema.validate(data)
        .catch(err => model.formatValidationError(err.collection))
    },
    sanitize: function(data, version) {
      const v = version || this.defaultVersion
      const itt = (schemaNode, dataNode) => {
        for (let prop in dataNode) {
          if (schemaNode[prop] && {}.toString.call(dataNode[prop]).match(/\s([a-zA-Z]+)/)[1].toLowerCase() === 'object') {
            itt(schemaNode[prop].keys, dataNode[prop])
          } else if (!schemaNode[prop]) {
            delete dataNode[prop]
          }
        }
        return dataNode
      }
      return itt(this.schemas[v].schema.def.keys, data)
    }
  }
}

/**
 * Formats validation error
 * @memberof model
 * @param {Object} err The error returned from failing Joi validation
 * @returns {String|Object} The formatted validation error
 */
model.formatValidationError = (err) => {
  if (model.customValidationError) {
    // A custom formatter is defined
    throw model.customValidationError(err)
  }
  throw err
}

/**
 * Placeholder for custom formatter function
 * @memberof model
 */
model.customValidationError = false
