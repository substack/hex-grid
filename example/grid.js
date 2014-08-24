var grid = require('../');

var hexes = document.querySelectorAll('.hex');
var root = document.querySelector('#grid');

var g;
function scan () {
    g = grid({ element: root, spacing: 4 }, hexes);
}

scan();
window.addEventListener('resize', scan);
window.addEventListener('load', scan);

var prev;
root.addEventListener('mousemove', function (ev) {
    var h = g.lookup(ev.pageX, ev.pageY);
    if (!h) return;
    if (prev) prev.style.opacity = 0.5;
    h.style.opacity = 1;
    prev = h;
});
