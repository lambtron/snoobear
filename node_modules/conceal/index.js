/**
 * @author Sergi Mansilla <sergi.mansilla@gmail.com>
 */

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Conceals a string or part of it behind a specific character
 * @param {String} str
 * @param [cfg] Configuration options. Optional.
 * @param cfg.ch {String} Character used to conceal. Defaults to '*'.
 * @param cfg.start {Number} Index of the string where to start concealing
 * @param cfg.end {Number} Index of the string where to finish concealing
 * @returns {string}
 */
function conceal(str, cfg) {
  if (!str) return '';
  if (!cfg) return Array(str.length + 1).join('*');

  var len = str.length;
  var ch = cfg.ch = (cfg.ch || '*')[0];
  var start = cfg.start = isNumber(cfg.start) ? cfg.start : 0;
  var end = cfg.end = isNumber(cfg.end) ? cfg.end : len;

  var codified = '';
  if (start <= len - 1 && start <= end) {
    codified = str.substring(start, end + 1);
  }

  return str.substring(0, start) + Array(codified.length + 1).join(ch) +
    str.substring(end + 1, len);
}

module.exports = conceal;
