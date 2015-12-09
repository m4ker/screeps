var creep_create = require('creep_create2');
var find_min_road =  require('helper.find_min_road');
module.exports = function (D) {
    army = D.a.E28N17;
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
    road = find_min_road(Game.rooms.E28N17);
    creep_create(Game.rooms.E28N17, {
        e28n17_ext_1: {
            max: 1,
            body: 'CCCC MM',
            distance: 5,
            condition: true
        },
        e28n17_ext_2: {
            max: army.length > 0 ? 1 : 0,
            body: 'CCCCC CCCCC MMMMM',
            distance: 5,
            condition: true
        },
        /*
         guard: {
         max: army.length > 2 ? 2 : army.length,
         body: 'MMMMM MMMMM MMMMM AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA',
         distance: 25,
         condition: army.length > 0
         },
         */
        e28n17_war_builder: {
            max: army.length > 5 ? 5 : army.length,
            body: 'WWWWW WWWWW CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM',
            distance: 25,
            condition: army.length > 0
        },
        e28n17_harvester_1: {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            //body: 'WW M',
            distance: 5,
            condition: true
        },
        e28n17_harvester_2: {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            distance: 25,
            condition: true
        },
        e28n17_carryer_1: {
            max: 1,
            body: 'CCCCC MMMMM',
            distance: 5,
            condition: true
        },
        e28n17_carryer_2: {
            max: 1,
            body: 'CCCCC CCCCC MMMMM',
            distance: 25,
            condition: true
        },
        e28n17_upgrader: {
            max: 2,
            body: 'WWWWW WWWWW WWWWW WWWWW WWW CCCCC MMMMM',
            distance: 30,
            condition: true
        },
        e28n17_upgrade_recharger:{
            max: 1,
            body: 'CCCCC CCCCC MMMMM',
            distance: 0,
            condition: true
        },
        e28n17_builder: {
            max: 1,
            body: 'WWWWW WWWWW CCCCC CCCCC CCCCC MMMMM MMMMM MMM',
            distance: 0,
            condition: true
        },
        e28n17_repairer: {
            max: 1,
            body: 'WW CC MM',
            distance: 0,
            condition: road.hits < (road.hitsMax * 0.8)
        },
        e27n17_harvester_1: {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            distance: 5,
            condition: true
        },
        e27n17_carryer_1: {
            max: 1,
            body: 'CCCCC CCCCC MMMMM',
            distance: 25,
            condition: true
        },
        e29n17_harvester_1: {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            distance: 5,
            condition: true
        },
        e29n17_carryer_1: {
            max: 1,
            body: 'CCCCC CCCCC MMMMM',
            distance: 25,
            condition: true
        },
        e29n17_harvester_2: {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            distance: 40,
            condition: true
        },
        e29n17_carryer_2: {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM MMMMM',
            distance: 40,
            condition: true
        },
        e29n18_harvester_1: {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            distance: 50,
            condition: true
        },
        e29n18_carryer_1: {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM MMMMM',
            distance: 50,
            condition: true
        },
    },D);
}