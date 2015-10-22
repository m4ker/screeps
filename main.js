/*
 * 主脚本
 * main scripts
 */

// 引入工种模块
// role modules

var harvester = require('role.harvester');
var transfer  = require('role.transfer');
var transfer2  = require('role.transfer2');
var worker    = require('role.worker');
var soldier   = require('role.soldier');

// 引入工具模块
// helper modules
var min_rampart = require('helper.find_min_rampart');
var min_wall    = require('helper.find_min_wall');


// 引入creep生产模块
// creep creater modules
var creep_create = require('creep_create');

module.exports.loop = function () {
    //console.log(Game.getUsedCpu());
    /*
     * 这里会定义一系列变量，提供给工种
     * vars for roles
     */
    var room     = Game.rooms.E23N14;
    var spawn    = Game.spawns.Azeroth;

    var mrampart = min_rampart(room); // hits 最小的 rampart
    var mwall    = min_wall(room); // hits 最小的 wall

    var structures = room.find(FIND_MY_STRUCTURES, {
        filter: function(object) {
            return object.structureType == STRUCTURE_STORAGE;
        }
    });
    var st = structures[0]; // storage 存储中心

    var structures = room.find(FIND_MY_STRUCTURES, {
        filter: function(object) {
            return object.structureType == STRUCTURE_LINK;
        }
    });
    var ln = structures[0]; // link

    var up = null; // upgrader 升级工种
    for ( i in Game.creeps ) {
        if (Game.creeps[i].memory.role == 'upgrader') {
            up = Game.creeps[i];
            break;
        }
    }

    var sources = room.find(FIND_SOURCES); // sources for harvester 资源

    // construction sites
    var cs = room.find(FIND_CONSTRUCTION_SITES);

    if (up && up.carry.energy < 20)
        ln.transferEnergy(up);

    // role controller
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        //creep.moveTo(20, 20);
        //continue;
        switch(creep.memory.role) {
            case 'harvester1':
                harvester(creep, 'E23N14', 0);
                break;
            case 'harvester2':
                harvester(creep, 'E23N14', 1);
                break;
            case 'upgrader':
                //worker(creep, room, [{action:'upgrade'}], new RoomPosition(26,16,room.name));
                worker(creep, room, [{action:'upgrade'}], null);
                break;
            case 'upgrade_recharger':
                //transfer(creep, st, new RoomPosition(26,16,room.name));
                transfer2(creep, st, ln);
                break;
            case 'pickuper':
                transfer2(creep, sources[0].pos, st);
                break;
            case 'pickuper2':
                transfer2(creep, sources[1].pos, st);
                break;
            case 'repairer':
                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                if (road) {
                    worker(creep, room, [{action:'repair', target:road}], st);
                }
                break;
            case 'builder':
                if (cs[0] != undefined) {
                    worker(creep, room, [{action:'build', target:cs[0]}], st);
                } else {
                    var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object){
                            return object.structureType == STRUCTURE_WALL
                                && (object.hits < (mwall.hits+creep.carryCapacity * 100));
                            //&& object.hits > 1;// 排除hello world
                        }
                    });
                    worker(creep, room, [{action:'repair', target:wall}], st);
                }
                break;
            case 'guard':
                soldier(creep);
                break;
            case 'attacker':
                soldier(creep, Game.flags.Flag1);
                break;
            case 'rampartbuilder':
                var rampart = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_RAMPART && (object.hits <= (mrampart.hits + 10000));
                    }
                });
                worker(creep, room, [{action:'repair', target:rampart}], st);
                break;
            case 'homerecharger':
                transfer2(creep, st, spawn);
                break;
            case 'extrecharger':
                transfer(creep, st, STRUCTURE_EXTENSION);
                break;
            case 'outside_harvester_1':
                harvester(creep, 'E23N13', 0);
                break;
            case 'outside_carryer_1':
                transfer2(creep, Game.rooms.E23N13, st);
                break;
            case 'test':
                transfer2(creep, Game.rooms.E23N13, st);
                break;
            case 'outside_builder_2':
                var road = Game.rooms.E23N15.find(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                //console.log(road);
                if (road[0] instanceof Structure) {
                    worker(creep, Game.rooms.E23N15, [{action:'repair', target:road[0]}], Game.rooms.E23N15);
                } else {
                    var ocs = Game.rooms.E23N15.find(FIND_CONSTRUCTION_SITES);
                    worker(creep, Game.rooms.E23N15, [{action:'build', target:ocs[0]}], Game.rooms.E23N15);
                }
                break;
            case 'outside_builder':
                //creep.say(1);
                //console.log(1);
                var road = Game.rooms.E23N13.find(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                if (road[0] instanceof Structure) {
                    worker(creep, Game.rooms.E23N13, [{action:'repair', target:road[0]}], Game.rooms.E23N13);
                } else {
                    var ocs = Game.rooms.E23N13.find(FIND_CONSTRUCTION_SITES);
                    worker(creep, Game.rooms.E23N13, [{action:'build', target:ocs[0]}], Game.rooms.E23N13);
                }
                break;
            case 'outside_harvester_2':
                harvester(creep, 'E23N15', 1);
                break;
            case 'outside_carryer_2':
                transfer2(creep, Game.rooms.E23N15, st);
                break;
            /*
             case 'e24n14_builder':
             //console.log(Game.rooms['E24N14']);

             var road = Game.rooms.E24N14.find(FIND_STRUCTURES, {
             filter: function(object){
             return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
             }
             });

             if (road instanceof Structure) {
             worker(creep, Game.rooms.E24N14, [{action:'repair', target:road[0]}], spawn);
             } else {
             var ocs = Game.rooms.E24N14.find(FIND_CONSTRUCTION_SITES);
             worker(creep, Game.rooms.E24N14, [{action:'build', target:ocs[0]}], spawn);
             }

             break;
             case 'e24n14_harvester_0':
             harvester(creep, 'E24N14', 0);
             break;
             case 'e24n14_carryer_0':
             transfer(creep, Game.rooms.E24N14, st);
             break;
             */
            default:
                console.log(creep.name + ' fucker');
                break;
        }
    }

    creep_create(spawn, {
        // extrecharger 可以保证 0 creep 启动
        // extrecharger make 0 creep start up
        extrecharger:{
            max:3,
            body:[CARRY, CARRY, CARRY, CARRY, MOVE, MOVE] // OK 
        },
        // e23n14 source 0 harvester
        harvester1:{
            max:1,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE] // OK
        },
        // pickup energy to source center or storage
        pickuper:{
            max:1,
            body:[CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE] // OK
        },
        // e23n14 source 1 harvester
        harvester2:{
            max:1,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE] // OK
        },
        // pickup energy to source center or storage
        pickuper2:{
            max:1,
            body:[CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE] // OK
        },
        homerecharger:{
            max:1,
            body:[CARRY, CARRY, MOVE] // OK
        },
        // controller upgrader
        upgrader:{
            max:1,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        upgrade_recharger:{
            max:1,
            body:[CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE] // OK
        },
        // build && repair wall
        builder:{
            max:3,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE] // OK
        },
        // repair road
        repairer:{
            max:1,
            body:[WORK, CARRY, CARRY, CARRY, MOVE, MOVE] // OK
        },
        // repair rampart
        rampartbuilder:{
            max:1,
            body:[WORK, CARRY, CARRY, MOVE, MOVE] // OK
        },
        outside_harvester_1:{
            max:1,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        outside_carryer_1:{
            max:3,
            body:[CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        outside_carryer_1:{
            max:1,
            body:[CARRY, CARRY,  MOVE]
        },
        outside_builder:{
            max:2,
            body:[WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        outside_harvester_2:{
            max:1,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        outside_carryer_2:{
            max:3,
            body:[CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        outside_builder_2:{
            max:1,
            body:[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        wallbuilder:{
            max:0,
            body:[WORK, CARRY, MOVE] // OK
        },
        guard:{
            max:0,
            body:[ATTACK, TOUGH, MOVE, MOVE]
        },
        attacker:{
            max:0,
            body:[
                TOUGH,
                ATTACK,
                MOVE, MOVE,
            ]
        }/*,
         e24n14_harvester_0:{
         max:0,
         body:[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
         room:Game.rooms.E24N14
         },
         e24n14_carryer_0:{
         max:0,
         body:[CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
         room:Game.rooms.E24N14
         },
         e24n14_builder:{
         max:0,
         body:[WORK, CARRY, MOVE, MOVE],
         room:Game.rooms.E24N14
         }
         */
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
    console.log(Game.getUsedCpu());
}