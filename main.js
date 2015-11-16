/*
 * 主脚本 | main scripts
 */
var debug = false;
// 引入工种模块 | role modules
var harvester = require('role.harvester');
var harvester3 = require('role.harvester3');
var transfer2 = require('role.transfer2');
var worker    = require('role.worker2');
var soldier   = require('role.soldier');
var guard     = require('role.guard');
var nurse     = require('role.nurse');

// 引入工具模块 | helper modules
var find_min     = require('helper.find_min');
var data     = require('helper.data');
var move_to_room =  require('helper.move_to_room2');
var find_min_road =  require('helper.find_min_road');
var clear_memory =  require('helper.clear_memory');

// 引入creep生产模块 / creater modules
var room_e23n14 = require('room.e23n14');
var room_e24n13 = require('room.e24n13');
var room_e25n13 = require('room.e25n13');
var room_e22n15 = require('room.e22n15');

module.exports.loop = function () {
    var Data = data();
    if (Data.m == MODE_WORLD) {

        for(i in Data.s[STRUCTURE_LINK]) {
            role = Data.s[STRUCTURE_LINK][i].room.name.toLowerCase() + '_upgrader'
            for(j in Data.c[role]) {
                Data.c[role][j].pos.isNearTo(Data.s[STRUCTURE_LINK][i])
                && Data.c[role][j].carry.energy < (Data.c[role][j].carryCapacity / 2)
                && Data.s[STRUCTURE_LINK][i].transferEnergy(Data.c[role][j]);
            }
        }

        // role controller
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            //creep.moveTo(10, 10);
            //continue;
            switch(creep.memory.role) {
                case 'e24n14_dragon_killer_1':
                    creep.notifyWhenAttacked(false);
                    //creep.say('blood!');
                    if (creep.room.name=='E24N13') {
                        move_to_room(creep,'E24N14')
                    } else {
                        var dragon = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 4);
                        if (dragon[0] != undefined) {
                            if (creep.pos.isNearTo(dragon[0])) {
                                result = creep.attack(dragon[0])
                            } else {
                                creep.moveTo(dragon[0]);
                            }
                        } else {
                            if (creep.ticksToLive < 330) {
                                creep.suicide();
                            } else {
                                if (creep.hits < creep.hitsMax) {
                                    creep.heal(creep);
                                } else {
                                    creep.moveTo(14,42);
                                }
                            }
                        }
                    }
                    break;
                case 'e24n14_harvester_1':
                    creep.notifyWhenAttacked(false);
                    harvester(creep, 'E24N14', 3);
                    break;
                case 'e24n14_carryer_1':
                    creep.notifyWhenAttacked(false);
                    if (Game.getObjectById('55db3447efa8e3fe66e05cf3'))
                        transfer2(creep, Game.getObjectById('55db3447efa8e3fe66e05cf3').pos, Game.rooms.E24N13.storage);
                    break;
                case 'e24n14_dragon_killer_2':
                    if (creep.room.name=='E24N13') {
                        move_to_room(creep,'E24N14')
                    } else {
                        var dragon = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 4);
                        if (dragon[0] != undefined) {
                            if (creep.pos.isNearTo(dragon[0])) {
                                result = creep.attack(dragon[0])
                            } else {
                                creep.moveTo(dragon[0]);
                            }
                        } else {
                            if (creep.ticksToLive < 300) {
                                creep.suicide();
                            } else {
                                if (creep.hits < creep.hitsMax) {
                                    creep.heal(creep);
                                } else {
                                    creep.moveTo(28,39);
                                }
                            }
                        }
                    }
                    break;
                case 'e24n14_harvester_2':
                    harvester(creep, 'E24N14', 2);
                    break;
                case 'e24n14_carryer_2':
                    if (Game.getObjectById('55db3447efa8e3fe66e05cf1'))
                        transfer2(creep, Game.getObjectById('55db3447efa8e3fe66e05cf1').pos, Game.rooms.E24N13.storage);
                    break;
                case 'attacker':
                    soldier(creep);
                    break;
                case 'nurse':
                    nurse(creep, Game.flags.Flag1);
                    break;
                case 'guard':
                    soldier(creep);
                    break;
                case 'e23n14_ext_1':
                case 'e23n14_ext_2':
                    transfer2(creep, Game.rooms.E23N14.storage, [STRUCTURE_EXTENSION, STRUCTURE_SPAWN]);
                    break;
                case 'e23n14_harvester_1':
                    harvester3(creep, Game.getObjectById('55db3423efa8e3fe66e05c0e'), Game.rooms.E23N14.storage);
                    break;
                case 'e23n14_harvester_2':
                    harvester3(creep, Game.getObjectById('55db3423efa8e3fe66e05c0f'), Game.rooms.E23N14.storage);
                    break;
                case 'e23n14_upgrader':
                    worker(creep, 'E23N14', [{action:'upgrade'}], null);
                    break;
                case 'e23n14_upgrade_recharger':
                    transfer2(creep, Game.rooms.E23N14.storage, STRUCTURE_LINK);
                    break;
                case 'e23n14_repairer':
                    //creep.say('rep');
                    if (creep.room.controller.ticksToDowngrade < 49000) {
                        if (creep.carry.energy == 0) {
                            if (creep.room.storage.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage);
                            }
                        } else {
                            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.controller);
                            }
                        }
                    } else {
                        var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: function(object){
                                return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                            }
                        });
                        if (road) {
                            worker(creep, 'E23N14', [{action:'repair', target:road}], Game.rooms.E23N14.storage); // 捡能量需要观察
                        } else {
                            creep.suicide();
                        }
                    }
                    break;
                case 'e23n14_war_builder':
                case 'e23n14_builder':
                    if (Data.b.E23N14[0] != undefined) {
                        //creep.say(1);
                        worker(creep, 'E23N14', [{action:'build', target:Data.b.E23N14[0]}], Game.rooms.E23N14.storage);
                    } else {
                        //creep.say(2);
                        var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: function(object){
                                return (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART)
                                    && (object.hits < (Data.w.E23N14.hits + creep.carryCapacity * 100));
                            }
                        });
                        worker(creep, 'E23N14', [{action:'repair', target:wall}], Game.rooms.E23N14.storage);
                    }
                    break;
                case 'e23n13_repairer':
                    if (creep.room.name == 'E23N13') {
                        road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: function(object){
                                return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                            }
                        });
                        if (road) {
                            worker(creep, 'E23N13', [{action:'repair', target:road}], Game.rooms.E23N13);
                        } else {
                            var ocs = Game.rooms.E23N13.find(FIND_CONSTRUCTION_SITES);
                            worker(creep, 'E23N13', [{action:'build', target:ocs[0]}], Game.rooms.E23N13);
                        }
                    } else {
                        move_to_room(creep, 'E23N13')
                    }
                    break;
                case 'e23n15_builder':
                    //creep.say('kill me');
                    // 修和建的逻辑需要调整
                    if (creep.room.name == 'E23N15') {
                        var ocs = Game.rooms.E23N15.find(FIND_CONSTRUCTION_SITES);
                        worker(creep, 'E23N15', [{action:'build', target:ocs[0]}], Game.rooms.E23N15);

                    } else {
                        move_to_room(creep, 'E23N15')
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
                            worker(creep, 'E23N15', [{action:'repair', target:road}], Game.rooms.E23N15);
                        } else {
                            var ocs = Game.rooms.E23N15.find(FIND_CONSTRUCTION_SITES);
                            worker(creep, 'E23N15', [{action:'build', target:ocs[0]}], Game.rooms.E23N15);
                        }
                    } else {
                        move_to_room(creep, 'E23N15')
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
                    if (Game.getObjectById('55db3423efa8e3fe66e05c0b'))
                        transfer2(creep, Game.getObjectById('55db3423efa8e3fe66e05c0b').pos, Game.rooms.E23N14.storage);
                    break;
                case 'e23n15_carryer_2':
                    if (Game.getObjectById('55db3423efa8e3fe66e05c0a'))
                        transfer2(creep, Game.getObjectById('55db3423efa8e3fe66e05c0a').pos, Game.rooms.E23N14.storage);
                    break;
                case 'e24n13_harvester_1':
                    harvester3(creep, Game.getObjectById('55db3448efa8e3fe66e05cf5'), Game.rooms.E24N13.storage);
                    break;
                case 'e24n13_harvester_2':
                    harvester3(creep, Game.getObjectById('55db3448efa8e3fe66e05cf7'), Game.rooms.E24N13.storage);
                    break;
                case 'e24n13_war_builder':
                case 'e24n13_builder':
                    if (Data.b.E24N13[0] != undefined) {
                        worker(creep, 'E24N13', [{action:'build', target:Data.b.E24N13[0]}], Game.rooms.E24N13.storage);
                    } else {
                        var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: function(object){
                                return (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART)
                                    && (object.hits < (Data.w.E24N13.hits + creep.carryCapacity * 100));
                            }
                        });
                        worker(creep, 'E24N13', [{action:'repair', target:wall}], Game.rooms.E24N13.storage);
                    }
                    break;
                case 'e24n13_ext_1':
                case 'e24n13_ext_2':
                    transfer2(creep, Game.rooms.E24N13.storage, STRUCTURE_EXTENSION);
                    break;
                case 'e24n13_upgrader':
                    worker(creep, 'E24N13', [{action:'upgrade'}],  null);
                    break;
                case 'e24n13_upgrader_recharger':
                    transfer2(creep, Game.rooms.E24N13.storage, STRUCTURE_LINK);
                    break;
                case 'e24n13_reparier':
                    var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object){
                            return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                        }
                    });
                    if (road) {
                        worker(creep, 'E24N13', [{action:'repair', target:road}], Game.rooms.E24N13.storage); // 捡资源需要观察
                    } else {
                        creep.suicide();
                    }
                    break;
                case 'e24n12_harvester_1':
                    harvester(creep, 'E24N12', 0);
                    break;
                case 'e24n12_harvester_2':
                    harvester(creep, 'E24N12', 1);
                    break;
                case 'e24n12_carryer_1':
                    if (Game.getObjectById('55db3448efa8e3fe66e05cfa'))
                        transfer2(creep, Game.getObjectById('55db3448efa8e3fe66e05cfa').pos, Game.rooms.E24N13.storage);
                    break;
                case 'e24n12_carryer_2':
                    if (Game.getObjectById('55db3448efa8e3fe66e05cfb'))
                        transfer2(creep, Game.getObjectById('55db3448efa8e3fe66e05cfb').pos, Game.rooms.E24N13.storage);
                    break;
                case 'e24n12_builder':
                    if (creep.room.name == 'E24N12') {
                        var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: function(object){
                                return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                            }
                        });
                        if (road) {
                            worker(creep, 'E24N12', [{action:'repair', target:road}], Game.rooms.E24N12);
                        } else {
                            var ocs = Game.rooms.E24N12.find(FIND_CONSTRUCTION_SITES);
                            worker(creep, 'E24N12', [{action:'build', target:ocs[0]}], Game.rooms.E24N12);
                        }
                    } else {
                        move_to_room(creep, 'E24N12')
                    }
                    break;
                case 'e25n13_manager':
                    var ext = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: function(object){
                            return (object.structureType == STRUCTURE_EXTENSION || object.structureType == STRUCTURE_SPAWN) && object.energy < object.energyCapacity;
                        }
                    });
                    if (ext) {
                        transfer2(creep, Game.rooms.E25N13.storage, ext);
                    } else {
                        if (creep.room.controller.ticksToDowngradenumber < 49000) {
                            if (creep.carry.energy == 0) {
                                if (creep.room.storage.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.storage);
                                }
                            } else {
                                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.controller);
                                }
                            }
                        } else {
                            if (creep.room.storage.store.energy < creep.room.storage.storeCapacitynumber) {
                                harvester3(creep, Game.getObjectById('55db3469efa8e3fe66e05e1d'), Game.rooms.E25N13.storage);
                            } else {
                                creep.memory.role = 'e25n13_builder';
                            }
                        }
                    }
                    break;
                case 'e25n13_ext_1':
                case 'e25n13_ext_2':
                    transfer2(creep, Game.rooms.E25N13.storage, [STRUCTURE_EXTENSION, STRUCTURE_SPAWN]);
                    break;
                case 'e25n13_harvester_1':
                    harvester3(creep, Game.getObjectById('55db3469efa8e3fe66e05e1d'), Game.rooms.E25N13.storage);
                    break;
                case 'e25n13_harvester_2':
                    harvester3(creep, Game.getObjectById('55db3469efa8e3fe66e05e1c'), Game.rooms.E25N13.storage);
                    break;
                case 'e25n13_upgrader':
                    worker(creep, 'E25N13', [{action:'upgrade'}],  null);
                    break;
                case 'e25n13_upgrader_recharger':
                    transfer2(creep, Game.rooms.E25N13.storage, STRUCTURE_LINK);
                    break;
                case 'e25n13_war_builder':
                case 'e25n13_builder':
                    if (Data.b.E25N13[0] != undefined) {
                        worker(creep, 'E25N13', [{action:'build', target:Data.b.E25N13[0]}], Game.rooms.E25N13.storage);
                    } else {
                        var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: function(object){
                                return (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART )
                                    && (object.hits < (Data.w.E25N13.hits+creep.carryCapacity * 100));
                            }
                        });
                        worker(creep, 'E25N13', [{action:'repair', target:wall}], Game.rooms.E25N13.storage);
                    }
                    break;
                case 'e25n13_repairer':
                    var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object){
                            return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                        }
                    });
                    if (road) {
                        worker(creep, 'E25N13', [{action:'repair', target:road}], Game.rooms.E25N13.storage);
                    } else {
                        creep.suicide();
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
                    harvester(creep, 'E25N12', 0);
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
                    transfer2(creep, Game.rooms.E22N15.storage, [STRUCTURE_EXTENSION, STRUCTURE_SPAWN]);
                    break;
                case 'e22n15_left_guard':
                    left_ramparts = [
                        Game.getObjectById('56414fefea8c65cf5f0514a1'),
                        Game.getObjectById('563da0a410e22baa19c8dd5d'),
                        Game.getObjectById('56414fe3b17dfb915f4b8f95')
                    ];
                    guard(creep, left_ramparts);
                    break;
                case 'e22n15_bottom_guard':
                    bottom_ramparts = [
                        Game.getObjectById('564151de763e62e25d5ef9d0'),
                        Game.getObjectById('5641762d1dfb478c4fcec1f7'),
                        Game.getObjectById('564151eac2cadd1922c77fea')
                    ];
                    guard(creep, bottom_ramparts);
                    break;
                case 'e22n15_right_guard':
                    right_ramparts = [
                        Game.getObjectById('563ccf164ae0cadf04a16ff9'),
                        Game.getObjectById('56416e5762bf5d035e8c2633'),
                        Game.getObjectById('56417666f04bcbee5ff364e9')
                    ];
                    guard(creep, right_ramparts);
                    break;
                case 'e22n15_harvester_1':
                    //creep.say(1);
                    harvester3(creep, Game.getObjectById('55db33ffefa8e3fe66e05b45'), Game.rooms.E22N15.storage);
                    break;
                case 'e22n15_harvester_2':
                    harvester3(creep, Game.getObjectById('55db33ffefa8e3fe66e05b44'), Game.rooms.E22N15.storage);
                    break;
                case 'e22n15_upgrader':
                    worker(creep, 'E22N15', [{action:'upgrade'}], null);
                    break;
                case 'e22n15_upgrader_recharger':
                    transfer2(creep, Game.rooms.E22N15.storage, STRUCTURE_LINK);
                    break;
                case 'e22n15_repairer':
                    var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object){
                            return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                        }
                    });
                    if (road) {
                        worker(creep, 'E22N15', [{action:'repair', target:road}], Game.rooms.E22N15.storage); // 捡资源需要观察
                    } else {
                        creep.suicide();
                    }
                    break;
                case 'e22n15_war_builder':
                case 'e22n15_builder':
                    if (Data.b.E22N15[0] != undefined) {
                        worker(creep, 'E22N15', [{action:'build', target:Data.b.E22N15[0]}], Game.rooms.E22N15.storage);
                    } else {
                        var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: function(object){
                                return (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART )
                                    && (object.hits < (Data.w.E22N15.hits+creep.carryCapacity * 100));
                            }
                        });
                        worker(creep, 'E22N15', [{action:'repair', target:wall}], Game.rooms.E22N15.storage);
                    }
                    break;
                case 'e22n14_harvester_1':
                    harvester(creep, 'E22N14', 0);
                    break;
                case 'e22n14_carryer_1':
                    transfer2(creep, Game.rooms.E22N14, Game.rooms.E22N15.storage);
                    break;
                case 'e22n14_repairer':
                    if (creep.room.name == 'E22N14') {
                        e22n14_cs = Game.rooms.E22N14.find(FIND_CONSTRUCTION_SITES);
                        if (e22n14_cs[0] != undefined) {
                            worker(creep, 'E22N14', [{action:'build', target:e22n14_cs[0]}], Game.rooms.E22N14);
                        } else {
                            road = find_min_road(Game.rooms.E22N14);
                            if (road) {
                                worker(creep, 'E22N14', [{action:'repair', target:road}], Game.rooms.E22N14);
                            }
                        }
                    } else {
                        move_to_room(creep, 'E22N14');
                    }
                    break;
                case 'e22n16_harvester_1':
                    harvester(creep, 'E22N16', 0);
                    break;
                case 'e22n16_carryer_1':
                    transfer2(creep, Game.rooms.E22N16, Game.rooms.E22N15.storage);
                    break;
                case 'e22n16_repairer':
                    if (creep.room.name == 'E22N16') {
                        e22n16_cs = Game.rooms.E22N16.find(FIND_CONSTRUCTION_SITES);
                        if (e22n16_cs[0] != undefined) {
                            worker(creep, 'E22N16', [{action:'build', target:e22n16_cs[0]}], Game.rooms.E22N16);
                        } else {
                            road = find_min_road(Game.rooms.E22N16);
                            if (road) {
                                worker(creep, 'E22N16', [{action:'repair', target:road}], Game.rooms.E22N16);
                            }
                        }
                    } else {
                        move_to_room(creep, 'E22N16');
                    }
                    break;
                case 'e21n15_repairer':
                    if (creep.room.name == 'E21N15') {
                        e21n15_cs = Game.rooms.E21N15.find(FIND_CONSTRUCTION_SITES);
                        if (e21n15_cs[0] != undefined) {
                            worker(creep, 'E21N15', [{action:'build', target:e21n15_cs[0]}], Game.rooms.E21N15);
                        } else {
                            road = find_min_road(Game.rooms.E21N15);
                            if (road) {
                                worker(creep, 'E21N15', [{action:'repair', target:road}], Game.rooms.E21N15);
                            }
                        }
                    } else {
                        move_to_room(creep, 'E21N15');
                    }
                    break;
                case 'e21n15_harvester_1':
                    harvester(creep, 'E21N15', 1);
                    break;
                case 'e21n15_carryer_1':
                    transfer2(creep, Game.rooms.E21N15, Game.rooms.E22N15.storage);
                    break;
                default:
                    console.log(creep.name + creep.memory.role + ' fucker');
                    //creep.suicide();
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

        clear_memory();

        if (debug)
            console.log('1:' + Game.getUsedCpu());
    } else if (Data.mode == MODE_SIMULATION) {
        console.log('i am in MODE_SIMULATION')
    }
}
