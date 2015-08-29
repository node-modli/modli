/* eslint no-unused-expressions: 0 */
/* global expect, request, describe, it, before, after */
import '../../../setup';
import { mysql } from '../../../../src/adapters/mysql/index';

// Mock validation method, this is automatically done by the model
mysql.validate = () => null;

// Specific model properties
mysql.tableName = 'foo';

describe('mysql', () => {
  describe('config', () => {
    it('throws error on inproper config', () => {
      try {
        mysql.config({ bad: 'config' });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
      }
    });
    it('connects when proper config provided', () => {
      mysql.config({
        host: process.env.MODLI_MYSQL_HOST,
        user: process.env.MODLI_MYSQL_USERNAME,
        password: process.env.MODLI_MYSQL_PASSWORD,
        database: process.env.MODLI_MYSQL_DATABASE
      });
      expect(mysql.conn).to.be.an.object;
    });
  });

  describe('createTable', () => {
    it('creates a new table based on object passed', () => {
      mysql.createTable({
        'id': [ 'INT', 'NOT NULL', 'AUTO_INCREMENT', 'PRIMARY KEY'],
        'fname': [ 'VARCHAR(255)' ],
        'lname': [ 'VARCHAR(255)' ],
        'email': [ 'VARCHAR(255)' ]
      }).then((pass) => {
        expect(pass).to.be.true;
      }).catch((e) => {
        throw e;
      });
    });
  });
});
