
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
  .use(express.static(path.resolve(__dirname, '..')))
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

app.listen(7777);