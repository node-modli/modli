/* global expect, request, describe, it, before, after */
import '../../../setup';
import { nedb } from '../../../../src/adapters/nedb/index';

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
    it('creates an entry when passed an object', (done) => {
      const testEntry = {
        name: 'jsmith',
        email: 'jsmith@gmail.com'
      }
      nedb.create(testEntry)
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
    })
  })

  describe('update', () => {
    it('updates an items based on query and object passed', (done) => {
      const testUpdate = {
        name: 'jsmith1'
      }
      nedb.update({ _id: testId }, testUpdate)
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
          done()
        })
        .catch((err) => done(err));
    })
  })

})