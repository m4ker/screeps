// python
var creep_create = require('creep_create2');
module.exports = function () {
    army = Game.rooms.E22N15.find(FIND_HOSTILE_CREEPS);
    creep_create(Game.rooms.E22N15, {
        e22n15_ext_1: {
            max: 1,
            body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
            condition: true
        },
        guard: {
            max: army.length,
            body: [
                ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE,
                ATTACK,ATTACK,MOVE
            ],
            condition: army.length > 0
        },
        e22n15_harvester_1: {
            max: 1,
            body: [
                WORK, WORK, WORK, WORK, WORK,
                WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE
            ],
            condition: true
        },
        e22n15_harvester_2: {
            max: 1,
            body: [
                WORK, WORK, WORK, WORK, WORK,
                WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE
            ],
            condition: true
        },
        e22n15_upgrader: {
            max: 1,
            body: [
                WORK, WORK, WORK, WORK, WORK,
                WORK, WORK, WORK, WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE
            ],
            condition: true
        },
        e22n15_upgrader_recharger: {
            max: 1,
            body: [
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE
            ],
            condition: true
        },
        e22n15_repairer: {
            max: 1,
            body: [
                WORK,
                CARRY, CARRY, CARRY,
                MOVE, MOVE
            ],
            condition: true
        },
        e22n15_builder: {
            max: 2,
            body: [
                WORK, WORK, WORK, WORK, WORK,
                WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE
            ],
            condition: true
        },
        e22n14_harvester_1: {
            max: 1,
            body: [
                WORK, WORK, WORK, WORK, WORK,
                MOVE, MOVE, MOVE,
            ],
            condition: true
        },
        e22n14_carryer_1: {
            max: 1,
            body: [
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE
            ],
            condition: true
        },
        e21n15_harvester_1: {
            max: 1,
            body: [
                WORK, WORK, WORK, WORK, WORK,
                MOVE, MOVE, MOVE,
            ],
            condition: true
        },
        e21n15_carryer_1: {
            max: 1,
            body: [
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE
            ],
            condition: true
        },
    });
}