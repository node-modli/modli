var Promise = require('bluebird');
var inmem = {

  // Stores the records
  store: [],

  // No options for this adapter
  config: function () {
    // No-opts
    return true;
  },

  // Generates a unique identifier for the record
  genUUID: function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  },

  // Creates a record based on the body passed
  create: function (body) {
    // Test validation
    const validationErrors = inmem.validate(body);
    // Return promise
    return new Promise(function (resolve, reject) {
      /* istanbul ignore if */
      if (validationErrors) {
        reject(validationErrors);
      } else {
        var record = body;
        record.id = inmem.genUUID();
        inmem.store.push(record);
        resolve(record);
      }
    });
  },

  // Reads a record based on the ID passed
  read: function (id) {
    return new Promise(function (resolve, reject) {
      inmem.store.forEach(function (record) {
        if (record.id === id) {
          resolve(record);
          return;
        }
      });
      reject('Not found');
    });
  }
};

exports.inmem = inmem;
