//Javascript && PHP
var creep_create = require('creep_create2');
var find_min_road =  require('helper.find_min_road');
module.exports = function () {
    army = Game.rooms.E23N14.find(FIND_HOSTILE_CREEPS);
    //army_length = army.length;// + e23n15_army.length + e23n13_army.length;
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
    road = find_min_road(Game.rooms.E23N14);
    creep_create(Game.rooms.E23N14, {
        e23n14_ext_1: {
            max: 1,
            body: 'CCCC MM',
            condition: true
        },
        e23n14_ext_2: {
            max: army.length > 0 ? 2 : 1,
            body: 'CCCCC CCCCC MMMMM',
            condition: true
        },
        guard: {
            max: army.length > 2 ? 2 : army.length,
            body: 'MMMMM MMMMM MMMMM AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA',
            condition: army.length > 0
        },
        e23n14_war_builder: {
            max: army.length > 3 ? 3 : army.length,
            body: 'WWWWW WWWWW CCCCC CCCCC MMMMM MMMMM',
            condition: army.length > 0
        },
        e23n14_harvester_1: {
            max: 1,
            body: 'WWWWW WWWWW CCCCC CCCCC MMMMM MMMMM',
            condition: true
        },
        e23n14_harvester_2: {
            max: 1,
            body: 'WWWWW WWWWW WW CCCCC CCCCC CC MMMMM MMMMM MM',
            condition: true
        },
        attacker: {
            max: 0,
            body: 'AAAAA AAAAA AAAAA AAAAA MMMMM MMMMM',
            condition: true
        },
        // controller upgrader
        e23n14_upgrader: {
            max: 0,
            //body: 'WWWWW WWWWW WWWWW CC MMMMM MMMM',
            body: 'WCM',
            condition: true
        },
        e23n14_upgrade_recharger: {
            max: 0,
            //body: 'CCCCC CCCCC MMMMM',
            body: 'WCM',
            condition: true
        },
        e23n13_harvester_1: {
            max: 1,
            body: 'WWWWW MMM',
            condition: army_b.length == 0
        },
        e23n13_carryer_1: {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMM',
            condition: army_b.length == 0
        },
        e23n13_repairer: {
            max: 1,
            body: 'WW CCCCC C MMMM',
            condition: army_b.length == 0 && new Date().getHours() % 6 == 0
        },
        e23n15_harvester_1: {
            max: 1,
            body: 'WWWWW MMM',
            condition: army_t.length == 0
        },
        e23n15_carryer_1: {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM',
            condition: army_t.length == 0
        },
        // kill me
        e23n15_builder: {
            max: 0,
            body: 'WW CCCC MMM',
            condition: army_t.length == 0
        },
        e23n15_repairer: {
            max: 1,
            body: 'WW CCC MMM',
            condition: army_t.length == 0 && new Date().getHours() % 7 == 1
        },
        e23n15_harvester_2: {
            max: 1,
            body: 'WWWWW MMM',
            condition: army_t.length == 0
        },
        e23n15_carryer_2: {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM',
            condition: army_t.length == 0
        },
        e23n14_repairer: {
            max: 1,
            body: 'WWWWW CCCCC MMMMM',
            condition: true && road.hits < (road.hitsMax * 0.8)
        },
        e23n14_builder: {
            max: 2,
            body: 'WWWWW WWWWW CCCCC CCCCC MMMMM MMMMM',
            condition: army.length == 0
        }
    });
}
