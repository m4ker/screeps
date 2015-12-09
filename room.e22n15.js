// python && ruby
var creep_create = require('creep_create2');
var find_min_road =  require('helper.find_min_road');
module.exports = function (D) {
    army = D.a.E22N15;
    //console.log(army.length);
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
    //console.log(army_b.length);
    road = find_min_road(Game.rooms.E22N15);
    creep_create(Game.rooms.E22N15, {
        e22n15_ext_1: {
            max: 1,
            body: 'CCCC MM',
            distance: 5,
            condition: true
        },
        e22n15_ext_2: {
            max: army.length > 0 ? 3 : 1,
            body: 'CCCCC CCCCC MMMMM',
            distance: 5,
            condition: true
        },
        e22n15_guard: {
            max: army.length,
            body: 'MMMMM MMMMM MMMMM AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA',
            distance: 25,
            condition: army.length > 0
        },
        e22n15_war_builder: {
            max: army.length,
            body : 'WWWWW WWWWW CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM',
            distance: 30,
            condition: army.length > 0
        },
        e22n15_harvester_1: {
            max: 1,
            body: 'WWWWW WWWWW W CCCCC CCCCC C MMMMM MMMMM M',
            distance: 11,
            condition: true
        },
        e22n15_harvester_2: {
            max: 1,
            body: 'WWWWW WWWW CCCCC CCCC MMMMM MMMM',
            distance: 7,
            condition: true
        },
        e22n15_upgrader: {
            max: army.length > 0 ? 0 : 0,
            body: 'WWWWW WWWWW WWWWW CCCCC MMMMM',
            distance: 5,
            condition: true
        },
        e22n15_upgrader_recharger: {
            max: army.length > 0 ? 0 : 0,
            body : 'CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM',
            distance: 5,
            condition: true
        },
        e22n15_repairer: {
            max: 1,
            body: 'WWWWW CCCCC MMMMM',
            distance: 0,
            condition: true && road.hits < (road.hitsMax * 0.8)
        },
        e22n15_builder: {
            max: 3,
            body: 'WWWWW WWWWW WWWWW W CCCCC CCCCC CCCCC CC MMMMM MMMMM MMMMM MM',
            distance: 0,
            condition: true
        },
        e22n14_harvester_1: {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMM M',
            distance: 35,
            condition: army_b.length === 0 && (D.a.E22N14 == undefined || D.a.E22N14.length == 0)
        },
        e22n14_carryer_1: {
            max: 1,
            body: 'CCCCC CCCCC CCCCC MMMMM MMM',
            distance: 0,
            condition: army_b.length === 0 && (D.a.E22N14 == undefined || D.a.E22N14.length == 0)
        },
        e22n14_repairer: {
            max: 1,
            body: 'WW CC MM',
            distance: 0,
            condition: army_b.length === 0 && (D.a.E22N14 == undefined || D.a.E22N14.length == 0) && new Date().getHours() % 7 == 4
        },
        e21n15_harvester_1: {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            distance: 60,
            condition: army_l.length === 0 && (D.a.E21N15 != undefined && D.a.E21N15.length == 0)
        },
        e21n15_carryer_1: {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMM',
            distance: 60,
            condition: army_l.length === 0 && (D.a.E21N15 != undefined && D.a.E21N15.length == 0)
        },
        e21n15_harvester_2: {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            distance: 80,
            condition: army_l.length === 0 && (D.a.E21N15 != undefined && D.a.E21N15.length == 0)
        },
        e21n15_carryer_2: {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM',
            distance: 80,
            condition: army_l.length === 0 && (D.a.E21N15 != undefined && D.a.E21N15.length == 0)
        },
        e21n15_repairer: {
            max: 1,
            body: 'WW CCCC MMMMM M',
            distance: 0,
            condition: true
            //condition: army_l.length === 0 && new Date().getHours() % 7 == 5
        },
        e21n14_harvester: {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMMM',
            distance: 60,
            condition: army_l.length === 0 && (D.a.E21N15 != undefined && D.a.E21N15.length == 0)
        },
        e21n14_carryer: {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM',
            distance: 60,
            condition: army_l.length === 0 && (D.a.E21N15 != undefined && D.a.E21N15.length == 0)
        },
        e22n16_harvester_1: {
            max: 1,
            body: 'WWWWW W CCCCC C MMMMM M',
            distance: 60,
            condition: true
        },
        e22n16_carryer_1: {
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMM',
            distance: 60,
            condition: true
        },
        e22n16_repairer: {
            max: 1,
            body: 'WW CC MM',
            distance: 0,
            condition: army_b.length === 0 && new Date().getHours() % 7 == 6
        },
        e22n15_e23n14: {
            max: 0,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMMMM MMMMM ',
            distance: 80,
            condition: Game.rooms.E22N15.storage.store.energy > 500000
        },
        e22n16_reservation_worker:{
            max: 1,
            body: 'WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW C MMMMM MMMM',
            distance: 0,
            condition:
            (Game.rooms.E22N16 == undefined )
            || (Game.rooms.E22N16.controller.reservation == undefined)
            || (Game.rooms.E22N16.controller.reservation.ticksToEnd < 1000)
        },
        e22n16_reservation_carryer:{
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMM',
            distance: 0,
            condition:
            (Game.rooms.E22N16 == undefined )
            || (Game.rooms.E22N16.controller.reservation == undefined)
            || (Game.rooms.E22N16.controller.reservation.ticksToEnd < 1000)
        },
        e22n14_reservation_worker:{
            max: 1,
            body: 'WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW C MMMMM MMMM',
            distance: 0,
            condition:
            D.a.E22N14 != undefined
            && D.a.E22N14.length == 0
            && Game.rooms.E22N14 != undefined
            && (Game.rooms.E22N14.controller.reservation == undefined
            || Game.rooms.E22N14.controller.reservation.ticksToEnd < 1000)
        },
        e22n14_reservation_carryer:{
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMM',
            distance: 0,
            condition:
            D.a.E22N14 != undefined
            && D.a.E22N14.length == 0
            && Game.rooms.E22N14 != undefined
            && (Game.rooms.E22N14.controller.reservation == undefined
            || Game.rooms.E22N14.controller.reservation.ticksToEnd < 1000)
        },
        e21n15_reservation_worker:{
            max: 1,
            body: 'WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW C MMMMM MMMM',
            distance: 0,
            condition:
            D.a.E21N15 != undefined
            && D.a.E21N15.length == 0
            && Game.rooms.E21N15 != undefined
            && (Game.rooms.E21N15.controller.reservation == undefined
            || Game.rooms.E21N15.controller.reservation.ticksToEnd < 1000)
        },
        e21n15_reservation_carryer:{
            max: 1,
            body: 'CCCCC CCCCC CCCCC CCCCC CCCCC MMMMM MMM',
            distance: 0,
            condition:
            D.a.E21N15 != undefined
            && D.a.E21N15.length == 0
            && Game.rooms.E21N15 != undefined
            && (Game.rooms.E21N15.controller.reservation == undefined
            || Game.rooms.E21N15.controller.reservation.ticksToEnd < 1000)
        },
    },D);
}