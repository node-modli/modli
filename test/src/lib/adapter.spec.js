/* eslint no-unused-expressions: 0 */
/* global expect, request, describe, it, before, after */
import '../../setup';
import { adapter } from '../../../src/lib/adapter';
import nedb from 'modli-nedb';

describe('adapter', () => {
  const testAdapter = {
    name: 'testNEDB',
    source: nedb,
    config: {
      inMemoryOnly: true
    }
  };

  const customAdapter = {
    name: 'customAdapter',
    source: '../../test/mocks/adapter',
    config: {}
  };

  describe('add', () => {
    it('fails if missing properties in the adapter object', () => {
      try {
        adapter.add({});
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
      }
    });
    it('adds a new adapter entry to the adapter object store', () => {
      adapter.add(testAdapter);
      expect(adapter.store).to.have.property(testAdapter.name);
      expect(adapter.store[testAdapter.name]).to.be.an.object;
    });
    it('adds a custom adapter from path reference', () => {
      adapter.add(customAdapter);
      expect(adapter.store[customAdapter.name]).to.be.an.object;
    });
  });

  describe('init', () => {
    it('fails if invalid adapter passed', () => {
      try {
        adapter.init(null);
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
      }
    });
    it('initializes the adapter by returning the object', () => {
      const initAdapter = adapter.init('testNEDB');
      expect(initAdapter).to.be.an.object;
    });
    it('initializes custom adapter by returning the object', () => {
      const initAdapter = adapter.init('customAdapter');
      expect(initAdapter).to.be.an.object;
    });
  });
});
