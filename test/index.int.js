/* eslint no-unused-expressions: 0 */
/* global expect, request, describe, it, before, after */
import './setup';
import { model, Joi } from '../src/index';

/**
 * Integration testing
 * Sets up full test using NeDB (inMemory)
 */

describe('integration', () => {
  let testID;
  let testModel;
  describe('create model', () => {
    it('creates a model using the nedb built-in adapter', () => {
      // Create test model
      testModel = model.create({
        // Set adapter
        adapter: {
          use: 'nedb',
          config: {
            inMemoryOnly: true
          }
        },
        // Set schema
        schema: {
          fname: Joi.string().min(3).max(30),
          lname: Joi.string().min(3).max(30),
          email: Joi.string().email().min(3).max(30).required()
        }
      });
      // Ensure creation
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
