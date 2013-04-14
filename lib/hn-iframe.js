
/**
 * Cache some elements.
 */

var button = document.getElementById('hn-button')
  , count = document.getElementById('hn-button-count');


/**
 * On load, emit a width event so the parent can resize us.
 */

window.onload = function (event) {
  var el = count || button; // fallback in case count doesnt exist
  emit('width', {
    width : el.getBoundingClientRect().right
  });
};


/**
 * Emit on button clicks.
 */

button.onclick = function (event) {
  emit(this.getAttribute('data-action'));
};


/**
 * Emits an event to the parent window.
 *
 * @param {String} event  The name of the event.
 * @param {Object} data   The data to send with the message.
 */

function emit (event, data) {
  window.parent.postMessage({
    event : event,
    data : data
  }, '*');
}