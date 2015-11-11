// draenor

var creep_create = require('creep_create2');

module.exports = function () {

    army = Game.rooms.E24N13.find(FIND_HOSTILE_CREEPS);

    creep_create(Game.rooms.E24N13, {
        e24n13_ext_1: {
            max: 1,
            body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], // OK
            condition: true
        },
        e24n13_ext_2: {
            max: 1,
            body: [
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE
            ], // OK
            condition: true
        },
        guard: {
            max: army.length,
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
            condition: army.length > 0
        },
        e24n13_harvester_1 : {
            max: 1,
            body: [
                WORK, WORK, WORK, WORK, WORK,
                WORK, WORK, WORK, WORK, WORK,
                WORK, WORK, WORK, WORK, WORK,
                WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE,
            ],
            condition: true
        },
        e24n13_harvester_2 : {
            max: 1,
            body: [
                WORK, WORK, WORK, WORK, WORK,
                WORK, WORK, WORK, WORK, WORK,
                WORK, WORK, WORK, WORK, WORK,
                WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE,
            ],
            condition: true
        },
        // controller upgrader
        e24n13_upgrader: {
            max: 1,
            body: [
                WORK, WORK, WORK, WORK, WORK,
                WORK, WORK, WORK, WORK, WORK,
                WORK, WORK, WORK, WORK, WORK,
                CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE, MOVE, MOVE
            ],
            condition: true
        },
        e24n13_upgrader_recharger: {
            max: 1,
            body: [
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE
            ], // OK
            condition: true
        },
        e24n12_harvester_1 : {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
            condition: true
        },
        e24n12_carryer_1 : {
            max: 2,
            body: [
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE
            ],
            condition: true
        },
        e24n12_harvester_2 : {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
            condition: true
        },
        e24n12_carryer_2 : {
            max: 2,
            body: [
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE
            ],
            condition: true
        },
        e24n12_builder : {
            max: 1,
            body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        e24n13_reparier: {
            max: 1,
            body: [WORK, CARRY, MOVE],
            condition: true
        },
        e24n13_builder: {
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