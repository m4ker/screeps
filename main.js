/*
 * 主脚本 | main scripts
 */
debug = false;
// 引入工种模块 | role modules
var harvester = require('role.harvester');
var harvester2 = require('role.harvester2');
var harvester3 = require('role.harvester3');
var transfer2 = require('role.transfer2');
var worker    = require('role.worker');
var soldier   = require('role.soldier');
var nurse     = require('role.nurse');

// 引入工具模块 | helper modules
//var min_rampart  = require('helper.find_min_rampart');
//var min_wall     = require('helper.find_min_wall');
var find_min     = require('helper.find_min');
var move_to_room =  require('helper.move_to_room');

// 引入creep生产模块 / creater modules
var room_e23n14 = require('room.e23n14');
var room_e24n13 = require('room.e24n13');
var room_e25n13 = require('room.e25n13');
var room_e22n15 = require('room.e22n15');

module.exports.loop = function () {
    /*
     * 这里会定义一系列变量，提供给工种 | vars for roles
     */
    var e23n14_min = find_min(Game.rooms.E23N14);
    var e24n13_min = find_min(Game.rooms.E24N13);
    var e25n13_min = find_min(Game.rooms.E25N13);
    var e22n15_min = find_min(Game.rooms.E22N15);

    var e23n14_ln_1 = Game.getObjectById('562635244f83927a04db5a3c'); // link-1
    var e23n14_ln_2 = Game.getObjectById('563add8b5f2d0b933a5a0995');

    var e24n13_ln_1 = Game.getObjectById('56344b1165cfffa96f919ff8');
    //var e24n13_ln_2 = Game.getObjectById('563b59679a7af14a70664e1c');

    var e25n13_ln_1 = Game.getObjectById('563707dc3ff735a878e1baea');
    var e25n13_ln_2 = Game.getObjectById('56370c3897bac97678b274d9');

    var e22n15_ln_1 = Game.getObjectById('5640ac482e99bcc019047eec');

    if (e25n13_ln_2.energy < 100) {
        e25n13_ln_1.transferEnergy(e25n13_ln_2);
    }

    var e23n14_up = null; // upgrader 升级工种
    var e24n13_up = null;
    var e25n13_up = null;
    var e22n15_up = null;
    //var jj = 0;
    for ( i in Game.creeps ) {
        //console.log(++jj);

        if (Game.creeps[i].memory.role == 'e24n13_upgrader' && Game.creeps[i].ticksToLive != undefined)
            e23n14_up = Game.creeps[i];
        if (Game.creeps[i].memory.role == 'e23n14_upgrader' && Game.creeps[i].ticksToLive != undefined)
            e24n13_up = Game.creeps[i];
        if (Game.creeps[i].memory.role == 'e25n13_upgrader' && Game.creeps[i].ticksToLive != undefined) {
            e25n13_up = Game.creeps[i];
            if (Game.creeps[i].carry.energy < 50) {
                e25n13_ln_1.transferEnergy(Game.creeps[i]);
                e25n13_ln_2.transferEnergy(Game.creeps[i]);
            }
        }
        if (Game.creeps[i].memory.role == 'e22n15_upgrader' && Game.creeps[i].ticksToLive != undefined)
            e22n15_up = Game.creeps[i];
    }

    var e23n14_sources = Game.rooms.E23N14.find(FIND_SOURCES); // sources for harvester 资源
    var e24n13_sources = Game.rooms.E24N13.find(FIND_SOURCES);

    // construction sites
    var e23n14_cs = Game.rooms.E23N14.find(FIND_CONSTRUCTION_SITES);
    var e24n13_cs = Game.rooms.E24N13.find(FIND_CONSTRUCTION_SITES);
    var e25n13_cs = Game.rooms.E25N13.find(FIND_CONSTRUCTION_SITES);
    var e22n15_cs = Game.rooms.E22N15.find(FIND_CONSTRUCTION_SITES);

    if (e23n14_up && e23n14_up.carry.energy < 40) {
        e23n14_ln_1.transferEnergy(e23n14_up);
        e23n14_ln_2.transferEnergy(e23n14_up);
    }

    if (e24n13_up && e24n13_up.carry.energy < 40) {
        e24n13_ln_1.transferEnergy(e24n13_up);
        //e24n13_ln_2.transferEnergy(e24n13_up);
    }

    if (e22n15_up && e22n15_up.carry.energy < 40) {
        e22n15_ln_1.transferEnergy(e22n15_up);
    }

    // role controller
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        //creep.moveTo(10, 10);
        //continue;
        switch(creep.memory.role) {
            case 'guard':
                soldier(creep);
                break;
            case 'attacker':
                soldier(creep);
                break;
            /*
             case 'scout':
             //console.log('i am scout');
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
             if (creep.carry.energy < creep.carryCapacity) {
             if(Game.rooms.E25N13.storage.transferEnergy(creep) == ERR_NOT_IN_RANGE){
             creep.moveTo(Game.rooms.E25N13.storage);
             }
             } else {
             creep.moveTo(12,0);
             }
             } else if(creep.room.name == 'E25N14') {
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
             case 'e25n15_builder':
             if (creep.room.name == 'E25N13') {
             creep.moveTo(12, 0);
             } else if (creep.room.name == 'E25N14') {
             creep.moveTo(33, 0);
             } else if (creep.room.name == 'E25N15') {
             if (creep.carry.energy == 0) {
             EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
             if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
             creep.moveTo(EN);
             }
             } else {
             e25n15_cs = creep.room.find(FIND_CONSTRUCTION_SITES);
             if (e25n15_cs[0] != undefined) {
             worker(creep, Game.rooms.E25N15, [{action:'build', target:e25n15_cs[0]}], Game.rooms.E25N15);
             } else {
             var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
             filter: function(object){
             return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
             }
             });
             if (road) {
             worker(creep, Game.rooms.E25N15, [{action:'repair', target:road}], Game.rooms.E25N15);
             }
             }
             }
             }
             break;
             case 'e25n15_harvester_1':
             if (creep.room.name == 'E25N13') {
             creep.moveTo(12, 0);
             } else if (creep.room.name == 'E25N14') {
             creep.moveTo(33, 0);
             } else if (creep.room.name == 'E25N15') {
             harvester2(creep, Game.getObjectById('55db3467efa8e3fe66e05e0f'));
             }
             break;
             case 'e25n15_carryer_1':
             if (creep.carry.energy < creep.carryCapacity) {
             if (creep.room.name == 'E25N13') {
             creep.moveTo(12, 0);
             } else if (creep.room.name == 'E25N14') {
             creep.say('e25n14');
             creep.moveTo(33, 0);
             } else if (creep.room.name == 'E25N15') {
             EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
             if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
             creep.moveTo(EN);
             }
             }
             } else {
             if (creep.room.name == 'E25N15') {
             creep.moveTo(33, 49);
             } else if (creep.room.name == 'E25N14') {
             creep.moveTo(12, 49);
             } else if (creep.room.name == 'E25N13') {
             if (creep.transferEnergy(Game.rooms.E25N13.storage) == ERR_NOT_IN_RANGE) {
             creep.moveTo(Game.rooms.E25N13.storage);
             }
             }
             }
             break;
             */
            case 'e23n14_ext_1':
            case 'e23n14_ext_2':
                transfer2(creep, Game.rooms.E23N14.storage, STRUCTURE_EXTENSION);
                break;
            case 'e23n14_harvester_1':
                harvester3(creep, Game.getObjectById('55db3423efa8e3fe66e05c0e'), Game.rooms.E23N14.storage);
                break;
            case 'e23n14_harvester_2':
                harvester3(creep, Game.getObjectById('55db3423efa8e3fe66e05c0f'), Game.rooms.E23N14.storage);
                break;
            case 'e23n14_upgrader':
                worker(creep, Game.rooms.E23N14, [{action:'upgrade'}], null);
                break;
            case 'e23n14_upgrade_recharger':
                if (e23n14_ln_1.energy < 400) {
                    transfer2(creep, Game.rooms.E23N14.storage, e23n14_ln_1);
                } else {
                    transfer2(creep, Game.rooms.E23N14.storage, e23n14_ln_2);
                }
                break;
            case 'e23n14_repairer':
                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                if (road) {
                    worker(creep, Game.rooms.E23N14, [{action:'repair', target:road}], Game.rooms.E23N14); // 捡能量需要观察
                }
                break;
            case 'e23n14_builder':
                if (e23n14_cs[0] != undefined) {
                    worker(creep, Game.rooms.E23N14, [{action:'build', target:e23n14_cs[0]}], Game.rooms.E23N14.storage);
                } else {
                    var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object){
                            return (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART)
                                && (object.hits < (e23n14_min.hits + creep.carryCapacity * 100));
                        }
                    });
                    worker(creep, Game.rooms.E23N14, [{action:'repair', target:wall}], Game.rooms.E23N14.storage);
                }
                break;

            /*
             case 'attacker':
             //creep.memory.role='a2';
             //soldier(creep, Game.flags.Flag1);
             //spp = Game.getObjectById('56226dde327bc0fd49748236');
             //spp = creep.pos.findClosestByRange(FIND_STRUCTURES);
             if (creep.attack(spp) == ERR_NOT_IN_RANGE) {
             creep.moveTo(spp);
             }

             //if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE){
             //creep.moveTo(creep.room.controller);
             //}

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
             */
            case 'nurse':
                nurse(creep, Game.flags.Flag1);
                break;
            case 'e23n13_repairer':
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
            case 'e23n15_repairer':
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
                    //move_to_room(creep, Game.rooms.E23N15)
                    creep.moveTo(11,0);
                }

                break;
            case 'e23n13_harvester_1':
                harvester(creep, 'E23N13', 0);
                break;
            case 'e23n15_harvester_1':
                harvester(creep, 'E23N15', 1);
                break;
            case 'e23n15_harvester_2':
                harvester(creep, 'E23N15', 0);
                break;
            case 'e23n13_carryer_1':
                transfer2(creep, Game.rooms.E23N13, Game.rooms.E23N14.storage);
                break;
            case 'e23n15_carryer_1':
                transfer2(creep, Game.getObjectById('55db3423efa8e3fe66e05c0b').pos, Game.rooms.E23N14.storage);
                break;
            case 'e23n15_carryer_1':
                transfer2(creep, Game.getObjectById('55db3423efa8e3fe66e05c0a').pos, Game.rooms.E23N14.storage);
                break;
            case 'e24n13_harvester_1':
                harvester3(creep, Game.getObjectById('55db3448efa8e3fe66e05cf5'), Game.rooms.E24N13.storage);
                break;
            case 'e24n13_harvester_2':
                harvester3(creep, Game.getObjectById('55db3448efa8e3fe66e05cf7'), Game.rooms.E24N13.storage);
                break;
            case 'e24n13_builder':
                if (e24n13_cs[0] != undefined) {
                    worker(creep, Game.rooms.E24N13, [{action:'build', target:e24n13_cs[0]}], Game.rooms.E24N13.storage);
                } else {
                    var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object){
                            return (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART)
                                && (object.hits < (e24n13_min.hits + creep.carryCapacity * 100));
                        }
                    });
                    worker(creep, Game.rooms.E24N13, [{action:'repair', target:wall}], Game.rooms.E24N13.storage);
                }
                break;
            case 'e24n13_ext_1':
            case 'e24n13_ext_2':
                transfer2(creep, Game.rooms.E24N13.storage, STRUCTURE_EXTENSION);
                break;
            case 'e24n13_upgrader':
                worker(creep, Game.rooms.E24N13, [{action:'upgrade'}],  Game.spawns.Draenor);
                break;
            case 'e24n13_upgrader_recharger':
                transfer2(creep, Game.rooms.E24N13.storage, e24n13_ln_1);
                break;
            case 'e24n13_reparier':
                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                if (road) {
                    worker(creep, Game.rooms.E24N13, [{action:'repair', target:road}], Game.rooms.E24N13); // 捡资源需要观察
                }
                break;
            case 'e24n12_harvester_1':
                harvester(creep, 'E24N12', 0);
                break;
            case 'e24n12_harvester_2':
                harvester(creep, 'E24N12', 1);
                break;
            case 'e24n12_carryer_1':
                transfer2(creep, Game.getObjectById('55db3448efa8e3fe66e05cfa').pos, Game.rooms.E24N13.storage);
                break;
            case 'e24n12_carryer_2':
                transfer2(creep, Game.getObjectById('55db3448efa8e3fe66e05cfb').pos, Game.rooms.E24N13.storage);
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
            case 'e25n13_ext_1':
            case 'e25n13_ext_2':
                transfer2(creep, Game.rooms.E25N13.storage, STRUCTURE_EXTENSION);
                break;
            case 'e25n13_harvester_1':
                harvester3(creep, Game.getObjectById('55db3469efa8e3fe66e05e1d'), Game.rooms.E25N13.storage);
                break;
            case 'e25n13_harvester_2':
                harvester3(creep, Game.getObjectById('55db3469efa8e3fe66e05e1c'), Game.rooms.E25N13.storage);
                break;
            case 'e25n13_upgrader':
                worker(creep, Game.rooms.E25N13, [{action:'upgrade'}],  null);
                break;
            case 'e25n13_upgrader_recharger':
                transfer2(creep, Game.rooms.E25N13.storage, e25n13_ln_1);
                break;
            case 'e25n13_builder':
                if (e25n13_cs[0] != undefined) {
                    worker(creep, Game.rooms.E25N13, [{action:'build', target:e25n13_cs[0]}], Game.rooms.E25N13.storage);
                } else {
                    var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object){
                            return (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART )
                                && (object.hits < (e25n13_min.hits+creep.carryCapacity * 100));
                        }
                    });
                    worker(creep, Game.rooms.E25N13, [{action:'repair', target:wall}], Game.rooms.E25N13.storage);
                }
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
            case 'e22n15_ext_1':
            case 'e22n15_ext_2':
                transfer2(creep, Game.rooms.E22N15.storage, STRUCTURE_EXTENSION);
                break;
            case 'e22n15_harvester_1':
                harvester3(creep, Game.getObjectById('55db33ffefa8e3fe66e05b45'), Game.rooms.E22N15.storage);
                break;
            case 'e22n15_harvester_2':
                harvester3(creep, Game.getObjectById('55db33ffefa8e3fe66e05b44'), Game.rooms.E22N15.storage);
                break;
            case 'e22n15_upgrader':
                if (creep.room.name == 'E23N14') {
                    move_to_room(creep, Game.rooms.E23N15);
                } else if (creep.room.name == 'E23N15') {
                    move_to_room(creep, Game.rooms.E22N15);
                } else {
                    worker(creep, Game.rooms.E22N15, [{action:'upgrade'}], null);
                }
                break;
            case 'e22n15_upgrader_recharger':
                transfer2(creep, Game.rooms.E22N15.storage, e22n15_ln_1);
                break;
            case 'e22n15_repairer':
                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                if (road) {
                    worker(creep, Game.rooms.E22N15, [{action:'repair', target:road}], Game.rooms.E22N15.storage); // 捡资源需要观察
                }
                break;
            case 'e22n15_builder':
                if (e22n15_cs[0] != undefined) {
                    worker(creep, Game.rooms.E22N15, [{action:'build', target:e22n15_cs[0]}], Game.rooms.E22N15.storage);
                } else {
                    var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object){
                            return (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART )
                                && (object.hits < (e22n15_min.hits+creep.carryCapacity * 100));
                        }
                    });
                    worker(creep, Game.rooms.E22N15, [{action:'repair', target:wall}], Game.rooms.E22N15.storage);
                }
                break;
            case 'e22n14_harvester_1':
                if (creep.room.name == 'E22N15') {
                    creep.moveTo(28,49);
                } else {
                    harvester2(creep, Game.getObjectById('55db33ffefa8e3fe66e05b47'));
                }
                break;
            case 'e22n14_carryer_1':
                transfer2(creep, Game.rooms.E22N14, Game.rooms.E22N15.storage);
                break;
            case 'e21n15_harvester_1':
                if (creep.room.name == 'E22N15') {
                    creep.moveTo(0,16);
                } else {
                    harvester2(creep, Game.getObjectById('55db33ddefa8e3fe66e05a7f'));
                }
                break;
            case 'e21n15_carryer_1':
                transfer2(creep, Game.rooms.E21N15, Game.rooms.E22N15.storage);
                break;
            default:
                console.log(creep.name + creep.memory.role + ' fucker');
                break;
        }

        if (debug)
            console.log(creep.memory.role + ':' + Game.getUsedCpu());
    }

    if (debug)
        console.log('2:' + Game.getUsedCpu());

    // creep create
    room_e23n14();
    room_e24n13();
    room_e25n13();
    room_e22n15();

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
        console.log('1:' + Game.getUsedCpu());
}
