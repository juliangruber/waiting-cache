var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

module.exports = cache;

/**
 * Cache.
 */

function cache () {
  if (!(this instanceof cache)) return new cache();
  EventEmitter.call(this);

  this._cache = {};
  this._caching = [];
}

inherits(cache, EventEmitter);

/**
 * Get the value stored at `key`.
 *
 * Waits when the value is being cached (as signaled by `cache#caching`).
 * If the value couldn't be found returns `null`.
 *
 * @param {String} key
 * @param {Function} cb
 */

cache.prototype.get = function (key, cb) {
  if (typeof this._cache[key] != 'undefined') {
    cb(this._cache[key]);
    return;
  }

  if (this._caching[key]) {
    this.once(key, function (value) {
      delete this._caching[key];
      cb(value);
    });
    return;
  }

  cb(null);
}

/**
 * Store `value` under `key` in the cache.
 *
 * Notifies waiting `cache#get` requests.
 *
 * @param {String} key
 * @param {Object} value
 */

cache.prototype.set = function (key, value) {
  this._cache[key] = value;
  this.emit(key, value);
}

/**
 * Mark `key` as being cached.
 *
 * @param {String} key
 */

cache.prototype.caching = function (key) {
  if (this._caching[key]) return;
  this._caching[key] = true;
}
