
/**
 * Module dependencies.
 */

var express = require('express')
  , hbs = require('hbs');


/**
 * App.
 */

var app = module.exports = express()
  .engine('html', hbs.__express)
  .set('views', __dirname + '/build');


/**
 * Index redirect.
 */

app.get('/', function (req, res, next) {
  res.redirect('https://github.com/segmentio/hn-button');
});


/**
 * The button's iframe page.
 */

app.get('/hn-button', function (req, res, next) {
  var url = req.query.url;
  var title = req.query.title;

  if (!url || !title) throw new Error('url and title required');

  // TODO: actually do stuff here.

  res.render('hn-button.min.html', {
    action : 'submit',
    count : 80,
    href : 'https://segment.io',
    text : 'Submit'
  });
});


/**
 * Listen.
 */

var port = process.env.PORT || 8888;

console.log(process.env);

app.listen(port, function () {
  console.log('Listening on ' + port);
});