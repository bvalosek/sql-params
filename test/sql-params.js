var test = require('tape');

var sqlParams = require('../index.js');

test('sql expand', function(t) {
  t.plan(1);

  var r = sqlParams('@a @b @c', { a: 1, b: 2, c: 3 });

  t.deepEqual(r, {
    text: '$1 $2 $3',
    values: [1,2,3]
  });

});

test('throws on missing var', function(t) {
  t.plan(1);

  t.throws(function() {
    sqlParams('@a @nope', { a: 1 });
  });

});

test('extra ok', function(t) {
  t.plan(1);

  var r = sqlParams('@a b c', { a: 1, b: 2, c: 3 });

  t.deepEqual(r, {
    text: '$1 b c',
    values: [1]
  });

});

test('parenths', function(t) {
  t.plan(1);
  var r = sqlParams('some_func(@id)', {id: 1});

  t.deepEqual(r, {
    text: 'some_func($1)',
    values: [1]
  });
});
