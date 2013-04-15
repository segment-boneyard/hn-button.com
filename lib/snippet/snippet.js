// Create a global queue, that will eventually turn into the HN button API.
var HN = [];

// Define a method that will load hn-button.js from the server.
HN.load = function () {

  // Use an id to keep from loading the script twice if people copy-paste.
  var id = 'hn-button.js';
  if (document.getElementById(id)) return;

  // Make our script element.
  var script = document.createElement('script');
  script.id = id;
  script.src = '//hn-button.herokuapp.com/hn-button.js';

  // Insert the script element before an element that is guaranteed to exist.
  var firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);

  // Define a factory that generates queueing methods, so they can be called
  // before hn-button.js actually loads, and then replayed.
  var factory = function (method) {
    var queue = function () {
      HN.push([method].concat(Array.prototype.slice.call(arguments, 0)));
    };
    return queue;
  };

  // Create our fake queueing methods.
  HN.on   = factory('on');
  HN.once = factory('once');
  HN.off  = factory('off');
  HN.emit = factory('emit');
};

// Kick off loading hn-button.js.
HN.load();