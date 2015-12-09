var creep_create = require('creep_create2');
var find_min_road =  require('helper.find_min_road');
module.exports = function (D) {
    army = D.a.E25N13;
    army_t = army_r = army_b = army_l = [];
    if (army.length > 0) {
        for (var i in army) {
            if (army[i].pos.y < 2) {
                army_t.push(army[i]);
            } else if (army[i].pos.x < 2) {
                army_l.push(army[i]);
            } else if (army[i].pos.x > 47) {
                army_r.push(army[i]);
            } else if (army[i].pos.y > 47) {
                army_b.push(army[i]);
            } else {
                // 已经攻破城墙
            }
        }
    }
    road = find_min_road(Game.rooms.E25N13);
    creep_create(Game.rooms.E25N13, {
        e25n13_manager: {
            max: 0,
            body: 'WWWWW CCCCC MMMMM',
            distance: 0,
            condition: army.length == 0
        },
        e25n13_ext_1: {
            max: 1,
            body: 'CCCC MM',
            distance: 5,
            condition: true
        },
        e25n13_ext_2: {
            max: army.length > 0 ? 2 : 1,
            body: 'CCCCC CCCCC MMMMM',
            distance: 5,
            condition: true
        },
        guard: {
            max: army.length > 2 ? 2 : army.length,
            body: 'MMMMM MMMMM MMMMM AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA',
            distance: 20,
            condition: army.length > 0
        },
        e25n13_war_builder: {
            max: army.length > 5 ? 5 : army.length,
            body: 'WWWWW WWWWW CCCCC CCCCC MMMMM MMMMM',
            distance: 20,
            condition: army.length > 0
        },
        e25n13_harvester_1: {
            max: 1,
            body: 'WWWWW WWWWW WW CCCCC CCCCC CC MMMMM MMMMM MM',
            distance: 12,
            condition: true
        },
        e25n13_harvester_2: {
            max: 1,
            body: 'WWWWW WWWWW CCCCC CCCCC MMMMM MMMMM',
            distance: 10,
            condition: true
        },
        e25n14_dragon_killer_1 : {
            max: 1,
            body:'TTTTT TTTTT TTTT MMMMM MMMMM MMMMM MMMMM AAAAA AAAAA AAAAA H',
            distance: 40,
            condition: army_t.length == 0
        },
        e25n14_harvester_1 : {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            distance: 40,
            condition: army_t.length == 0
        },
        e25n14_carryer_1 : {
            max: 1,
            body: 'CCCCC CCCCC CCCCC MMMMM MMMMM MMMM',
            distance: 40,
            condition: army_t.length == 0
        },
        e25n13_upgrader_recharger: {
            max: 0,
            body: 'CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM',
            //body: 'CCCC MM',
            distance: 20,
            condition: true
        },
        e25n13_upgrader: {
            max: 0,
            body: 'WWWWW WWWWW WWWWW CCCCC MMMMM',
            //body: 'W CC M',
            distance: 20,
            condition: true
        },
        e25n13_builder: {
            max: 1,
            body: 'WWWWW WWWWW CCCCC CCCCC MMMMM MMMMM',
            distance: 20,
            condition: army.length == 0
        },
        e25n13_repairer: {
            max: 1,
            body: 'WWWWW CCCCC MMMMM',
            distance: 0,
            condition: road.hits < (road.hitsMax * 0.8)
        },
        // e25n12
        e25n12_harvester: {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            distance: 50,
            condition: army_b.length == 0
        },
        e25n12_carryer: {
            max: 1,
            body: 'CCCCCC CCCCC CCCCC CCCCC MMMMM MMMMM',
            distance: 50,
            condition: army_b.length == 0
        },
        e25n12_builder: {
            max: 1,
            body: 'W CCC MM',
            distance: 0,
            condition: army_b.length == 0 && new Date().getHours() % 7 == 3
        },
        e25n14_builder: {
            max: 1,
            body: 'WWWWW CCCCC CCCCC MMMMM MMMMM',
            distance: 20,
            condition: true
        },
        e25n15_builder: {
            max: 1,
            body: 'WW CCCC MMM',
            distance: 70,
            condition: true
        },
        e25n15_harvester_1: {
            max: 0,
            body: 'WWWWW W CCCCC C MMMMMM',
            //body: 'WM',
            distance: 80,
            condition: true
        },
        e25n15_carryer_1: {
            max: 0,
            body: 'CCCCCC CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM',
            distance: 100,
            condition: true
        },
        e25n15_harvester_2: {
            max: 1,
            //body: 'WWWWW MMMMM',
            body: 'WCM',
            distance: 80,
            condition: true
        },
        e25n15_carryer_2: {
            max: 0,
            body: 'CCCCCC CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM',
            distance: 80,
            condition: true
        },
        e25n15_harvester_3: {
            max: 1,
            //body: 'WWWWW MMMMM',
            body: 'WCM',
            distance: 80,
            condition: true
        },
        e25n15_carryer_3: {
            max: 0,
            body: 'CCCCCC CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM',
            distance: 80,
            condition: true
        },
        e25n15_harvester_4: {
            max: 1,
            //body: 'WWWWW MMMMM',
            body: 'WCM',
            distance: 80,
            condition: true
        },
        e25n15_carryer_4: {
            max: 0,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM',
            distance: 80,
            condition: true
        },
        e25n13_e24n13 : {
            max: 0,
            body: 'CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM MMMMM',
            distance: 80,
            condition: true
        },
        e25n13_e24n12 : {
            max: 2,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM MMMMM MMMMM',
            distance: 80,
            condition: Game.rooms.E25N13.storage.store.energy > 500000
        },
    },D);
}