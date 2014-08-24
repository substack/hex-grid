# hex-grid

tile hexagons in a grid layout

[![build status](https://secure.travis-ci.org/substack/hex-grid.png)](http://travis-ci.org/substack/hex-grid)

# example

## in the browser

[view this demo on neocities](http://substack.neocities.org/hex_grid.html)

Given this html with a `#grid` div full of hex image badges:

``` html
<!doctype html5>
<html>
  <head>
    <style>
      h1 { color: yellow; }
      body { background-color: rgb(88,20,94); }
      .hex { opacity: 0.5; }
    </style>
  </head>
  <body>
    <h1>way cool</h1>
    <div id="grid" style="position: relative">
      <img src="images/async.png" class="hex">
      <img src="images/binary.png" class="hex">
      <img src="images/browserify.png" class="hex">
      <img src="images/bug-clinic.png" class="hex">
      <img src="images/es6.png" class="hex">
      <img src="images/express.png" class="hex">
      <img src="images/functional.png" class="hex">
      <img src="images/git-it.png" class="hex">
      <img src="images/hapi.png" class="hex">
      <img src="images/koa.png" class="hex">
      <img src="images/learnyounode.png" class="hex">
      <img src="images/levelmeup.png" class="hex">
      <img src="images/lodash.png" class="hex">
      <img src="images/native.png" class="hex">
      <img src="images/nodebots.png" class="hex">
      <img src="images/nodeschool.png" class="hex">
      <img src="images/promise.png" class="hex">
      <img src="images/proto.png" class="hex">
      <img src="images/shader-school.png" class="hex">
      <img src="images/stream-adventure.png" class="hex">
      <img src="images/threejs.png" class="hex">
    </div>
    <script src="bundle.js"></script>
  </body>
</html>
```

We can tile the hex images in a tessellating pattern and recompute the
tesselation when the window size changes.

When the mouse hovers over a hex tile, its opacity is set to 100%.

``` js
var grid = require('hex-grid');

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
```

## in node

You can use these algorithms directly in node too:

``` js
var grid = require('hex-grid');

var res = grid({ width: 45*3+10 }, { width: 45, height: 60, n: 10 });
console.log(res.grid);
```

output:

```
[ { x: 0, y: 0 },
  { x: 45, y: 0 },
  { x: 90, y: 0 },
  { x: 22.5, y: 45 },
  { x: 67.5, y: 45 },
  { x: 0, y: 90 },
  { x: 45, y: 90 },
  { x: 90, y: 90 },
  { x: 22.5, y: 135 },
  { x: 67.5, y: 135 } ]
```

# methods

``` js
var grid = require('hex-grid')
```

## var res = grid(opts, hexes)

Position an array of `hexes` absolutely.

Instead of an html element, each item in `hexes` can also be an object with
`width` and `height` properties. If the item has a `style` property, it will be
updated with the computed `left` and `top` positions.

The width of the container is given by `opts.width` or if `opts` is an html
element, the width will be computed.

You can set the spacing in pixels between hex elements with `opts.spacing`.

Instead of an array, `hexes` can be an object with a `width`, `height`, and `n`
property indicating the number of hex elements to generate.

In any case, the return value `res` is an array of objects with `x` and `y`
coordinates.

`opts.offset.x`/`opts.offsetLeft` and `opts.offset.y`/`opts.offsetTop` will
offset the lookup functions by an appropiate amount.

## var hex = res.lookup(x, y)

Given a coordinate pair `x, y`, return the hex tile `hex` from the original
`hexes` array.

## var i = res.lookupIndex(x, y)

Given a coordinate pair `x, y`, return the index `i` of the matching tile in the
`hexes` array.

# properties

## res.grid

An array of the top left bounding box coordinate as objects with `x` and `y`
properties for each hex tile.

This array uses the same indexes as the `hexes` array.

## res.points

An array of arrays of `[x,y]` points comprising each hexagon.

This array uses the same indexes as the `hexes` array.

# install

With [npm](https://npmjs.org) do:

```
npm install hex-grid
```

To use this package in the browser, use [browserify](http://browserify.org)
or fetch a UMD build from [browserify CDN](http://wzrd.in).

# license

MIT
