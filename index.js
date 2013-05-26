
/**
 * Module dependencies.
 */

var express = require('express')
  , app = module.exports = express();


/**
 * Settings.
 */

app.use(express.static(__dirname + '/public'));


/**
 * Mount.
 *
 * `iframe` comes first, since we want to pass through to the site when the
 * proper query params aren't there.
 */

app.use(require('iframe'));
app.use(require('site'));


/**
 * Listen.
 */

var port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log('Listening on ' + port + '...');
});