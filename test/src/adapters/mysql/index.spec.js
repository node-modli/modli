/* eslint no-unused-expressions: 0 */
/* global expect, request, describe, it, before, after */
import '../../../setup';
import { mysql } from '../../../../src/adapters/mysql/index';

// Mock validation method, this is automatically done by the model
mysql.validate = () => null;

describe('mysql', () => {
  describe('config', () => {
    it('throws error on inproper config', () => {
      try {
        mysql.config({ bad: 'config' });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
      }
    });
  });
});
