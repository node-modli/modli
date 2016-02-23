/* eslint no-unused-expressions: 0 */
/* global expect, request, describe, it, before, after */
import './setup'
import { model, adapter, use } from '../src/index'
import nedb from 'modli-nedb'

/**
 * Integration testing
 * Sets up full test using NeDB (inMemory)
 */

describe('integration', () => {
  const intAdapter = {
    name: 'testNEDB',
    source: nedb,
    config: {
      inMemoryOnly: true
    }
  }

  const intModel = {
    name: 'testUser',
    version: 1,
    schema: {
      fname: { type: 'string' },
      lname: { type: 'string' },
      email: { type: 'email', required: true }
    }
  }

  // Test data
  const testPassData = {
    fname: 'John',
    lname: 'Doe',
    email: 'jdoe@gmail.com'
  }

  let testID
  let testModel

  describe('add a model', () => {
    it('adds a model to the model object', () => {
      model.add(intModel)
      // Ensure creation
      const actualSchema = Object.keys(model.store.testUser[intModel.version].schema.schema)
      const expectedSchema = Object.keys(intModel.schema)
      expect(actualSchema).to.deep.equal(expectedSchema)
    })
  })

  describe('add an adapter', () => {
    it('adds an adapter to the adapter object', () => {
      adapter.add(intAdapter)
      const actualConfig = adapter.store.testNEDB.config
      const expectedConfig = intAdapter.config
      // Ensure creation
      expect(actualConfig).to.deep.equal(expectedConfig)
    })
  })

  describe('use an instance', () => {
    it('returns an instance based on a model and adapter', () => {
      testModel = use('testUser', 'testNEDB')
      expect(parseInt(testModel.defaultVersion, 10)).to.equal(parseInt(intModel.version, 10))
      expect(testModel.schemas).to.be.an.object
      expect(testModel.validate).to.be.a.function
      expect(testModel.sanitize).to.be.a.function
    })
  })

  describe('add a plugin', () => {
    it('adds a plugin to the instance', () => {
      const testPlugin = function() {
        // Return the v1 schema
        return this.schemas[1]
      }
      // Add the plugin
      testModel.plugin(testPlugin)
      expect(testModel.testPlugin()).to.have.property('schema')
    })
  })

  describe('create item', () => {
    it('creates an item in the datastore', () => {
      // Create
      return testModel.create(testPassData)
        .then((data) => {
          console.log('DATA', data)
          testID = data._id
          // Remove generated _id
          delete data._id
          expect(data).to.deep.equal(testPassData)
        })
    })
    it('fails when item has invalid property', (done) => {
      // Test data
      const testFailData = {
        fname: 123
      }
      // Create
      testModel.create(testFailData)
        .catch((err) => {
          expect(err.message).to.equal('child "fname" fails because ["fname" must be a string]')
          done()
        })
    })
  })

  describe('read item', () => {
    it('reads an item in the datastore', (done) => {
      testModel.read({ _id: testID })
        .then((data) => {
          expect(data[0]).to.deep.equal(testPassData)
          done()
        })
        .catch(done)
    })
  })

  describe('update item', () => {
    it('updates an item in the datastore', (done) => {
      // Test data
      const testPassDataUpdate = {
        fname: 'Bob',
        email: 'bsmith@gmail.com'
      }
      // Update
      testModel.update({ _id: testID }, testPassDataUpdate)
        .then((res) => {
          expect(res).to.equal(1)
          done()
        })
        .catch(done)
    })
    it('fails when item has invalid property', (done) => {
      // Test data
      const testFailData = {
        fname: 123
      }
      // Update
      testModel.update({ _id: testID }, testFailData)
        .catch((err) => {
          expect(err.message).to.equal('child "fname" fails because ["fname" must be a string]')
          done()
        })
    })
  })

  describe('delete item', () => {
    it('deletes an item from the datastore', (done) => {
      testModel.delete({ _id: testID })
        .then((res) => {
          expect(res).to.equal(1)
          done()
        })
        .catch(done)
    })
  })
})
