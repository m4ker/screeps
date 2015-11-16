var creep_create = require('creep_create2');
var find_min_road =  require('helper.find_min_road');
module.exports = function () {
    army = Game.rooms.E24N13.find(FIND_HOSTILE_CREEPS);
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
    road = find_min_road(Game.rooms.E24N13);
    creep_create(Game.rooms.E24N13, {
        e24n13_ext_1: {
            max: 1,
            body: 'CCCC MM',
            condition: true
        },
        e24n13_ext_2: {
            max: army.length > 0 ? 2 : 1,
            body: 'CCCCC CCCCC MMMMM',
            condition: true
        },
        guard: {
            max: army.length > 2 ? 2 : army.length,
            body: 'MMMMM MMMMM MMMMM AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA',
            condition: army.length > 0
        },
        e24n13_war_builder: {
            max: army.length > 5 ? 5 : army.length,
            body: 'WWWWW WWWWW CCCCC CCCCC MMMMM MMMMM',
            condition: army.length > 0
        },
        e24n13_harvester_1 : {
            max: 1,
            body: 'WWWWW WWWWW WWWWW W CCCCC CCCCC CCCCC CC MMMMM MMMMM MMMMM MM',
            condition: true
        },
        e24n13_harvester_2 : {
            max: 1,
            body:'WWWWW WWWWW WWWWW W CCCCC CCCCC CCCCC CC MMMMM MMMMM MMMMM MM',
            condition: true
        },
        e24n14_dragon_killer_1 : {
            max: 1,
            body:'TTTTT TTTTT TTTT MMMMM MMMMM MMMMM MMMMM AAAAA AAAAA AAAAA H',
            condition: true
        },
        e24n14_harvester_1 : {
            max: 1,
            body: 'WWWWW MMM',
            condition: army_t.length == 0
        },
        e24n14_carryer_1 : {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCC MMMMM MMMM',
            condition: army_t.length == 0
        },
        e24n14_dragon_killer_2 : {
            max: 0,
            body:'TTTTT TTTTT TTTT MMMMM MMMMM MMMMM MMMMM AAAAA AAAAA AAAAA H',
            condition: army_t.length == 0
        },
        e24n14_harvester_2 : {
            max: 0,
            body: 'WWWWW MMM',
            condition: army_t.length == 0
        },
        e24n14_carryer_2 : {
            max: 0,
            body: 'CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM',
            condition: army_t.length == 0
        },
        e24n13_upgrader: {
            max: 1,
            body: 'WWWWW WWWWW WWWWW CCCC MMMMM MMMMM',
            condition: true
        },
        e24n13_upgrader_recharger: {
            max: 1,
            body: 'CCCCC CCCCC CC MMMMM M',
            condition: true
        },
        e24n12_harvester_1 : {
            max: 1,
            body: 'WWWWW MMM',
            condition: army_b.length == 0
        },
        e24n12_carryer_1 : {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM',
            condition: army_b.length == 0
        },
        e24n12_harvester_2 : {
            max: 1,
            body: 'WWWWW MMM',
            condition: army_b.length == 0
        },
        e24n12_carryer_2 : {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMM',
            condition: army_b.length == 0
        },
        e24n12_builder : {
            max: 1,
            body: 'WW CCCC MMM',
            condition: army_b.length == 0 && new Date().getHours() % 7 == 2
        },
        e24n13_reparier: {
            max: 1,
            body: 'WWWWW CCCCC MMMMM',
            condition: true && road.hits < (road.hitsMax * 0.8)
        },
        e24n13_builder: {
            max: 1,
            body: 'WWWWW CCCCC MMMMM',
            condition: army.length == 0
        }
    });
}