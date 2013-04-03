
# waiting-cache

In-memory cache that prevents redundant async work.

[![Build Status](https://travis-ci.org/juliangruber/waiting-cache.png?branch=master)](https://travis-ci.org/juliangruber/waiting-cache)

[![browser support](https://ci.testling.com/juliangruber/waiting-cache.png)](https://ci.testling.com/juliangruber/waiting-cache)

## Usage

```js
var Cache = require('waiting-cache');

var cache = new Cache();

// if nothing is cached or being cached, produces a cache miss
cache.get('foo', function (value) {
  console.log('cache miss: ' + value);
});

// mark `foo` as being cached
cache.caching('foo');

// the cache will wait until `foo` has been cached
cache.get('foo', function (value) {
  console.log('cache hit after waiting: ' + value);
});

// put `foo` into the cache
cache.set('foo', 'bar');

// this calls back immediately
cache.get('foo', function (value) {
  console.log('cache hit: ' + value);
});
```

## API

### Cache(opts)

Create a new cache.

You can overwrite the default in-memory storage by providing `opts.store`. See
`lib/mem_store.js` for an example implementation.

### Cache#get(key, fn)

Get the value stored at `key`.

Waits when the value is being cached (as signaled by `cache#caching`).
If the value couldn't be found returns `null`.

### Cache#set(key, value)

Store `value` under `key` in the cache. Notifies waiting `cache#get`
requests.

### Cache#caching(key)

Mark `key` as being cached. Call `Cache#set` to resolve.

## Installation

With [npm](http://npmjs.org) do

```bash
$ npm install waiting-cache
```

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
