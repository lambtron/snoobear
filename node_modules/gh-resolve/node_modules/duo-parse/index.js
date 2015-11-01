
/**
 * Module dependencies.
 */

var debug = require('debug')('duo-parse');
var memoize = require('memoize-sync');

/**
 * Export `parse`
 */

module.exports = memoize(parse);

/**
 * Parse the given `slug`.
 *
 * @param {String} slug
 * @return {Object}
 * @api public
 */

function parse(slug) {
  var obj = { slug: slug };
  var at, colon, parts;

  if (~(at = slug.indexOf('@'))) {
    var split = slug.substring(at + 1);
    parts = slug.substring(0, at).split('/');
    if (~(colon = split.indexOf(':'))) {
      // user/repo@version:path
      obj.ref = split.substring(0, colon);
      obj.path = split.substring(colon + 1);
    } else {
      // user/repo@version
      obj.ref = split;
    }
  } else {
    if (~(colon = slug.indexOf(':'))) {
      // user/repo:path
      obj.path = slug.substring(colon + 1);
      parts = slug.substring(0, colon).split('/');
    } else {
      // user/repo
      parts = slug.split('/');
    }
  }

  if (parts.length === 3) {
    // provider.com/someuser/somerepo
    obj.provider = parts[0];
    obj.user = parts[1];
    obj.repo = parts[2];
  } else if (parts.length === 2) {
    // someuser/somerepo
    obj.user = parts[0];
    obj.repo = parts[1];
  } else {
    // somerepo
    obj.repo = parts[0];
  }

  obj.provider = obj.provider || 'github.com';

  debug('parsed %s', slug, obj);
  return obj;
}
