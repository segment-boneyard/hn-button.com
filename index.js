
/**
 * Module dependencies.
 */

var express = require('express')
  , jade = require('jade');


/**
 * App.
 */

var app = module.exports = express()
  .set('views', __dirname)
  .set('view engine', 'jade');


/**
 * Index page.
 */

app.get('/', function (req, res, next) {
  res.redirect('https://github.com/segmentio/hn-button');
});


/**
 * Button page.
 */

app.get('/hn-button', function (req, res, next) {
  var url = req.query.url;
  var title = req.query.title;

  if (!url || !title) throw new Error('url and title required');

  var href, action, text, count;

  res.render('hn-button', {
    action : 'submit',
    count : 80,
    href : 'https://segment.io',
    text : 'Submit'
  });
});


/**
 * Listen.
 */

app.listen(8888);