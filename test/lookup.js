var grid = require('../');
var test = require('tape');

test('lookup', function (t) {
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
