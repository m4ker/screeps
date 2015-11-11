// azeroth

var creep_create = require('creep_create2');
module.exports = function () {

    army = Game.rooms.E23N14.find(FIND_HOSTILE_CREEPS);
    //e23n15_army = Game.rooms.E23N15.find(FIND_HOSTILE_CREEPS);
    //e23n13_army = Game.rooms.E23N13.find(FIND_HOSTILE_CREEPS);

    army_length = army.length;// + e23n15_army.length + e23n13_army.length;

    creep_create(Game.rooms.E23N14, {
        // extrecharger 可以保证 0 creep 启动
        // extrecharger make 0 creep start up
        e23n14_ext_1: {
            max: 1,
            body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], // OK
            condition: true
        },
        e23n14_ext_2: {
            max: 1,
            body: [
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE
            ], // OK
            condition: true
        },
        guard: {
            max: army_length,
            body: [
                ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE
            ],
            condition: army_length > 0
        },
        e23n14_harvester_1: {
            max: 1,
            body: [
                WORK,WORK,WORK,WORK,WORK,
                WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,
                MOVE,MOVE,MOVE,MOVE,MOVE,
            ],
            condition: true
        },
        e23n14_harvester_2: {
            max: 1,
            body: [
                WORK,WORK,WORK,WORK,WORK,
                WORK,WORK,WORK,WORK,WORK,
                WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,
                MOVE,MOVE,MOVE,MOVE,MOVE,
                MOVE,MOVE,
            ],
            condition: true
        },
        attacker: {
            max: 0,
            body: [
                ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,
                ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,
                ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,
                ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,
                ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,
            ],
            condition: true
        },
        // controller upgrader
        e23n14_upgrader: {
            max: 1,
            body: [
                WORK, WORK, WORK, WORK, WORK,
                WORK, WORK, WORK, WORK, WORK,
                WORK, WORK, WORK, WORK, WORK,
                CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE, MOVE,
            ],
            condition: true
        },
        e23n14_upgrade_recharger: {
            max: 1,
            body: [
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
            ], // OK
            condition: true
        },

        e23n13_harvester_1: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
            condition: army_length == 0
        },
        e23n13_carryer_1: {
            max: 1,
            body: [
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE
            ],
            condition: army_length == 0
        },
        e23n13_repairer: {
            max: 1,
            body: [
                WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE
            ],
            condition: army_length == 0
        },
        e23n15_harvester_1: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
            condition: army_length == 0
        },
        e23n15_carryer_1: {
            max: 1,
            body: [
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE, MOVE, MOVE
            ],
            condition: army_length == 0
        },
        e23n15_repairer: {
            max: 1,
            body: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            condition: army_length == 0
        },
        e23n15_harvester_2: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
            condition: army_length == 0
        },
        e23n15_carryer_2: {
            max: 1,
            body: [
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE, MOVE, MOVE
            ],
            condition: army_length == 0
        },
        e23n14_repairer: {
            max: 1,
            body: [
                WORK, WORK,
                CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE
            ],
            condition: true
        },
        // repair road && build && repair wall
        e23n14_builder: {
            max: 1,
            body: [
                WORK, WORK, WORK, WORK, WORK,
                WORK, WORK, WORK, WORK, WORK,
                WORK, WORK, WORK, WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE, MOVE, MOVE,
            ],
            condition: true
        }
    });
}
