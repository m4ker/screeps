var harvester1 = require('role.harvester1');
var harvester2 = require('role.harvester2');
var carryer    = require('role.carryer');
var recharger  = require('role.recharger');
var repairer   = require('role.repairer');
var upgrader   = require('role.upgrader');
var builder    = require('role.builder');
var guard      = require('role.guard');
var attacker   = require('role.attacker');
var wallbuilder   = require('role.wallbuilder');
var rampartbuilder   = require('role.rampartbuilder');
var homerecharger   = require('role.homerecharger');

var outside_harvester = require('role.outside_harvester');
var outside_harvester2 = require('role.outside_harvester2');
var outside_harvester3 = require('role.outside_harvester3');
 
var monitor   = require('monitor');
var min_rampart   = require('min_rampart');
var min_wall   = require('min_wall');
var creep_create = require('creep_create');


var source_centers = [
        {
            pos:{x:24,y:16},
            min:1000
        },
        {
            pos:{x:31,y:19},
            min:10000
        }
    ];

module.exports.loop = function () {
    
    var mrampart = min_rampart();
    var mwall    = min_wall();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        //creep.moveTo(20, 20);
        //continue;
        if(creep.memory.role == 'harvester1') { // 矿工
            harvester1(creep);
        } else if(creep.memory.role == 'harvester2') { // 矿工
            harvester2(creep);
        } else if (creep.memory.role == 'upgrader') { // 升级RCL
            upgrader(creep, source_centers[0]);
        } else if(creep.memory.role == 'carryer') { // 搬运工
            carryer(creep, source_centers);
        } else if (creep.memory.role == 'guard') { // 守卫
            guard(creep);
        } else if (creep.memory.role == 'repairer') { // 维修
            repairer(creep, source_centers[1]);
        } else if (creep.memory.role == 'builder') { // 建造
            builder(creep, source_centers[1]);
        } else if (creep.memory.role == 'recharger') {
            recharger(creep, source_centers[1]);
        } else if (creep.memory.role == 'outside_harvester') {
            outside_harvester(creep);
        } else if (creep.memory.role == 'outside_harvester2') {
            outside_harvester2(creep);
        } else if (creep.memory.role == 'outside_harvester3') {
            //outside_harvester3(creep, source_centers[1]);
        } else if (creep.memory.role == 'attacker') {
            //attacker(creep, Game.flags.Flag1);
        } else if (creep.memory.role == 'wallbuilder') {
            wallbuilder(creep, source_centers[1], mwall);
        } else if (creep.memory.role == 'rampartbuilder') {
            rampartbuilder(creep, source_centers[1], mrampart);
        } else if (creep.memory.role == 'homerecharger') {
            homerecharger(creep, source_centers[1]);
        }
    }
    
    
    // 监视器
     monitor(Game.spawns.Azeroth);
    
    // creep 生产
    creep_create(Game.spawns.Azeroth, {
        upgrader:{
            max:1,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE]
        },
        harvester1:{
            max:4,
            body:[WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]
        },
        homerecharger:{
            max:3,
            body:[CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        harvester2:{
            max:4,
            body:[WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]
        },
        carryer:{
            max:6,
            body:[CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        recharger:{
            max:0,
            body:[CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        builder:{
            max:1,
            body:[WORK, WORK, CARRY, CARRY, MOVE, MOVE]
        },
        repairer:{
            max:1,
            body:[WORK, WORK, CARRY, CARRY, MOVE, MOVE]
        },
        rampartbuilder:{
            max:1,
            body:[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        outside_harvester2:{
            max:10,
            body:[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        outside_harvester:{
            max:4,
            body:[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        outside_harvester3:{
            max:0,
            body:[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        wallbuilder:{
            max:1,
            body:[WORK, WORK, CARRY, CARRY, MOVE, MOVE]
        },
        guard:{
            max:1,
            body:[TOUGH, ATTACK, ATTACK, MOVE, MOVE]
        },
        attacker:{
            max:0,
            body:[TOUGH, ATTACK, MOVE, MOVE]
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
