var inside = require('point-in-polygon');
var defined = require('defined');

module.exports = function (opts, hexes) {
    var rsize = dims(opts);
    var hsize = dims(isharray(hexes) ? hexes[0] : hexes);
    if (!isharray(hexes)) {
        var h = hexes;
        hexes = [];
        for (var i = 0; i < h.n; i++) hexes.push(h);
    }
    var spacing = defined(opts.spacing, 0);
    var offset = opts.offset;
    if (!offset && opts.element) {
        offset = {
            x: opts.element.offsetLeft,
            y: opts.element.offsetTop
        };
    }
    if (!offset) {
        offset = {
            x: defined(opts.offsetLeft, 0),
            y: defined(opts.offsetTop, 0)
        };
    }
    var initRow = defined(opts.initRow, 0);
    initRow = parseInt(initRow, 10);
    if (initRow > 1) initRow = 1;
    if (initRow < 0) initRow = 0;

    var x = (initRow === 1) ? (hsize.width / 2) + (spacing / 2) : 0;
    var y = 0;
    var row = initRow;
    var results = [], points = [];
    for (var i = 0; i < hexes.length; i++) {
        var hex = hexes[i];
        if (hex.style) {
            hex.style.position = 'absolute';
            hex.style.left = x;
            hex.style.top = y;
        }
        results.push({ x: x, y: y });

        var hw = hsize.width / 2, hh = hsize.height / 2;
        var cx = x + hw, cy = y + hh;
        var pts = [
            [ cx, cy - hh ],
            [ cx + hw, cy - hh / 2 ],
            [ cx + hw, cy + hh / 2 ],
            [ cx, cy + hh ],
            [ cx - hw, cy + hh / 2 ],
            [ cx - hw, cy - hh / 2 ]
        ];
        points.push(pts);

        x += hsize.width + spacing;
        if (x > rsize.width - hsize.width) {
            y += Math.floor(hsize.height * 3/4) + spacing;
            row ++;
            x = (row % 2 ? (hsize.width / 2) + (spacing / 2) : 0);
        }
    }
    var res = {
        grid: results,
        points: points,
        lookupIndex: function (x, y) {
            var pt = [ x - offset.x, y - offset.y ];
            for (var i = 0; i < points.length; i++) {
                if (inside(pt, points[i])) return i;
            }
            return -1;
        },
        lookup: function (x, y) {
            var i = res.lookupIndex(x, y);
            return i >= 0 ? hexes[i] : undefined;
        }
    };
    return res;
};

function dims (opts) {
    var s = opts;
    if (opts.width || opts.height) {
        s = opts;
    }
    else if (opts.element) {
        s = window.getComputedStyle(opts.element);
    }
    else if (typeof window !== 'undefined' && window.getComputedStyle) {
        s = window.getComputedStyle(opts);
    }
    return {
        width: parseInt(s.width),
        height: parseInt(s.height)
    };
}

function isharray (xs) {
    return xs && typeof xs === 'object' && typeof xs.length === 'number';
}
