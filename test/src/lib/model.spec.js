/* eslint no-unused-expressions: 0 */
/* global expect, request, describe, it, before, after */
import '../../setup'
import { model } from '../../../src/lib/model'

describe('model', () => {
  // Define models
  const modelObjV1 = {
    name: 'foo',
    version: 1,
    customProp: 'bar',
    schema: {
      id: { type: 'number' },
      fname: { type: 'string' },
      lname: { type: 'string' },
      roles: { type: 'object', keys: {
        admin: { type: 'boolean', default: false }
      }}
    }
  }

  const modelObjV2 = {
    name: 'foo',
    version: 2,
    customProp: 'baz',
    schema: {
      id: { type: 'number' },
      fname: { type: 'string' },
      lname: { type: 'string' },
      roles: { type: 'object', keys: {
        admin: { type: 'boolean', default: false }
      }},
      email: { type: 'email', required: 'true' }
    }
  }

  // Hoist placeholder for sharing across tests
  let testModel = {}

  describe('add', () => {
    it('fails if missing properties in the model obejct', () => {
      try {
        model.add({})
      } catch (e) {
        expect(e).to.be.an.instanceof(Error)
      }
    })

    it('adds a new model entry to the model object store', () => {
      // Add the first version
      model.add(modelObjV1)
      // Add the second version
      model.add(modelObjV2)
      // Ensure entry (against V2)
      expect(model.store).to.have.property(modelObjV2.name)
      // Ensure version (against V2)
      expect(model.store[modelObjV2.name]).to.have.property(modelObjV2.version)
    })
  })

  describe('init', () => {
    // Invalid model check
    it('fails if invalid model defined', () => {
      try {
        model.init(null)
      } catch (e) {
        expect(e).to.be.an.instanceof(Error)
      }
    })
    // Initializes model
    it('initializes the model by binding validation and versioning', () => {
      testModel = model.init('foo')
      expect(testModel).to.be.an.object
    })
  })

  // Define pass data
  const testPassDataV1 = {
    id: 12345,
    fname: 'John',
    lname: 'Doe',
    roles: {
      admin: false
    }
  }

  const testPassDataV2 = {
    id: 12345,
    fname: 'John',
    lname: 'Doe',
    email: 'jdoe@gmail.com',
    roles: {
      admin: true
    }
  }

  // Define fail data
  const testFailDataV1 = testPassDataV2

  const testFailDataV2 = {
    id: 'foo',
    fname: 123,
    lname: [ 'bar' ],
    email: 'jdoe[at]gmail.com'
  }

  describe('validate', () => {
    // Pass validation condition
    it('passes validation when object matches rules', () => {
      return testModel.validate(testPassDataV2)
        .then(data => {
          expect(data).to.be.an.object
        })
    })
    // Fail validation condition
    it('fails validation when object does not match rules', () => {
      return testModel.validate(testFailDataV2)
        .then(data => {
          throw new Error(`Should not have data, ${data}`)
        })
        .catch(err => {
          expect(err[0].key).to.equal('id')
        })
    })
    // Use custom formatter
    it('uses a custom validation error format when specified', () => {
      // Define custom formatter
      model.customValidationError = (err) => {
        return err[0].message
      }
      return testModel.validate(testFailDataV2)
        .then(data => {
          throw new Error(`Should not have data, ${data}`)
        })
        .catch(err => {
          expect(err).to.equal('Value must be a number')
        })
    })
    // Pass on older version
    it('passes validation on older version of schema', () => {
      return testModel.validate(testPassDataV1, 1)
        .then(data => {
          expect(data).to.be.an.object
        })
    })
    // Fail on older version
    it('fails validation on older version of schema', () => {
      return testModel.validate(testFailDataV1, 1)
        .catch(err => {
          expect(err).to.equal('\'email\' is not an allowed property')
        })
    })
  })

  describe('sanitize', () => {
    it('removes items from the data which are not present in the schema', () => {
      const sanitized = testModel.sanitize({
        fname: 'John',
        lname: 'Smith',
        roles: {
          admin: true
        },
        email: 'jdoe@gmail.com' // <- not in v.1 of the model
      }, 1)
      expect(sanitized).to.deep.equal({
        fname: 'John',
        lname: 'Smith',
        roles: {
          admin: true
        }
      })
    })
  })
})
