/* global expect, request, describe, it, before, after */
import '../../setup';
import { adapter } from '../../../src/lib/adapter';

describe('adapter', () => {

  describe('use', () => {

    // Loads built-in adapters
    it('loads built-in adapters', () => {
      const testBuiltIn = adapter.use('nedb');
      expect(testBuiltIn).to.be.an.object;
    });

    // Mock adapter
    const mockAdapter = '../../test/mocks/adapter';

    // Use adapter
    const testAdapter = adapter.use(mockAdapter);

    // Just loads the adapter
    it('loads the adapter specified from path', () => {
      expect(testAdapter).to.be.an.object;
    });

    // Adapter has correct methods
    it('has the correct properties from the adapter', () => {
      expect(testAdapter).to.have.property('mockMethod');
    });

    // Test config
    it('loads the adapter with config', () => {
      // Config object to pass to adapter on init
      const configObj = {
        foo: 'bar'
      };
      // Use adapter
      const testAdapterCfg = adapter.use(mockAdapter, configObj);
      expect(testAdapterCfg.configProps).to.deep.equal(configObj);
    });

  })

});