
/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , hbs = require('hbs')
  , path = require('path');


/**
 * App.
 */

var app = module.exports = express()
  .use(express.static(path.resolve(__dirname, '../public')))
  .engine('html', hbs.__express)
  .set('views', __dirname);


/**
 * Test page.
 */

app.get('/', function (req, res, next) {
  res.render('test.html');
});


/**
 * Listen.
 */

var port = 7777;

app.listen(port, function () {
  console.log('Listening on ' + port + '...');
});