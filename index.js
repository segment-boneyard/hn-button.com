
/**
 * Module dependencies.
 */

var express = require('express')
  , hbs = require('hbs')
  , path = require('path');


/**
 * App.
 */

var build = path.resolve(__dirname, 'build');

var app = module.exports = express()
  .engine('html', hbs.__express)
  .set('views', build)
  .use(express.static(build));


/**
 * The button's iframe page.
 */

app.get('/', function (req, res, next) {
  var url = req.query.url
    , title = req.query.title
    , count = req.query.count
    , style = req.query.style;

  if (!url || !title) res.redirect('https://github.com/segmentio/hn-button');

  // TODO: actually do stuff here.

  var votes = 192
    , text = votes ? 'Vote' : 'Submit'
    , href = 'TODO';

  res.render('hn-iframe.min.html', {
    action : text.toLowerCase(),
    count  : count,
    href   : href,
    style  : style,
    text   : text,
    votes  : number(votes)
  });
});


/**
 * Listen.
 */

var port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log('Listening on ' + port + '...');
});


/**
 * Formats a number of votes into a nice string.
 *
 * @param {Int} votes  The number of votes.
 * @return {String}    The number of votes, formatted nicely.
 */

function number (int) {
  if (int > 999) {
    return Math.round(int / 100) / 10 + 'k';
  } else {
    return int + '';
  }
}