var grid = require('../');
var test = require('tape');

test('update', function (t) {
    t.plan(11);
    var hexes = [
        { width: 45, height: 60, style: {} },
        { width: 45, height: 60, style: {} },
        { width: 45, height: 60, style: {} },
        { width: 45, height: 60, style: {} },
        { width: 45, height: 60, style: {} },
        { width: 45, height: 60, style: {} },
        { width: 45, height: 60, style: {} },
        { width: 45, height: 60, style: {} },
        { width: 45, height: 60, style: {} },
        { width: 45, height: 60, style: {} }
    ];
    var res = grid({ width: 45*3+10 }, hexes);
    var expected = [
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
    ];
    t.deepEqual(res.grid, expected);
    
    for (var i = 0; i < 10; i++) {
        t.deepEqual(hexes[i].style, {
            position: 'absolute',
            left: expected[i].x,
            top: expected[i].y
        });
    }
});
