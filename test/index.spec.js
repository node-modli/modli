/* eslint no-unused-expressions: 0 */
/* global expect, request, describe, it, before, after */
import './setup';
import { model, adapter, use, Joi } from '../src/index';
import nedb from 'modli-nedb';

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
  };

  const intModel = {
    name: 'testUser',
    version: 1,
    schema: {
      fname: Joi.string().min(3).max(30),
      lname: Joi.string().min(3).max(30),
      email: Joi.string().email().min(3).max(30).required()
    }
  };

  let testID;
  let testModel;

  describe('add a model', () => {
    it('adds a model to the model object', () => {
      model.add(intModel);
      // Ensure creation
      expect(model.store.testUser).to.be.an.object;
    });
  });

  describe('add an adapter', () => {
    it('adds an adapter to the adapter object', () => {
      adapter.add(intAdapter);
      // Ensure creation
      expect(adapter.store.testNEDB).to.be.an.object;
    });
  });

  describe('use an instance', () => {
    it('returns an instance based on a model and adapter', () => {
      testModel = use('testUser', 'testNEDB');
      expect(testModel).to.be.an.object;
    });
  });

  describe('create item', () => {
    it('creates an item in the datastore', (done) => {
      // Test data
      const testPassData = {
        fname: 'John',
        lname: 'Doe',
        email: 'jdoe@gmail.com'
      };
      // Create
      testModel.create(testPassData)
        .then((data) => {
          testID = data._id;
          expect(data).to.be.an.object;
          done();
        })
        .catch(done);
    });
    it('fails when item has invalid property', (done) => {
      // Test data
      const testFailData = {
        fname: 123
      };
      // Create
      testModel.create(testFailData)
        .catch((err) => {
          expect(err).to.be.an.object;
          done();
        });
    });
  });

  describe('read item', () => {
    it('reads an item in the datastore', (done) => {
      testModel.read({ _id: testID })
        .then((data) => {
          expect(data).to.be.an.array;
          done();
        })
        .catch(done);
    });
  });

  describe('update item', () => {
    it('updates an item in the datastore', (done) => {
      // Test data
      const testPassData = {
        fname: 'Bob',
        email: 'bsmith@gmail.com'
      };
      // Update
      testModel.update({ _id: testID }, testPassData)
        .then((res) => {
          expect(res).to.equal(1);
          done();
        })
        .catch(done);
    });
    it('fails when item has invalid property', (done) => {
      // Test data
      const testFailData = {
        fname: 123
      };
      // Update
      testModel.update({ _id: testID }, testFailData)
        .catch((err) => {
          expect(err).to.be.an.object;
          done();
        });
    });
  });

  describe('delete item', () => {
    it('deletes an item from the datastore', (done) => {
      testModel.delete({ _id: testID })
        .then((res) => {
          expect(res).to.equal(1);
          done();
        })
        .catch(done);
    });
  });
});
