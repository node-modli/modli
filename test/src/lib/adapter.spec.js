/* global expect, request, describe, it, before, after */
import '../../setup';
import { adapter } from '../../../src/lib/adapter';

describe('adapter', () => {

  describe('use', () => {

    // Mock adapter
    const mockAdapter = '../../test/mocks/adapter';

    // Use adapter
    const testAdapter = adapter.use(mockAdapter);

    console.log(testAdapter);

    // Just loads the adapter
    it('loads the adapter specified', () => {
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
    })

  })

});