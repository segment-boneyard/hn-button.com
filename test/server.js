
/**
 * Module dependencies.
 */

var express = require('express')
  , fs      = require('fs')
  , path    = require('path');


/**
 * App.
 */

var app = module.exports = express()
  .use(express.static(path.resolve(__dirname, '..')));


/**
 * Test page.
 */

app.get('/', function (req, res, next) {
  fs.createReadStream(path.resolve(__dirname, 'test.html')).pipe(res);
});


/**
 * Listen.
 */

app.listen(7777);