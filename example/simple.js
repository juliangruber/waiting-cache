var Cache = require('..');

var cache = new Cache();

cache.get('foo', function (value) {
  console.log('cache miss: ' + value);
});

cache.caching('foo');

cache.get('foo', function (value) {
  console.log('cache hit after waiting: ' + value);
});

cache.set('foo', 'bar');

cache.get('foo', function (value) {
  console.log('cache hit: ' + value);
});
