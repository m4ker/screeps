// draenor

var creep_create = require('creep_create');

module.exports = function () {

    army = Game.rooms.E24N13.find(FIND_HOSTILE_CREEPS);

    creep_create(Game.spawns.Draenor, {
        draenor_extrecharger: {
            max: 3,
            body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], // OK
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
        draenor_harvester_1: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
            condition: true
        },
        draenor_harvester_2: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
            condition: true
        },
        draenor_builder: {
            max: 5,
            body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        // pickup energy to source center or storage
        draenor_pickuper1: {
            max: 2,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // OK
            condition: true
        },
        draenor_recharger: {
            max: 1,
            body: [CARRY, CARRY, CARRY, MOVE, MOVE], // OK
            condition: true
        },
        // pickup energy to source center or storage
        draenor_pickuper2: {
            max: 2,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // OK
            condition: true
        },
        // controller upgrader
        draenor_upgrader: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        draenor_upgrader_recharger: {
            max: 1,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // OK
            condition: true
        },
        spawn_harvester : {
            max : 1,
            body : [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        spawn_harvester2 : {
            max : 1,
            body : [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        e24n12_harvester_1 : {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        e24n12_carryer_1 : {
            max: 3,
            body: [
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE
            ],
            condition: true
        },
        e24n12_harvester_2 : {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        e24n12_carryer_2 : {
            max: 4,
            body: [
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE
            ],
            condition: true
        },
        e24n12_builder : {
            max: 1,
            body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        draenor_reparier: {
            max: 1,
            body: [WORK, CARRY, MOVE],
            condition: true
        },
        e24n13_rampartbuilder: {
            max: 1,
            body: [WORK, CARRY, CARRY, MOVE],
            condition: true
        }
    });
}