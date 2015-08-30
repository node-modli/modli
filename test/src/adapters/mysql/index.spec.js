/* eslint no-unused-expressions: 0 */
/* global expect, request, describe, it, before, after */
import '../../../setup';
import { mysql } from '../../../../src/adapters/mysql/index';

// Mock validation method, this is automatically done by the model
mysql.validate = (body) => {
  // Test validation failure by passing `failValidate: true`
  if (body.failValidate) {
    return { error: true };
  }
  // Mock passing validation, return null
  return null;
};

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

  describe('query', () => {
    it('executes a mysql query against the database', (done) => {
      mysql.query('SELECT 1 + 1 AS solution')
        .then((result) => {
          expect(result[0].solution).to.equal(2);
          done();
        })
        .catch((err) =>  done(err));
    });
  });

  describe('createTable', () => {
    it('creates a new table based on object passed (if not exists)', (done) => {
      mysql.createTable({
        'id': [ 'INT', 'NOT NULL', 'AUTO_INCREMENT', 'PRIMARY KEY'],
        'fname': [ 'VARCHAR(255)' ],
        'lname': [ 'VARCHAR(255)' ],
        'email': [ 'VARCHAR(255)' ]
      })
      .then((result) => {
        expect(result).to.be.an.object;
        done();
      })
      .catch((err) =>  done(err));
    });
  });

  describe('create', () => {
    it('fails when validation does not pass', (done) => {
      mysql.create({
        failValidate: true
      })
      .catch((err) => {
        expect(err).to.have.property('error');
        done();
      });
    });
    it('creates a new record based on object passed', (done) => {
      mysql.create({
        fname: 'John',
        lname: 'Smith',
        email: 'jsmith@gmail.com'
      })
      .then((result) => {
        expect(result.insertId).to.be.a.number;
        done();
      })
      .catch((err) =>  done(err));
    });
  });

  describe('read', () => {
    it('reads all when no query specified', (done) => {
      mysql.read()
        .then((result) => {
          expect(result).to.be.an.array;
          done();
        })
        .catch((err) =>  done(err));
    });
    it('reads specific records when query supplied', (done) => {
      mysql.read('fname="John"')
        .then((result) => {
          expect(result).to.be.an.array;
          done();
        })
        .catch((err) =>  done(err));
    });
  });

  describe('update', () => {
    it('fails when validation does not pass', (done) => {
      mysql.create({
        failValidate: true
      })
      .catch((err) => {
        expect(err).to.have.property('error');
        done();
      });
    });
    it('updates record(s) based on query and body', (done) => {
      mysql.update('fname="John"', {
        fname: 'Bob',
        email: 'bsmith@gmail.com'
      })
        .then((result) => {
          expect(result).to.be.an.object;
          expect(result.affectedRows).to.be.above(0);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('delete', () => {
    it('deletes record(s) based on query', (done) => {
      mysql.delete('fname="Bob"')
        .then((result) => {
          expect(result).to.be.an.object;
          expect(result.affectedRows).to.be.above(0);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('extend', () => {
    it('extends the adapter with a custom method', () => {
      // Extend
      mysql.extend('sayFoo', () => {
        return 'foo';
      });
      // Execute
      expect(mysql.sayFoo()).to.equal('foo');
    });
  });
});
