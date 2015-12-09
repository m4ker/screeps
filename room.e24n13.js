var creep_create = require('creep_create2');
var find_min_road =  require('helper.find_min_road');
module.exports = function (D) {
    army = D.a.E24N13;
    //console.log(army);
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
    road = find_min_road(Game.rooms.E24N13);
    creep_create(Game.rooms.E24N13, {
        e24n13_ext_1: {
            max: 1,
            body: 'CCCC MM',
            distance: 13,
            condition: true
        },
        e24n13_ext_2: {
            max: army.length > 0 ? 2 : 1,
            body: 'CCCCC CCCCC MMMMM',
            distance: 13,
            condition: true
        },
        e24n13_harvester_1 : {
            max: 1,
            body: 'WWWWW WWWWW WWWWW W CCCCC CCCCC CCCCC CC MMMMM MMMMM MMMMM MM',
            distance: 25,
            condition: true
        },
        e24n13_harvester_2 : {
            max: 1,
            body:'WWWWW WWWWW WWWWW W CCCCC CCCCC CCCCC CC MMMMM MMMMM MMMMM MM',
            distance: 25, // todo : 不知道哪个错了
            condition: true
        },
        guard: {
            max: army.length > 2 ? 2 : army.length,
            body: 'MMMMM MMMMM MMMMM AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA',
            distance: 30,
            condition: army.length > 0
        },
        e24n13_war_builder: {
            max: army.length > 5 ? 5 : army.length,
            body: 'WWWWW WWWWW CCCCC CCCCC MMMMM MMMMM',
            distance: 30,
            condition: army.length > 0
        },
        e24n12_harvester_1 : {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            distance: 50,
            condition: army_b.length == 0
        },
        e24n12_carryer_1 : {
            max: 0,
            body: 'CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM',
            distance: 50,
            condition: army_b.length == 0
        },
        e24n12_harvester_2 : {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            distance: 50, // 这个也不知道哪个是错的
            condition: army_b.length == 0
        },
        e24n12_carryer_2 : {
            max: 0,
            body: 'CCCCC CCCCC CCCCC MMMMM MMMMM MMM',
            //body: 'CCCCC CCCCC CCCCC MMMMM MMM',
            distance: 50,
            condition: army_b.length == 0
        },

        e24n14_dragon_killer_1 : {
            max: 1,
            body:'TTTTT TTTTT TTTT MMMMM MMMMM MMMMM MMMMM AAAAA AAAAA AAAAA H',
            distance: 30,
            condition: true
        },
        e24n14_harvester_1 : {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            distance: 30,
            condition: army_t.length == 0
        },
        e24n14_carryer_1 : {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCC MMMMM MMMM',
            distance: 30,
            condition: army_t.length == 0
        },

        e24n14_dragon_killer_2 : {
            max: 1,
            body:'TTTTT TTTTT TTTT MMMMM MMMMM MMMMM MMMMM AAAAA AAAAA AAAAA H',
            distance: 30,
            condition: army_t.length == 0
        },
        e24n14_harvester_2 : {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            distance: 30,
            condition: army_t.length == 0
        },
        e24n14_carryer_2 : {
            max: 1,
            body: 'CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM',
            distance: 30,
            condition: army_t.length == 0
        },
        e24n13_upgrader: {
            max: 0,
            body: 'WWWWW WWWWW WWWWW CCCC MMMMM MMMMM',
            distance: 25,
            condition: true
        },
        e24n13_upgrader_recharger: {
            max: 0,
            body: 'CCCCC CCCCC CC MMMMM M',
            distance: 15,
            condition: true
        },
        e24n12_builder : {
            max: 1,
            body: 'WWWWW CCCCC MMMMM',
            distance: 0,
            condition: army_b.length == 0 && new Date().getHours() % 7 == 2
        },
        e24n13_reparier: {
            max: 1,
            body: 'WWWWW CCCCC MMMMM',
            distance: 0,
            condition: true && road.hits < (road.hitsMax * 0.8)
        },
        e24n13_builder: {
            max: 1,
            body: 'WWWWW WWWWW WWWWW CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM',
            distance: 30,
            condition: army.length == 0
        },
        e24n11_builder : {
            max: 0,
            body: 'WWWWW CCCCC CCCCC MMMMM MMMMM MMMMM',
            distance: 80,
            condition: true
        },
        e24n11_harvester : {
            max: 0,
            body: 'WWWWW MMMMM ',
            distance: 80,
            condition: true
        },
        e24n13_e24n12: {
            max: 5,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM MMMMM MMMMM',
            distance: 80,
            condition: Game.rooms.E24N13.storage.store.energy > 500000
        },
        /*
         e24n13_e23n14: {
         max: 0,
         body: 'CCCCC CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM MMMMM',
         distance: 60,
         condition: true
         },
         e24n13_e23n13: {
         max: 0,
         body: 'CCCCC CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM MMMMM',
         distance: 40,
         condition: true
         },
         */
    },D);
}