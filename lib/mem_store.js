/**
 * Memory storage implementation
 */

module.exports = memStore;

function memStore () {
  if (!(this instanceof memStore)) return new memStore();
  this.store = {};
}

memStore.prototype.get = function (key, cb) {
  var self = this;
  setTimeout(function () {
    cb(self.store[key]);
  });
}

memStore.prototype.set = function (key, value, cb) {
  var self = this;
  setTimeout(function () {
    self.store[key] = value;
    cb();
  });
}