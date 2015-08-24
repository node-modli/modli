var Promise = require('bluebird');
var inmem = {
  
  // Stores the records
  store: {},
  
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
        var record = inmem.store[inmem.genUUID()] = body;
        resolve(record);
      }
    });
  },
  
  // Reads a record based on the ID passed
  read: function (id) {
    return new Promise(function (resolve, reject) {
      if (inmem.store.hasOwnProperty(id)) {
        resolve(inmem.store[id]);
      } else {
        reject('Not found');
      }
    });
  }
};
