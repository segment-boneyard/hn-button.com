
/**
 * Module dependencies.
 */

var express = require('express')
  , hbs = require('hbs')
  , app = module.exports = express();


/**
 * Settings.
 */

app
  .set('views', __dirname)
  .engine('html', hbs.__express);


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

  if (!url || !title) next();

  // TODO: actually do stuff here.

  var votes = 192
    , text = votes ? 'Vote' : 'Submit'
    , href = 'TODO';

  res.render('template.min.html', {
    text : text,
    action : text.toLowerCase(),
    href : href,
    votes : number(votes),
    count : count,
    vertical : count === 'vertical',
    horizontal : count === 'horizontal',
    style : style,
    font : font
  });
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