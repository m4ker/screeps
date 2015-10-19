// harvest modules
var harvester1         = require('role.harvester1');
var harvester2         = require('role.harvester2');
var outside_harvester  = require('role.outside_harvester');
var outside_harvester2 = require('role.outside_harvester2');

var outside_harvester_1  = require('role.outside_harvester_1');
var outside_carryer_1     = require('role.outside_carryer_1');
var outside_builder      = require('role.outside_builder');

var outside_harvester_2  = require('role.outside_harvester_2');
var outside_carryer_2     = require('role.outside_carryer_2');

// build modules
var carryer        = require('role.carryer');
var carryer_sc     = require('role.carryer_sc');
var homerecharger  = require('role.homerecharger');
//var recharger      = require('role.recharger');
var repairer       = require('role.repairer');
var upgrader       = require('role.upgrader');
var builder        = require('role.builder');
//var wallbuilder    = require('role.wallbuilder');
var rampartbuilder = require('role.rampartbuilder');
var min_rampart    = require('min_rampart');
var min_wall       = require('min_wall');

// war modules
var guard    = require('role.guard');
var attacker = require('role.attacker');

// other
var monitor      = require('monitor');
var creep_create = require('creep_create');

var source_centers = [
    {
        pos:{x:24,y:16},
        min:1000
    },
    {
        pos:{x:34,y:24},
        min:10000
    }
];

module.exports.loop = function () {

    var mrampart = min_rampart();
    var mwall    = min_wall();

    var structures = Game.rooms.E23N14.find(FIND_MY_STRUCTURES, {
        filter: function(object) {
            if(object.structureType == STRUCTURE_STORAGE ) {
                return true;
            }
            return false;
        }
    });

    var st = structures[0];

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        //creep.moveTo(20, 20);
        //continue;
        if(creep.memory.role == 'harvester1') {
            harvester1(creep);
        } else if(creep.memory.role == 'harvester2') {
            harvester2(creep);
        } else if (creep.memory.role == 'upgrader') {
            upgrader(creep, source_centers[0]);
        } else if(creep.memory.role == 'carryer') {
            carryer(creep, source_centers);
        } else if(creep.memory.role == 'carryer_sc') {
            carryer_sc(creep, source_centers);
        } else if (creep.memory.role == 'guard') {
            guard(creep);
        } else if (creep.memory.role == 'repairer') {
            repairer(creep, st);
        } else if (creep.memory.role == 'builder') {
            builder(creep, st, mwall);
        } else if (creep.memory.role == 'outside_harvester2') {
            outside_harvester2(creep);
        } else if (creep.memory.role == 'attacker') {
            attacker(creep, Game.flags.Flag1);
        } else if (creep.memory.role == 'rampartbuilder') {
            rampartbuilder(creep, st, mrampart);
        } else if (creep.memory.role == 'homerecharger') {
            homerecharger(creep, st);
        } else if (creep.memory.role == 'outside_harvester_1') {
            outside_harvester_1(creep);
        } else if (creep.memory.role == 'outside_carryer_1') {
            outside_carryer_1(creep, st);
        } else if (creep.memory.role == 'outside_builder') {
            outside_builder(creep);
        } else if (creep.memory.role == 'outside_harvester_2') {
            outside_harvester_2(creep);
        } else if (creep.memory.role == 'outside_carryer_2') {
            outside_carryer_2(creep, st);
        }
    }

    monitor(Game.spawns.Azeroth);

    creep_create(Game.spawns.Azeroth, {
        upgrader:{
            max:1,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE]
        },
        harvester1:{
            max:2,
            body:[WORK, WORK, WORK, CARRY, MOVE]
        },
        harvester2:{
            max:2,
            body:[WORK, WORK, WORK, CARRY, MOVE]
        },
        homerecharger:{
            max:0,
            body:[CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]
        },
        carryer:{
            max:2,
            body:[CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        carryer_sc:{
            max:2,
            body:[CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        recharger:{
            max:0,
            body:[CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        builder:{
            max:3,
            body:[WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]
        },
        repairer:{
            max:1,
            body:[WORK, WORK, CARRY, CARRY, MOVE, MOVE]
        },
        rampartbuilder:{
            max:1,
            body:[WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        /*
         outside_harvester2:{
         max:0,
         body:[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
         },
         outside_harvester:{
         max:0,
         body:[WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
         },
         */

        outside_harvester_1:{
            max:1,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE]
        },
        outside_carryer_1:{
            max:4,
            body:[CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        outside_builder:{
            max:1,
            body:[WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        outside_harvester_2:{
            max:1,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE]
        },
        outside_carryer_2:{
            max:5,
            body:[CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        /*
         outside_harvester3:{
         max:0,
         body:[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
         },
         */
        wallbuilder:{
            max:0,
            body:[WORK, WORK, CARRY, CARRY, MOVE, MOVE]
        },
        guard:{
            max:1,
            body:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, ATTACK, ATTACK, MOVE, MOVE]
        },
        attacker:{
            max:0,
            body:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, ATTACK,ATTACK,ATTACK,ATTACK,ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        }
    });

    // clear memory
    for( i in Memory.creeps) {
        if (Memory.creeps[i]._move != undefined) {
            if (Game.time - Memory.creeps[i]._move.time > 3000){
                delete Memory.creeps[i];
            }
        } else {
            //delete Memory.creeps[i];
        }
    }
}