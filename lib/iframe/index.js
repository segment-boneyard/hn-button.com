
/**
 * Module dependencies.
 */

var express = require('express');
var hbs = require('hbs');
var hn = require('./hn');

/**
 * App.
 */

var app = module.exports = express()
  .set('views', __dirname)
  .engine('html', hbs.__express)
  .get('/', iframe);

/**
 * Render the button's iframe. Instead of erroring out of the API is down, just
 * default to the "submit" version of the button.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */

function iframe(req, res, next){
  var query = req.query;
  var url = query.url;
  var title = query.title;
  var count = query.count;
  var style = query.style;

  if (!url || !title) return next();

  hn(url, function(err, story){
    story = story || {};
    var id = story.objectID;
    var pts = story.points || 0;
    var base = 'https://news.ycombinator.com/';
    var href = id
      ? base + 'story?id=' + id
      : base + 'submitlink?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(title);

    res.render('template.min.html', {
      text: pts ? 'Vote' : 'Submit',
      action: pts ? 'vote' : 'submit',
      href: href,
      points: number(pts),
      count: count,
      style: style
    });
  });
}

/**
 * Formats a number of points into a nice string.
 *
 * @param {Number} points
 * @return {String}
 */

function number(points){
  return points > 999
    ? Math.round(points / 100) / 10 + 'k'
    : points + '';
}