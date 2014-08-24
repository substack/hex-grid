module.exports = function (opts, hexes) {
    var rsize = dims(opts);
    var hsize = dims(isharray(hexes) ? hexes[0] : hexes);
    if (!isharray(hexes)) {
        var h = hexes;
        hexes = [];
        for (var i = 0; i < h.n; i++) hexes.push(h);
    }
    var spacing = opts.spacing === undefined ? 0 : opts.spacing;
    
    var x = 0, y = 0, row = 0;
    var results = [];
    for (var i = 0; i < hexes.length; i++) {
        var hex = hexes[i];
        if (hex.style) {
            hex.style.position = 'absolute';
            hex.style.left = x;
            hex.style.top = y;
        }
        results.push({ x: x, y: y });
        x += hsize.width + spacing;
        if (x > rsize.width - hsize.width) {
            y += Math.floor(hsize.height * 3/4) + spacing;
            row ++;
            x = (row % 2 ? hsize.width / 2 : 0) + (spacing / 2);
        }
    }
    return results;
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
