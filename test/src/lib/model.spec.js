/* global expect, request, describe, it, before, after */
import '../../setup';
import { model, Joi } from '../../../src/lib/model';

describe('model', () => {

  // Define adapter
  const adapterObj = {
    use: 'nedb',
    config: {
      inMemoryOnly: true
    }
  }

  // Define model
  const modelObj = {
    table: 'foo',
    adapter: adapterObj,
    schema: {
      id: Joi.number().integer(),
      fname: Joi.string().min(3).max(30),
      lname: Joi.string().min(3).max(30),
      email: Joi.string().email().min(3).max(30).required()
    }
  }

  // Hoist placeholder for sharing across tests
  let testModel = {};

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
    })
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
      }
      const testCustom = testModel.validate(testFailData);
      expect(testCustom).to.equal('"id" must be a number');
    })

  });

});



