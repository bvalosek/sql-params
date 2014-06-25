module.exports = sqlParams;

/**
 * Given a hash and parametric sql string, swap all of the @vars into $N args
 * and create an array
 * @param {string} sql Parametric sql string
 * @param {object} hash All of the named arguments
 * @return {{sql:string, args:array.<any>}}
 */
function sqlParams(sql, params)
{
  var args = [];

  var keys = sql.match(/@\w+/g);
  var aKeys = sql.match(/\$\d+/g);

  if (keys && aKeys)
    throw new Error(
      'Cannot use both array-style and object-style parametric values');

  // Array-style (native)
  if (aKeys) {
    return { text: sql, values: params };
  }

  // No params
  if (!keys) {
    return { text: sql, values: [] };
  }

  var n = 1;
  keys.forEach(function(key) {
    key = key.substr(1);
    var val = params[key];
    if (val === undefined)
      throw new Error('No value for @' + key + ' provided');
    args.push(val);
    sql = sql.replace('@' + key, '$' + n++);
  });

  return { text: sql, values: args };
}
