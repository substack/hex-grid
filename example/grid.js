var grid = require('../');

var hexes = document.querySelectorAll('.hex');
var root = document.querySelector('#grid');

function scan () {
    grid({ element: root, spacing: 4 }, hexes);
}

scan();
window.addEventListener('resize', scan);
window.addEventListener('load', scan);
