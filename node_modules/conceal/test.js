var tape = require('tape');
var conceal = require('./');

tape('Conceal whole string', function(t) {
  var str = 'Big Secret';
  var concealed = conceal(str);
  t.deepEqual(concealed, '**********');
  t.end();
});

tape('Conceal whole string using '%' char', function(t) {
  var str = 'Big Secret';
  var concealed = conceal(str, { ch: '%' });
  t.deepEqual(concealed, '%%%%%%%%%%');
  t.end();
});

tape('Conceal single char string', function(t) {
  var str = 'B';
  var concealed = conceal(str);
  t.deepEqual(concealed, '*');
  t.end();
});

tape('Conceal end of string', function(t) {
  var str = 'Big Secret';
  var concealed = conceal(str, { start: 4 });
  t.deepEqual(concealed, 'Big ******');
  t.end();
});

tape('Conceal part of string', function(t) {
  var str = 'Big Secret';
  var concealed = conceal(str, { start: 4, end: 6 });
  t.deepEqual(concealed, 'Big ***ret');
  t.end();
});

tape('Conceal part of string 2', function(t) {
  var str = 'Big Secret';
  var concealed = conceal(str, { start: 4, end: 9 });
  t.deepEqual(concealed, 'Big ******');
  t.end()
});

tape('Conceal start of string', function(t) {
  var str = 'Big Secret';
  var concealed = conceal(str, { end: 6 });
  t.deepEqual(concealed, '*******ret');
  t.end()
});

tape('Conceal a single character', function(t) {
  var str = 'Big Secret';
  var concealed = conceal(str, { start: 4, end: 4 });
  t.deepEqual(concealed, 'Big *ecret');
  t.end();
});

tape('Conceal beginning single character', function(t) {
  var str = 'Big Secret';
  var concealed = conceal(str, { start: 0, end: 0 });
  t.deepEqual(concealed, '*ig Secret');
  t.end();
});

tape('Conceal end single character', function(t) {
  var str = 'Big Secret';
  var concealed = conceal(str, { start: 9, end: 9 });
  t.deepEqual(concealed, 'Big Secre*');
  t.end();
});
