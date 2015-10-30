// draenor

var creep_create = require('creep_create');

module.exports = function () {

    army = Game.rooms.E25N13.find(FIND_HOSTILE_CREEPS);

    creep_create(Game.spawns.Dream, {
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
                //ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE
            ],
            condition: army.length > 0
        },
        e25n13_harvester_1: {
            max: 0,
            body: [WORK, WORK, CARRY, MOVE],
            condition: true
        },
        e25n13_harvester_2: {
            max: 0,
            body: [WORK, WORK, CARRY, MOVE],
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
            body: [CARRY, CARRY, MOVE, MOVE], // OK
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
            body: [WORK, WORK, WORK, CARRY, MOVE, MOVE],
            condition: true
        },
        e25n13_upgrader_recharger: {
            max: 1,
            body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], // OK
            condition: true
        },
        e25n13_builder: {
            max: 2,
            body: [WORK, CARRY, CARRY, MOVE, MOVE],
            condition: true
        },
        e25n13_reparier: {
            max: 1,
            body: [WORK, CARRY, CARRY, MOVE, MOVE],
            condition: true
        }
    });
}