var EventEmitter = require('events').EventEmitter;
var inherits     = require('util').inherits;
var memStore     = require('./lib/mem_store');

module.exports = cache;

/**
 * Cache.
 */

function cache (opts) {
  if (!(this instanceof cache)) return new cache(opts);
  EventEmitter.call(this);

  if (!opts) opts = {};

  this._store = opts.store || memStore();

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
  var self = this;

  self._store.get(key, function (value) {
    if (typeof value != 'undefined' || !self._caching[key]) return cb(value);
    self.once(key, cb);
  });
}

/**
 * Store `value` under `key` in the cache.
 *
 * Notifies waiting `cache#get` requests.
 *
 * @param {String} key
 * @param {Object} value
 * @param {Function} cb
 */

cache.prototype.set = function (key, value, cb) {
  var self = this;

  self._store.set(key, value, function (err) {
    if (err) return cb(err);
    delete self._caching[key];
    if (cb) cb();
    self.emit(key, value);
  });
}

/**
 * Mark `key` as being cached.
 *
 * @param {String} key
 */

cache.prototype.caching = function (key) {
  this._caching[key] = true;
}