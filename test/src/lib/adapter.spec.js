/* eslint no-unused-expressions: 0 */
/* global expect, request, describe, it, before, after */
import '../../setup';
import { adapter } from '../../../src/lib/adapter';

describe('adapter', () => {
  const testAdapter = {
    name: 'testNEDB',
    source: 'nedb'
  }
  describe('add', () => {
    // Fail on missing params
    it('fails if missing properties in the adapter object', () => {
      try {
        adapter.add({});
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
      }
    });
    // Add to store
    it('adds a new adapter entry to the adapter object store', () => {
      adapter.add(testAdapter);
      expect(adapter.store).to.have.property(testAdapter.name);
      expect(adapter.store[testAdapter.name]).to.be.an.object;
    })
  });
});