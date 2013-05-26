
/**
 * Module dependencies.
 */

var express = require('express')
  , hbs     = require('hbs')
  , qs      = require('querystring')
  , hn      = require('hn-item-cache');


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
  var query = req.query
    , url   = query.url
    , title = query.title
    , count = query.count
    , style = query.style;

  if (!url || !title) return next();

  hn(url, function (err, item) {
    if (err) return next(err);

    res.render('template.min.html', {
      text   : item.points ? 'Vote' : 'Submit',
      action : item.points ? 'vote' : 'submit',
      href   : item.id ? 'https://news.ycombinator.com/item?id=' + item.id :
               'https://news.ycombinator.com/submitlink?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(title),
      points : number(item.points || 0),
      count  : count,
      style  : style
    });
  });
});


/**
 * Formats a number of points into a nice string.
 *
 * @param {Number} points  The number of points.
 * @return {String}        The number of points, formatted nicely.
 */

function number (points) {
  if (points > 999) {
    return Math.round(points / 100) / 10 + 'k';
  } else {
    return points + '';
  }
}