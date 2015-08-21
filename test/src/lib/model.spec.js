/* global sinon, expect, request, describe, it, before, after */
import '../../setup';
import { model, Joi } from '../../../src/lib/model';

describe('model', () => {

  let testModel = {};

  describe('create', () => {
    it('creates a new model', () => {
      testModel = model.create({
        id: Joi.number().integer(),
        fname: Joi.string().min(3).max(30),
        lname: Joi.string().min(3).max(30),
        email: Joi.string().email().min(3).max(30).required()
      });
      expect(testModel).to.be.an.object;
    });
  });

  describe('validate', () => {

    // Pass validation condition
    it('passes validation when object matches rules', () => {
      let testPassData = {
        id: 12345,
        fname: 'John',
        lname: 'Doe',
        email: 'jdoe@gmail.com'
      };

      let passTest = true;

      testModel.validate(testPassData).pass(() => {
        passTest = true;
      }).fail(() => {
        passTest = false;
      });

      expect(passTest).to.be.true;
    });
    // Fail validation condition
    it('fails validation when object does not match rules', () => {
      let testFailData = {
        id: 'foo',
        fname: 123,
        lname: [ 'bar' ],
        email: 'jdoe[at]gmail.com'
      };

      let passTest = true;

      testModel.validate(testFailData).pass(() => {
        passTest = true;
      }).fail(() => {
        passTest = false;
      });
      
      expect(passTest).to.be.false;
    })
  });

});