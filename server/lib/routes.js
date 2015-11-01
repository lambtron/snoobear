
/**
 * Module dependencies.
 */

var render = require('./render');

/**
 * Render index html page.
 */

exports.index = function *() {
  return this.body = yield render('index');
};

/**
 * Render redirect html page.
 */

exports.redirect = function *() {
  return this.body = yield render('redirect');
};
