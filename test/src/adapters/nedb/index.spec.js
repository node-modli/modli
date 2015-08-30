/* eslint no-unused-expressions: 0 */
/* global expect, request, describe, it, before, after */
import '../../../setup';
import { nedb } from '../../../../src/adapters/nedb/index';

// Mock validation method, this is automatically done by the model
nedb.validate = (body) => {
  // Test validation failure by passing `failValidate: true`
  if (body.failValidate) {
    return { error: true };
  }
  // Mock passing validation, return null
  return null;
};

describe('nedb', () => {
  let testId = null;

  describe('config', () => {
    it('sets the config', () => {
      const testConfig = nedb.config({
        inMemoryOnly: true
      });
      expect(testConfig).to.be.true;
    });
  });

  describe('create', () => {
    it('fails when validation does not pass', (done) => {
      nedb.create({
        failValidate: true
      })
      .catch((err) => {
        expect(err).to.have.property('error');
        done();
      });
    });
    it('creates an entry when passed an object', (done) => {
      nedb.create({
        name: 'jsmith',
        email: 'jsmith@gmail.com'
      })
      .then((data) => {
        expect(data).to.be.an.object;
        testId = data._id;
        done();
      })
      .catch((err) => done(err));
    });
  });

  describe('read', () => {
    it('reads an item when passed a query object', (done) => {
      nedb.read({ _id: testId })
        .then((data) => {
          expect(data[0].name).to.equal('jsmith');
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('update', () => {
    it('fails when validation does not pass', (done) => {
      nedb.create({
        failValidate: true
      })
      .catch((err) => {
        expect(err).to.have.property('error');
        done();
      });
    });
    it('updates an items based on query and object passed', (done) => {
      nedb.update({ _id: testId }, {
        name: 'jsmith1'
      })
      .then((numUpdated) => {
        expect(numUpdated).to.equal(1);
        done();
      })
      .catch((err) => done(err));
    });
  });

  describe('delete', () => {
    it('deletes and item when passed a query', (done) => {
      nedb.delete({ _id: testId })
        .then((numDeleted) => {
          expect(numDeleted).to.equal(1);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('extend', () => {
    it('extends the adapter with a new method', () => {
      // Extend
      nedb.extend('sayFoo', () => {
        return 'foo';
      });
      // Execute
      expect(nedb.sayFoo()).to.equal('foo');
    });
  });
});
