/* eslint no-unused-expressions: 0 */
/* global expect, request, describe, it, before, after */
import '../../setup';
import { model, Joi } from '../../../src/lib/model';

describe('model', () => {
  // Define models
  const modelObjV1 = {
    name: 'foo',
    version: 1,
    customProp: 'bar',
    schema: {
      id: Joi.number().integer(),
      fname: Joi.string().min(3).max(30),
      lname: Joi.string().min(3).max(30)
    }
  };

  const modelObjV2 = {
    name: 'foo',
    version: 2,
    customProp: 'baz',
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
    it('fails if missing properties in the model obejct', () => {
      try {
        model.add({});
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
      }
    });

    it('adds a new model entry to the model object store', () => {
      // Add the first version
      model.add(modelObjV1);
      // Add the second version
      model.add(modelObjV2);
      // Ensure entry (against V2)
      expect(model.store).to.have.property(modelObjV2.name);
      // Ensure version (against V2)
      expect(model.store[modelObjV2.name]).to.have.property(modelObjV2.version);
    });
  });

  describe('init', () => {
    // Invalid model check
    it('fails if invalid model defined', () => {
      try {
        model.init(null);
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
      }
    });
    // Initializes model
    it('initializes the model by binding validation and versioning', () => {
      testModel = model.init('foo');
      expect(testModel).to.be.an.object;
    });
  });

  describe('validate', () => {
    // Define pass data
    const testPassDataV1 = {
      id: 12345,
      fname: 'John',
      lname: 'Doe'
    };

    const testPassDataV2 = {
      id: 12345,
      fname: 'John',
      lname: 'Doe',
      email: 'jdoe@gmail.com'
    };

    // Define fail data
    const testFailDataV1 = testPassDataV2;

    const testFailDataV2 = {
      id: 'foo',
      fname: 123,
      lname: [ 'bar' ],
      email: 'jdoe[at]gmail.com'
    };

    // Pass validation condition
    it('passes validation when object matches rules', () => {
      const passTest = testModel.validate(testPassDataV2);
      expect(passTest).to.be.null;
    });
    // Fail validation condition
    it('fails validation when object does not match rules', () => {
      const failTest = testModel.validate(testFailDataV2);
      expect(failTest).to.not.be.null;
    });
    // Use custom formatter
    it('uses a custom validation error format when specified', () => {
      // Define custom formatter
      model.customValidationError = (err) => {
        return err.details[0].message;
      };
      const testCustom = testModel.validate(testFailDataV2);
      expect(testCustom).to.equal('"id" must be a number');
    });
    // Pass on older version
    it('passes validation on older version of schema', () => {
      const passTest = testModel.validate(testPassDataV1, 1);
      expect(passTest).to.be.null;
    });
    // Fail on older version
    it('fails validation on older version of schema', () => {
      const failTest = testModel.validate(testFailDataV1, 1);
      expect(failTest).to.not.be.null;
    });
  });
});
