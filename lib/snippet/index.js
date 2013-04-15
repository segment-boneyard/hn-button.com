module.exports = function anonymous(obj) {

  function escape(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  function section(obj, prop, negate, str) {
    var val = obj[prop];
    if ('function' == typeof val) return val.call(obj, str);
    if (negate) val = !val;
    if (val) return str;
    return '';
  };

  return "<!DOCTYPE html><html><body><a href=\"https://news.ycombinator.com/submit\" class=\"hn-button\">Vote on HN</a> <script>var HN=[];HN.load=function(){var a=\"hn-button.js\";if(document.getElementById(a))return;var b=document.createElement(\"script\");b.id=a,b.src=\"//hn-button.herokuapp.com/hn-button.js\";var c=document.getElementsByTagName(\"script\")[0];c.parentNode.insertBefore(b,c);var d=function(a){var b=function(){HN.push([a].concat(Array.prototype.slice.call(arguments,0)))};return b};HN.on=d(\"on\"),HN.once=d(\"once\"),HN.off=d(\"off\"),HN.emit=d(\"emit\")},HN.load() </script></body></html>"
}