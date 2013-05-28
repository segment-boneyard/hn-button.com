
/**
 * Module dependencies.
 */

var express = require('express')
  , hbs     = require('hbs')
  , url     = require('url');


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
  // redirect to the prettier hn-button.com if they aren't https
  if (req.get('host') === 'hn-button.herokuapp.com' && req.protocol === 'http') {
    res.redirect(301, 'http://hn-button.com');
  } else {
    res.render('index.html');
  }
});