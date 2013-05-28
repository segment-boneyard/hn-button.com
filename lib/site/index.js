
/**
 * Module dependencies.
 */

var express = require('express')
  , hbs     = require('hbs');


/**
 * App.
 */

var app = module.exports = express()
  .set('views', __dirname)
  .engine('html', hbs.__express);


/**
 * Route.
 */

app.get('/', function (req, res, next) {
  res.render('index.html');
});