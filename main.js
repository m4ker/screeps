var harvester = require('role.harvester');
var repairer  = require('role.repairer');
var upgrader  = require('role.upgrader');
var builder   = require('role.builder');
var guard     = require('role.guard');

var monitor   = require('monitor');
var creep_create = require('creep_create');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') { // 矿工
            harvester(creep);
        } else if (creep.memory.role == 'guard') { // 守卫
            guard(creep);
        } else if (creep.memory.role == 'repairer') { // 维修
            repairer(creep);
        } else if (creep.memory.role == 'builder') { // 建造
            builder(creep);
        } else if (creep.memory.role == 'upgrader') { // 升级RCL
            upgrader(creep);
        }
    }
    
    // 监视器
    monitor();
    
    // creep 生产
    creep_create(Game.spawns.Azeroth, {
        harvester:{
            max:20,
            body:[WORK, CARRY, CARRY, MOVE, MOVE]
        },
        builder:{
            max:4,
            body:[WORK, CARRY, CARRY, MOVE, MOVE]
        },
        repairer:{
            max:2,
            body:[WORK, CARRY, CARRY, MOVE, MOVE]
        },
        upgrader:{
            max:2,
            body:[WORK, CARRY, CARRY, MOVE, MOVE]
        },
        guard:{
            max:1,
            body:[TOUGH, ATTACK, MOVE, MOVE]
        }
    });
}
