var test  = require('tape');
var Cache = require('..');

test('cache miss', function (t) {
  var cache = new Cache();
  cache.get('foo', function (value) {
    t.notOk(value, 'cache miss');
    t.end();
  });
});

test('cache hit after waiting', function (t) {
  var cache = new Cache();

  cache.caching('foo');

  cache.get('foo', function (value) {
    t.equal(value, 'bar', 'cache hit after waiting');
    t.end();
  });

  cache.set('foo', 'bar');
});

test('cache hit', function (t) {
  var cache = new Cache();

  cache.set('foo', 'bar');

  cache.get('foo', function (value) {
    t.equal(value, 'bar', 'cache hit');
    t.end();
  });
});



