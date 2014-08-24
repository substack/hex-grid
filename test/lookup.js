var grid = require('../');
var test = require('tape');

test('lookup index', function (t) {
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
    var g = grid({ width: 45*3+10 }, hexes);
    t.equal(g.lookupIndex(0, 0), -1);
    t.equal(g.lookupIndex(30, 30), 0);
    t.equal(g.lookupIndex(100, 100), 7);
});

test('lookup', function (t) {
    t.plan(3);
    var hexes = [
        { width: 45, height: 60, i: 100 },
        { width: 45, height: 60, i: 101 },
        { width: 45, height: 60, i: 102 },
        { width: 45, height: 60, i: 103 },
        { width: 45, height: 60, i: 104 },
        { width: 45, height: 60, i: 105 },
        { width: 45, height: 60, i: 106 },
        { width: 45, height: 60, i: 107 },
        { width: 45, height: 60, i: 108 },
        { width: 45, height: 60, i: 109 }
    ];
    var g = grid({ width: 45*3+10 }, hexes);
    t.equal(g.lookup(0, 0), undefined);
    t.equal(g.lookup(30, 30).i, 100);
    t.equal(g.lookup(100, 100).i, 107);
});
