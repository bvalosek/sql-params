# sql-params

[![Build Status](https://travis-ci.org/bvalosek/sql-params.png?branch=master)](https://travis-ci.org/bvalosek/sql-params)
[![NPM version](https://badge.fury.io/js/sql-params.png)](http://badge.fury.io/js/sql-params)

Use anonymous objects instead of arrays when using parametric SQL queries.

## Installation

```
$ npm install sql-params
```

## Usage

```javascript
var sqlParams = require('sql-params');

var sql    = 'select * from user where points > @points and id = @id';
var params = { points: 24, id: 123 };

var opts = sqlParams(sql, params);
```

Returns a hash with the `pg`-ready parametric SQL string and array of values:

```javascript
{
  text   : 'select * from user where points > $1 and id = $2',
  values : [24, 123]
}
```

You can even pass it directly when using the `query` method with the `pg`
driver:

```javascript
pg.connect(URL, function(err, client) {
  client.query(sqlParams(sql, params), function(err, result) {

    ...

  });
});
```

## Testing

```
$ npm test
```

## License

MIT

