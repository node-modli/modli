/* eslint no-unused-expressions: 0 */
/* global expect, request, describe, it, before, after */
import './setup';
import { model, Joi } from '../src/index';

/**
 * Integration testing
 * Sets up full test using NeDB (inMemory)
 */

let testModel;

describe('integration', () => {
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
          id: Joi.number().integer(),
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
    it('creates an item in the datastore', () => {
    });
  });

  describe('read item', () => {
    it('reads an item in the datastore', () => {
    });
  });

  describe('update item', () => {
    it('updates an item in the datastore', () => {
    });
  });

  describe('delete item', () => {
    it('deletes an item from the datastore', () => {
    });
  });
});
