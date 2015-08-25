/* eslint no-unused-expressions: 0 */
/* global expect, request, describe, it, before, after */
import '../../setup';
import { model, Joi } from '../../../src/lib/model';

describe('model', () => {
  // Define adapter
  const adapterObj = {
    name: 'nedb',
    config: {
      inMemoryOnly: true
    }
  };

  // Define model
  const modelObj = {
    name: 'foo',
    version: '1',
    schema: {
      id: Joi.number().integer(),
      fname: Joi.string().min(3).max(30),
      lname: Joi.string().min(3).max(30),
      email: Joi.string().email().min(3).max(30).required()
    }
  };

  // Hoist placeholder for sharing across tests
  let testModel = {};
  
  describe('add', () => {
    it('adds a new model entry to the model object', () => {
      // Add the model
      model.add(modelObj);
      // Ensure entry
      expect(model.store).to.have.property(modelObj.name);
      // Ensure version
      expect(model.store[modelObj.name]).to.have.property(modelObj.version);
      // Ensure schema
      expect(model.store[modelObj.name][modelObj.version]).to.deep.equal(modelObj.schema);
    });
  });
  
  describe('use', () => {
    it('binds the model to adapter and returns object', () => {
      testModel = model.use('foo', adapterObj);
      expect(testModel).to.be.an.object;
    });
  });
  /*
  describe('create', () => {
    it('creates a new model with built-in adapter', () => {
      testModel = model.create(modelObj);
      expect(testModel).to.be.an.object;
    });

    it('creates a new model with custom adapter', () => {
      const testCustomAdapterModel = model.create({
        adapter: {
          use: '../../test/mocks/adapter'
        },
        schema: {
          id: Joi.number().integer()
        }
      });
      expect(testCustomAdapterModel).to.be.an.object;
    });
  });

  describe('validate', () => {
    // Define pass data
    const testPassData = {
      id: 12345,
      fname: 'John',
      lname: 'Doe',
      email: 'jdoe@gmail.com'
    };

    // Define fail data
    const testFailData = {
      id: 'foo',
      fname: 123,
      lname: [ 'bar' ],
      email: 'jdoe[at]gmail.com'
    };

    // Pass validation condition
    it('passes validation when object matches rules', () => {
      const passTest = testModel.validate(testPassData);
      expect(passTest).to.be.null;
    });
    // Fail validation condition
    it('fails validation when object does not match rules', () => {
      const failTest = testModel.validate(testFailData);
      expect(failTest).to.not.be.null;
    });
    // Use custom formatter
    it('uses a custom validation error format when specified', () => {
      // Define custom formatter
      model.customValidationError = (err) => {
        return err.details[0].message;
      };
      const testCustom = testModel.validate(testFailData);
      expect(testCustom).to.equal('"id" must be a number');
    });
  });
  */
});
