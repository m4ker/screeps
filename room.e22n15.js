// python && ruby
var creep_create = require('creep_create2');
var find_min_road =  require('helper.find_min_road');
module.exports = function () {
    army = Game.rooms.E22N15.find(FIND_HOSTILE_CREEPS);
    army_t = army_r = army_b = army_l = [];
    if (army.length > 0) {
        for (var i in army) {
            if (army[i].pos.x == 1) {
                army_t.push(army[i]);
            } else if (army[i].pos.y == 1) {
                army_l.push(army[i]);
            } else if (army[i].pos.x == 48) {
                army_b.push(army[i]);
            } else if (army[i].pos.y == 48) {
                army_r.push(army[i]);
            } else {
                // 已经攻破城墙
            }
        }
    }
    road = find_min_road(Game.rooms.E22N15);
    creep_create(Game.rooms.E22N15, {
        e22n15_ext_1: {
            max: 1,
            body: 'CCCC MM',
            condition: true
        },
        e22n15_ext_2: {
            max: army.length > 0 ? 3 : 1,
            body: 'CCCCC CCCCC MMMMM',
            condition: true
        },
        e22n15_left_guard: {
            max: 3,
            body: 'MMMMM MMMMM MMMMM AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA',
            condition: army_l.length > 0
        },
        e22n15_bottom_guard: {
            max: 3,
            body: 'MMMMM MMMMM MMMMM AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA',
            condition: army_b.length > 0
        },
        e22n15_right_guard: {
            max: 3,
            body: 'MMMMM MMMMM MMMMM AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA',
            condition: army_r.length > 0
        },
        e22n15_war_builder: {
            max: army.length > 3 ? 3 : army.length,
            body : 'WWWWW WWWWW CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM',
            condition: army.length > 0
        },
        e22n15_harvester_1: {
            max: 1,
            body: 'WWWWW WW CCCCC CCC MMMMM MMM',
            condition: true
        },
        e22n15_harvester_2: {
            max: 1,
            body: 'WWWWW WWWW CCCCC CCCCC MMMMM MMMMM',
            condition: true
        },
        e22n15_upgrader: {
            max: army.length > 0 ? 1 : 2,
            body: 'WWWWW WWWWW WWWWW CCCCC MMMMM',
            condition: true
        },
        e22n15_upgrader_recharger: {
            max: army.length > 0 ? 1 : 1,
            body : 'CCCCC CCCCC CCCCC MMMMM MMM',
            //body : 'CCCCC CCCCC MMMMM',
            condition: true
        },
        e22n15_repairer: {
            max: 1,
            body: 'WWWWW CCCCC MMMMM',
            condition: true && road.hits < (road.hitsMax * 0.8)
        },
        e22n15_builder: {
            max: 1,
            body: 'WWWWW CCCCC MMMMM',
            condition: army.length == 0
        },
        e22n14_harvester_1: {
            max: 1,
            body: 'WWWWW MMM',
            condition: army_b.length === 0
        },
        e22n14_carryer_1: {
            max: 1,
            body: 'CCCCC CCCCC CCCCC MMMMM MMM',
            condition: army_b.length === 0
        },
        e22n14_repairer: {
            max: 1,
            body: 'WW CC MM',
            condition: army_b.length === 0 && new Date().getHours() % 7 == 4
        },
        e21n15_harvester_1: {
            max: 1,
            body: 'WWWWW MMM',
            condition: army_l.length === 0
        },
        e21n15_carryer_1: {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMM',
            condition: army_l.length === 0
        },
        e21n15_repairer: {
            max: 1,
            body: 'WW CC MM',
            condition: army_l.length === 0 && new Date().getHours() % 7 == 5
        },

        e22n16_harvester_1: {
            max: 1,
            body: 'WWWWW MMM',
            condition: true
        },
        e22n16_carryer_1: {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMM',
            condition: true
        },
        e22n16_repairer: {
            max: 1,
            body: 'WW CC MM',
            condition: army_b.length === 0 && new Date().getHours() % 7 == 6
        },
    });
}