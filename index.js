
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
  var q = req.query
    , url = q.url
    , title = q.title
    , count = q.count
    , style = q.style
    , font = q.font;

  if (!url || !title) res.redirect('https://github.com/segmentio/hn-button');

  // TODO: actually do stuff here.

  var votes = 192
    , text = votes ? 'Vote' : 'Submit'
    , href = 'TODO';

  res.render('hn-iframe.min.html', {
    text       : text,
    action     : text.toLowerCase(),
    href       : href,
    votes      : number(votes),
    count      : count,
    vertical   : count === 'vertical',
    horizontal : count === 'horizontal',
    style      : style,
    font       : font
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