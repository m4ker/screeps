/*
 * 主脚本
 * main scripts
 */
debug = false;
// 引入工种模块
// role modules
var harvester = require('role.harvester');
var harvester2 = require('role.harvester2');
var transfer2 = require('role.transfer2');
var worker    = require('role.worker');
var soldier   = require('role.soldier');
var nurse     = require('role.nurse');

// 引入工具模块
// helper modules
var min_rampart = require('helper.find_min_rampart');
var min_wall    = require('helper.find_min_wall');
var move_to_room =  require('helper.move_to_room');

// 引入creep生产模块
// creep creater modules
var room_e23n14 = require('room.e23n14');
var room_e24n13 = require('room.e24n13');
var room_e25n13 = require('room.e25n13');

module.exports.loop = function () {
    /*
     * 这里会定义一系列变量，提供给工种
     * vars for roles
     */

    var e23n14_min_rampart = min_rampart(Game.rooms.E23N14); // hits 最小的 rampart
    var e23n14_min_wall    = min_wall(Game.rooms.E23N14); // hits 最小的 wall
    var e24n13_min_rampart = min_rampart(Game.rooms.E24N13);
    var e24n13_min_wall    = min_wall(Game.rooms.E24N13);
    var e25n13_min_rampart = min_rampart(Game.rooms.E25N13);
    var e25n13_min_wall    = min_wall(Game.rooms.E25N13);

    var e23n14_st = Game.getObjectById('56237cff1d01d2c234a7abbf'); // storage 存储中心
    var e24n13_st = Game.getObjectById('562ba8f4ea27f37a20378e4c');
    var e25n14_st = Game.getObjectById('56346b877d9a9c8029683649');

    var e23n14_ln_1 = Game.getObjectById('562635244f83927a04db5a3c'); // link-1

    var e24n13_ln_1 = Game.getObjectById('56344b1165cfffa96f919ff8');

    var e23n14_up = null; // upgrader 升级工种
    var e24n13_up = null;
    var e25n13_up = null;
    for ( i in Game.creeps ) {
        if (Game.creeps[i].memory.role == 'upgrader' && Game.creeps[i].ticksToLive != undefined)
            e23n14_up = Game.creeps[i];
        if (Game.creeps[i].memory.role == 'draenor_upgrader' && Game.creeps[i].ticksToLive != undefined)
            e24n13_up = Game.creeps[i];
        if (Game.creeps[i].memory.role == 'e25n13_upgrader' && Game.creeps[i].ticksToLive != undefined)
            e25n13_up = Game.creeps[i];
    }

    var e23n14_sources = Game.rooms.E23N14.find(FIND_SOURCES); // sources for harvester 资源
    var e24n13_sources = Game.rooms.E24N13.find(FIND_SOURCES);

    // construction sites
    var e23n14_cs = Game.rooms.E23N14.find(FIND_CONSTRUCTION_SITES);
    var e25n13_cs = Game.rooms.E25N13.find(FIND_CONSTRUCTION_SITES);


    if (e23n14_up && e23n14_up.carry.energy < 40) {
        e23n14_ln_1.transferEnergy(e23n14_up);
    }

    if (e24n13_up && e24n13_up.carry.energy < 40) {
        e24n13_ln_1.transferEnergy(e24n13_up);
    }

    // role controller
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        //creep.moveTo(10, 10);
        //continue;
        switch(creep.memory.role) {
            /*
             case 'test':
             creep.say('go');
             if(creep.room.name == 'E25N13') {
             creep.moveTo(12,0);
             }
             break;
             */
            case 'scout':
                console.log('i am scout');
                if(creep.room.name == 'E24N13') {
                    creep.moveTo(26,0);
                } else {
                    var myDate = new Date();

                    key = myDate.getHours() + ":" + myDate.getMinutes();     //获取当前分钟数(0-59)

                    target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (target) {
                        Memory.rooms.E24N14[key] = 1;
                    } else {
                        Memory.rooms.E24N14[key] = 0;
                    }
                    creep.moveTo(26,48);
                }
                break;
            case 'e25n14_builder':

                if(creep.room.name == 'E25N13') {
                    //creep.say('bb');
                    if (creep.carry.energy < creep.carryCapacity) {
                        if(Game.rooms.E25N13.storage.transferEnergy(creep) == ERR_NOT_IN_RANGE){
                            creep.moveTo(Game.rooms.E25N13.storage);
                        }
                    } else {
                        creep.moveTo(12,0);
                    }
                } else if(creep.room.name == 'E25N14') {
                    //creep.say('bc');
                    if (creep.carry.energy == 0) {
                        creep.moveTo(12,49);
                    } else {
                        e25n14_cs = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                        if (e25n14_cs) {
                            if (creep.build(e25n14_cs) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(e25n14_cs);
                            }
                        } else {

                            var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: function(object){
                                    return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                                }
                            });
                            if (road) {
                                if (creep.repair(road) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(road);
                                }
                            }

                        }
                    }
                }
                break;
            case 'extrecharger':
                transfer2(creep, e23n14_st, STRUCTURE_EXTENSION);
                break;
            case 'harvester1':
                harvester2(creep, e23n14_sources[0]);
                break;
            case 'harvester2':
                harvester2(creep, e23n14_sources[1]);
                break;
            case 'upgrader':
                worker(creep, Game.rooms.E23N14, [{action:'upgrade'}], null);
                break;
            case 'upgrade_recharger':
                transfer2(creep, e23n14_st, e23n14_ln_1);
                break;
            case 'pickuper':
                transfer2(creep, e23n14_sources[0].pos, e23n14_st);
                break;
            case 'pickuper2':
                transfer2(creep, e23n14_sources[1].pos, e23n14_st);
                break;
            case 'repairer':
                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                if (road) {
                    worker(creep, Game.rooms.E23N14, [{action:'repair', target:road}], Game.rooms.E23N14); // 捡能量需要观察
                }
                break;
            case 'builder':
                if (e23n14_cs[0] != undefined) {
                    worker(creep, Game.rooms.E23N14, [{action:'build', target:e23n14_cs[0]}], e23n14_st);
                } else {
                    var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object){
                            return object.structureType == STRUCTURE_WALL
                                && (object.hits < (e23n14_min_wall.hits+creep.carryCapacity * 100));
                            //&& object.hits > 1;// 排除hello world
                        }
                    });
                    worker(creep, Game.rooms.E23N14, [{action:'repair', target:wall}], e23n14_st);
                }
                break;
            case 'guard':
                soldier(creep);
                break;
            case 'attacker':
                //creep.memory.role='a2';
                soldier(creep, Game.flags.Flag1);
                /*
                 spp = Game.getObjectById('5630de4d6c8bfe686379d6e7');
                 if (creep.attack(spp) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(spp);
                 }
                 */
                //soldier(creep);
                break;
            case 'a2':
                //creep.say(1);
                //creep.suicide();
                //creep.move(BOTTOM);
                //creep.moveTo(Game.flags.a9.pos);
                //creep.moveTo(Game.flags.a9);
                //soldier(creep, Game.flags.a9);
                spp = Game.getObjectById('562aeb3679a223a66ed911f5');
                if (creep.attack(spp) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spp);
                }
                //soldier(creep);
                break;
            case 'a3':
                //soldier(creep, Game.flags.a3);
                spp = Game.getObjectById('5631f6f57748c61c3726e453');
                if (creep.attack(spp) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spp);
                }
                //soldier(creep);
                break;
            case 'attacker2':
                soldier(creep, Game.flags.Flag2);
                break;
            case 'nurse':
                nurse(creep, Game.flags.Flag1);
                break;
            case 'rampartbuilder':
                var rampart = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_RAMPART && (object.hits <= (e23n14_min_rampart.hits + 10000));
                    }
                });
                worker(creep, Game.rooms.E23N14, [{action:'repair', target:rampart}], e23n14_st);
                break;
            case 'homerecharger':
                transfer2(creep, e23n14_st, STRUCTURE_SPAWN);
                break;
            case 'outside_builder_2':
            case 'outside_repairer_2':
                // 修和建的逻辑需要调整
                if (creep.room.name == 'E23N15') {
                    road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object){
                            return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                        }
                    });
                    if (road) {
                        worker(creep, Game.rooms.E23N15, [{action:'repair', target:road}], Game.rooms.E23N15);
                    } else {
                        var ocs = Game.rooms.E23N15.find(FIND_CONSTRUCTION_SITES);
                        worker(creep, Game.rooms.E23N15, [{action:'build', target:ocs[0]}], Game.rooms.E23N15);
                    }
                } else {
                    move_to_room(creep, Game.rooms.E23N15)
                }
                break;
            case 'outside_builder':
            case 'outside_repairer':
                if (creep.room.name == 'E23N13') {
                    road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object){
                            return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                        }
                    });
                    if (road) {
                        worker(creep, Game.rooms.E23N13, [{action:'repair', target:road}], Game.rooms.E23N13);
                    } else {
                        var ocs = Game.rooms.E23N13.find(FIND_CONSTRUCTION_SITES);
                        worker(creep, Game.rooms.E23N13, [{action:'build', target:ocs[0]}], Game.rooms.E23N13);
                    }
                } else {
                    move_to_room(creep, Game.rooms.E23N13)
                }
                break;
            case 'outside_harvester_1':
                harvester(creep, 'E23N13', 0);
                break;
            case 'outside_harvester_2':
                harvester(creep, 'E23N15', 1);
                break;
            case 'outside_harvester_3':
                harvester(creep, 'E23N15', 0);
                break;
            case 'outside_carryer_1':
                transfer2(creep, Game.rooms.E23N13, e23n14_st);
                break;
            case 'outside_carryer_2':
                transfer2(creep, Game.getObjectById('55db3423efa8e3fe66e05c0b').pos, e23n14_st);
                break;
            case 'outside_carryer_3':
                transfer2(creep, Game.getObjectById('55db3423efa8e3fe66e05c0a').pos, e23n14_st);
                break;
            case 'draenor_harvester_1':
                if (creep.room.name == 'E23N14') {
                    move_to_room(creep,Game.rooms.E23N13);
                } else if (creep.room.name == 'E23N13') {
                    move_to_room(creep,Game.rooms.E24N13);
                } else {
                    harvester(creep, 'E24N13', 0);
                }
                break;
            case 'draenor_harvester_2':
                if (creep.room.name == 'E23N14') {
                    move_to_room(creep,Game.rooms.E23N13);
                } else if (creep.room.name == 'E23N13') {
                    move_to_room(creep,Game.rooms.E24N13);
                } else {
                    harvester(creep, 'E24N13', 1);
                }
                break;
            case 'draenor_builder':
                if (creep.room.name == 'E23N14') {
                    move_to_room(creep, Game.rooms.E23N13);
                } else if (creep.room.name == 'E23N13') {
                    move_to_room(creep, Game.rooms.E24N13);
                } else {
                    var draenor_cs = Game.rooms.E24N13.find(FIND_CONSTRUCTION_SITES);
                    if (draenor_cs[0] !== undefined) {
                        worker(creep, Game.rooms.E24N13, [{action:'build', target:draenor_cs[0]}], e24n13_st);
                    } else {
                        var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: function(object){
                                return object.structureType == STRUCTURE_WALL
                                    && (object.hits < (e24n13_min_wall.hits+creep.carryCapacity * 100));
                                //&& object.hits > 1;// 排除hello world
                            }
                        });
                        worker(creep, Game.rooms.E24N13, [{action:'repair', target:wall}], e24n13_st);
                    }
                }
                break;
            case 'draenor_extrecharger':
                transfer2(creep, e24n13_st, STRUCTURE_EXTENSION);
                break;
            case 'draenor_pickuper1':
                transfer2(creep, e24n13_sources[1].pos, e24n13_st);
                break;
            case 'draenor_pickuper2':
                transfer2(creep, e24n13_sources[0].pos, e24n13_st);
                break;
            case 'draenor_recharger':
                transfer2(creep, e24n13_st, STRUCTURE_SPAWN);
                break;
            case 'draenor_upgrader':
                worker(creep, Game.rooms.E24N13, [{action:'upgrade'}],  Game.spawns.Draenor);
                break;
            case 'draenor_upgrader_recharger':
                transfer2(creep, e24n13_st, e24n13_ln_1);
                break;
            case 'draenor_reparier':
                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                if (road) {
                    worker(creep, Game.rooms.E24N13, [{action:'repair', target:road}], Game.rooms.E24N13); // 捡资源需要观察
                }
                break;
            case 'e24n13_rampartbuilder':
                var rampart = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_RAMPART && (object.hits <= (e24n13_min_rampart.hits + 10000));
                    }
                });
                if (rampart)
                    worker(creep, Game.rooms.E24N13, [{action:'repair', target:rampart}], e24n13_st);
                break;
            case 'e24n12_harvester_1':
                harvester(creep, 'E24N12', 0);
                break;
            case 'e24n12_harvester_2':
                harvester(creep, 'E24N12', 1);
                break;
            case 'e24n12_carryer_1':
                transfer2(creep, Game.getObjectById('55db3448efa8e3fe66e05cfa').pos, e24n13_st);
                break;
            case 'e24n12_carryer_2':
                transfer2(creep, Game.getObjectById('55db3448efa8e3fe66e05cfb').pos, e24n13_st);
                break;
            case 'e24n12_builder':
                if (creep.room.name == 'E24N12') {
                    road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object){
                            return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                        }
                    });
                    if (road) {
                        worker(creep, Game.rooms.E24N12, [{action:'repair', target:road}], Game.rooms.E24N12);
                    } else {
                        var ocs = Game.rooms.E24N12.find(FIND_CONSTRUCTION_SITES);
                        worker(creep, Game.rooms.E24N12, [{action:'build', target:ocs[0]}], Game.rooms.E24N12);
                    }
                } else {
                    move_to_room(creep, Game.rooms.E24N12)
                }

                break;
            case 'spawn_harvester':
                if (creep.room.name == 'E24N13') {
                    creep.moveTo(38, 0);
                } else if (creep.room.name == 'E24N14') {
                    creep.moveTo(49, 37);
                } else if (creep.room.name == 'E25N14') {
                    creep.moveTo(11,49);
                } else {
                    harvester(creep, 'E25N13', '1');
                }
                break;
            case 'spawn_harvester2':
                if (creep.room.name == 'E24N13') {
                    creep.moveTo(38, 0);
                } else if (creep.room.name == 'E24N14') {
                    creep.moveTo(49, 37);
                } else if (creep.room.name == 'E25N14') {
                    creep.moveTo(11,49);
                } else {
                    harvester(creep, 'E25N13', '0');
                }
                break;
            case 'spawn_builder':
                if (creep.room.name == 'E24N13') {
                    creep.moveTo(38, 0);
                } else if (creep.room.name == 'E24N14') {
                    creep.moveTo(49, 37);
                } else if (creep.room.name == 'E25N14') {
                    creep.moveTo(11,49);
                } else {
                    if (Game.spawns.Dream != undefined) {
                        worker(creep, Game.rooms.E25N13, [{action:'upgrade'}], Game.rooms.E23N13);
                    } else {
                        worker(creep, Game.rooms.E25N13, [{action:'build', target:Game.getObjectById('55db3469efa8e3fe66e05e1d')}], Game.rooms.E25N13.storage);
                    }
                }
                break;
            case 'e25n13_extrecharger':
                transfer2(creep, Game.rooms.E25N13.storage, STRUCTURE_EXTENSION);
                break;
            case 'e25n13_harvester_1':
                harvester2(creep, Game.getObjectById('55db3469efa8e3fe66e05e1d'));
                break;
            case 'e25n13_harvester_2':
                harvester2(creep, Game.getObjectById('55db3469efa8e3fe66e05e1c'));
                break;
            case 'e25n13_pickuper1':
                //creep.say('ep1');
                transfer2(creep, Game.getObjectById('55db3469efa8e3fe66e05e1d').pos, Game.rooms.E25N13.storage);
                break;
            case 'e25n13_recharger':
                //creep.say('er');
                transfer2(creep, Game.rooms.E25N13.storage, STRUCTURE_SPAWN);
                break;
            case 'e25n13_pickuper2':
                transfer2(creep, Game.getObjectById('55db3469efa8e3fe66e05e1c').pos, Game.rooms.E25N13.storage);
                break;
            case 'e25n13_upgrader':
                //creep.say('eup');
                worker(creep, Game.rooms.E25N13, [{action:'upgrade'}],  null);
                break;
            case 'e25n13_upgrader_recharger':
                transfer2(creep, Game.rooms.E25N13.storage, e25n13_up);
                break;
            case 'e25n13_builder':
                if (e25n13_cs[0] != undefined) {
                    worker(creep, Game.rooms.E25N13, [{action:'build', target:e25n13_cs[0]}], Game.rooms.E25N13.storage);
                } else {
                    var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object){
                            return object.structureType == STRUCTURE_WALL
                                && (object.hits < (e25n13_min_wall.hits+creep.carryCapacity * 100));
                        }
                    });
                    worker(creep, Game.rooms.E25N13, [{action:'repair', target:wall}], Game.rooms.E25N13.storage);
                }
                break;
            case 'e25n13_rampartbuilder':
                var rampart = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_RAMPART && (object.hits <= (e25n13_min_rampart.hits + 10000));
                    }
                });
                if (rampart)
                    worker(creep, Game.rooms.E25N13, [{action:'repair', target:rampart}], Game.rooms.E25N13.storage);
                break;
            case 'e25n13_reparier':
                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                if (road) {
                    worker(creep, Game.rooms.E25N13, [{action:'repair', target:road}], Game.rooms.E25N13.storage);
                }
                break;
            case 'e25n12_builder':
                if (creep.room.name == 'E25N13') {
                    creep.moveTo(43,49);
                } else {
                    if (creep.carry.energy == 0) {
                        var EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
                        if (EN) {
                            if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(EN);
                            }
                        }
                    } else {
                        e25n12_cs = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                        if (e25n12_cs) {
                            if (creep.build(e25n12_cs) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(e25n12_cs);
                            }
                        } else {
                            var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: function(object){
                                    return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                                }
                            });
                            if (road) {
                                if (creep.repair(road) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(road);
                                }
                            }

                        }
                    }
                }
                break;
            case 'e25n12_harvester':
                if (creep.room.name == 'E25N13') {
                    creep.moveTo(43,49);
                } else {
                    e25n12_source = creep.pos.findClosestByRange(FIND_SOURCES);
                    if (creep.harvest(e25n12_source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(e25n12_source);
                    }
                }
                break;
            case 'e25n12_carryer':
                if (creep.room.name == 'E25N13') {
                    if (creep.carry.energy == 0) {
                        creep.moveTo(43,49);
                    } else {
                        if (creep.transferEnergy(Game.rooms.E25N13.storage) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Game.rooms.E25N13.storage);
                        }
                    }
                } else {
                    if (creep.carry.energy < creep.carryCapacity) {
                        var EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
                        if (EN) {
                            if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(EN);
                            }
                        }
                    } else {
                        creep.moveTo(44,0);
                    }
                }
                break;
            default:
                console.log(creep.name + creep.memory.role + ' fucker');
                break;
        }
    }

    // creep create
    room_e23n14();
    room_e24n13();
    room_e25n13();


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
    if (debug)
        console.log(Game.getUsedCpu());
}
