// draenor

var creep_create = require('creep_create2');

module.exports = function () {

    army = Game.rooms.E25N13.find(FIND_HOSTILE_CREEPS);

    creep_create(Game.rooms.E25N13, {
        e25n13_extrecharger: {
            max: 1,
            body: [CARRY, CARRY, MOVE], // OK
            condition: true
        },
        guard: {
            max: army.length,
            body: [
                //ATTACK,ATTACK,MOVE,
                //ATTACK,ATTACK,MOVE,
                //ATTACK,ATTACK,MOVE,
                //ATTACK,ATTACK,MOVE,
                //ATTACK,ATTACK,MOVE,
                //ATTACK,ATTACK,MOVE,
                //ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE
            ],
            condition: army.length > 0
        },
        e25n13_harvester_1: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
            condition: true
        },
        e25n13_harvester_2: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
            condition: true
        },
        // pickup energy to source center or storage
        e25n13_pickuper1: {
            max: 2,
            body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], // OK
            condition: true
        },
        e25n13_recharger: {
            max: 1,
            body: [CARRY, CARRY, MOVE], // OK
            condition: true
        },
        // pickup energy to source center or storage
        e25n13_pickuper2: {
            max: 2,
            body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], // OK
            condition: true
        },

        // controller upgrader
        e25n13_upgrader: {
            max: 1,
            body: [
                WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE
            ],
            condition: true
        },
        e25n13_upgrader_recharger: {
            max: 2,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], // OK
            condition: true
        },
        e25n13_builder: {
            max: 2,
            body: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            condition: true
        },
        e25n13_reparier: {
            max: 1,
            body: [WORK, CARRY, CARRY, MOVE, MOVE],
            condition: true
        },
        e25n13_rampartbuilder: {
            max: 1,
            body: [WORK, CARRY, CARRY, MOVE, MOVE],
            condition: true
        },

        // e25n12
        e25n12_harvester: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        e25n12_carryer: {
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
        e25n12_builder: {
            max: 1,
            body: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
            condition: true
        },

        // e25n14
        e25n14_builder: {
            max: 1,
            body: [WORK, CARRY, CARRY, CARRY,MOVE, MOVE],
            condition: true
        }
    });
}