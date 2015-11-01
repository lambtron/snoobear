
/**
 * Module dependencies.
 */

var views = require('co-views');
var swig = views(__dirname + '/../../client/html/', { map: { html: 'swig' } });

/**
 * Expose `swig`.
 */

module.exports = swig;
