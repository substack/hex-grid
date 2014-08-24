var grid = require('../');
var test = require('tape');

test('grid', function (t) {
    t.plan(1);
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
    var res = grid({ width: 45*3+10 }, hexes);
    t.deepEqual(res.grid, [
        { x: 45*0, y: 0 },
        { x: 45*1, y: 0 },
        { x: 45*2, y: 0 },
        { x: 45*0+45/2, y: 60*3/4 },
        { x: 45*1+45/2, y: 60*3/4 },
        { x: 45*0, y: 60*3/4*2 },
        { x: 45*1, y: 60*3/4*2 },
        { x: 45*2, y: 60*3/4*2 },
        { x: 45*0+45/2, y: 60*3/4*3 },
        { x: 45*1+45/2, y: 60*3/4*3 }
    ]);
});
