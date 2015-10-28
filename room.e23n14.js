// azeroth

var creep_create = require('creep_create');
module.exports = function () {
    creep_create(Game.spawns.Azeroth, {
        // extrecharger 可以保证 0 creep 启动
        // extrecharger make 0 creep start up
        extrecharger: {
            max: 3,
            body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], // OK
            condition: true
        },
        // e23n14 source 0 harvester
        harvester1: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], // OK
            condition: true
        },
        // pickup energy to source center or storage
        pickuper: {
            max: 1,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], // OK
            condition: true
        },
        // e23n14 source 1 harvester
        harvester2: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], // OK
            condition: true
        },
        // pickup energy to source center or storage
        pickuper2: {
            max: 1,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // OK
            condition: true
        },
        homerecharger: {
            max: 1,
            body: [CARRY, CARRY, MOVE], // OK
            condition: true
        },
        // controller upgrader
        upgrader: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        upgrade_recharger: {
            max: 1,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], // OK
            condition: true
        },
        // build && repair wall
        builder: {
            max: 3,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], // OK
            condition: true
        },
        // repair road
        repairer: {
            max: 1,
            body: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE], // OK
            condition: true
        },
        // repair rampart
        rampartbuilder: {
            max: 1,
            body: [WORK, CARRY, CARRY, MOVE, MOVE], // OK
            condition: true
        },

        /*
         spawn_harvester2:{
         max:1,
         body:[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
         condition:true
         },
         spawn_builder2:{
         max:3,
         body:[WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
         condition:true
         },
         */
        draenor_harvester_1: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        draenor_harvester_2: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        draenor_builder: {
            max: 2,
            body: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        outside_harvester_1: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        outside_carryer_1: {
            max: 3,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        outside_builder: {
            max: 2,
            body: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },


        outside_harvester_2: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        outside_carryer_2: {
            max: 3,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        outside_builder_2: {
            max: 2,
            body: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },

        outside_harvester_3: {
            max: 1,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },
        outside_carryer_3: {
            max: 3,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
            condition: true
        },


        guard: {
            max: 0,
            body: [ATTACK, TOUGH, MOVE, MOVE],
            condition: true
        },
        attacker: {
            max: 0,
            body: [WORK, CARRY, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
            condition: true
        }
    });
}