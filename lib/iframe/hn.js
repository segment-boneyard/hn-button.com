
var Cache = require('lru-cache');
var ms = require('ms');
var request = require('superagent');

/**
 * Expose `get`.
 */

module.exports = get;

/**
 * Cache.
 */

var cache = Cache({
  max: 10000,
  ms: ms('1m')
});

/**
 * In flight requests.
 */

var flights = {};

/**
 * Get an HN story by `url`.
 *
 * @param {String} url
 * @param {Function} fn
 */

function get(url, fn){
  var story = cache.peek(url);
  if (story) return setImmediate(function(){ fn(null, story); });

  flights[url] = flights[url] || [];
  flights[url].push(fn);

  function done(err, story){
    if (!err && story) cache.set(url, story);
    flights[url].forEach(function(fn){ fn(err, story); });
    flights[url] = [];
  }

  request
    .get(endpoint(url))
    .end(function(err, res){
      if (err) return done(err);
      var hits = res.body.hits;
      if (!hits) return done();
      return done(null, hits[0]);
    });
}

/**
 * Return the Hacker News API endpoint for a given `url`.
 *
 * @param {String} url
 * @return {String}
 */

function endpoint(url){
  var q = encodeURIComponent(url);
  return 'http://hn.algolia.com/api/v1/search?tags=story&query=' + q;
}