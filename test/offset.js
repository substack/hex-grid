var grid = require('../');
var test = require('tape');

test('element offset', function (t) {
    t.plan(3);
    var hexes = [
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 }
    ];
    var g = grid({
        width: 45*3+10,
        element: {
            offsetLeft: 1000,
            offsetTop: 2000
        }
    }, hexes);
    t.equal(g.lookupIndex(1000, 2000), -1);
    t.equal(g.lookupIndex(1030, 2030), 0);
    t.equal(g.lookupIndex(1100, 2100), 7);
});

test('offset', function (t) {
    t.plan(3);
    var hexes = [
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 },
        { width: 45, height: 60 }
    ];
    var g = grid({
        width: 45*3+10,
        offset: { x: 1000, y: 2000 }
    }, hexes);
    t.equal(g.lookupIndex(1000, 2000), -1);
    t.equal(g.lookupIndex(1030, 2030), 0);
    t.equal(g.lookupIndex(1100, 2100), 7);
});
