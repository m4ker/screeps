/*
 * 主脚本
 * main scripts
 */

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
    var room     = Game.rooms.E23N14;
    var spawn    = Game.spawns.Azeroth;

    var mrampart = min_rampart(room); // hits 最小的 rampart
    var mwall    = min_wall(room); // hits 最小的 wall
    var e24n13_min_rampart = min_rampart(Game.rooms.E24N13);
    var e24n13_min_wall = min_wall(Game.rooms.E24N13);

    var st = Game.getObjectById('56237cff1d01d2c234a7abbf'); // storage 存储中心
    var e24n13_st = Game.getObjectById('562ba8f4ea27f37a20378e4c');

    var ln = Game.getObjectById('562635244f83927a04db5a3c'); // link-1

    var up = null; // upgrader 升级工种
    var E24N13_up = null;
    var E25N13_up = null;
    for ( i in Game.creeps ) {
        if (Game.creeps[i].memory.role == 'upgrader')
            up = Game.creeps[i];
        if (Game.creeps[i].memory.role == 'draenor_upgrader')
            E24N13_up = Game.creeps[i];
        if (Game.creeps[i].memory.role == 'e25n13_upgrader')
            E25N13_up = Game.creeps[i];
    }

    var sources = room.find(FIND_SOURCES); // sources for harvester 资源
    var E24N13_sources = Game.rooms.E24N13.find(FIND_SOURCES);

    // construction sites
    var cs = room.find(FIND_CONSTRUCTION_SITES);
    var e25n13_cs = Game.rooms.E25N13.find(FIND_CONSTRUCTION_SITES);


    if (up && up.carry.energy < 20)
        ln.transferEnergy(up);

    // role controller
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        //creep.moveTo(10, 10);
        //continue;
        switch(creep.memory.role) {
            case 'extrecharger':
                transfer2(creep, st, STRUCTURE_EXTENSION);
                break;
            case 'harvester1':
                harvester2(creep, sources[0]);
                break;
            case 'harvester2':
                harvester2(creep, sources[1]);
                break;
            case 'upgrader':
                worker(creep, room, [{action:'upgrade'}], null);
                break;
            case 'upgrade_recharger':
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
                creep.say(1);
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
                        return object.structureType == STRUCTURE_RAMPART && (object.hits <= (mrampart.hits + 10000));
                    }
                });
                worker(creep, room, [{action:'repair', target:rampart}], st);
                break;
            case 'homerecharger':
                transfer2(creep, st, spawn);
                break;
            case 'outside_builder_2':
                creep.say('ob2');
                //creep.moveTo(20,20);
                //continue;
                // 修和建的逻辑需要调整
                var road = Game.rooms.E23N15.find(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                if (road[0] instanceof Structure) {
                    //if (Game.rooms.E23N15 != undefined)
                    worker(creep, Game.rooms.E23N15, [{action:'repair', target:road[0]}], Game.rooms.E23N15);
                } else {

                    var ocs = Game.rooms.E23N15.find(FIND_CONSTRUCTION_SITES);
                    worker(creep, Game.rooms.E23N15, [{action:'build', target:ocs[0]}], Game.rooms.E23N15);
                }
                break;
            case 'outside_builder':
                creep.say('ob');
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
                transfer2(creep, Game.rooms.E23N13, st);
                break;
            case 'outside_carryer_2':
                transfer2(creep, Game.getObjectById('55db3423efa8e3fe66e05c0b').pos, st);
                break;
            case 'outside_carryer_3':
                transfer2(creep, Game.getObjectById('55db3423efa8e3fe66e05c0a').pos, st);
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
                transfer2(creep, E24N13_sources[1].pos, e24n13_st);
                break;
            case 'draenor_pickuper2':
                transfer2(creep, E24N13_sources[0].pos, e24n13_st);
                break;
            case 'draenor_recharger':
                transfer2(creep, e24n13_st, Game.spawns.Draenor);
                break;
            case 'draenor_upgrader':
                worker(creep, Game.rooms.E24N13, [{action:'upgrade'}],  Game.spawns.Draenor);
                break;
            case 'draenor_upgrader_recharger':
                transfer2(creep, e24n13_st, E24N13_up);
                break;
            case 'draenor_reparier':
                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                if (road) {
                    worker(creep, Game.rooms.E24N13, [{action:'repair', target:road}], e24n13_st);
                }
                break;
            case 'e24n13_rampartbuilder':
                var rampart = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_RAMPART && (object.hits <= (e24n13_min_rampart.hits + 10000));
                    }
                });
                //console.log(rampart);
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
                var road = Game.rooms.E24N12.find(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                if (road[0] instanceof Structure) {
                    worker(creep, Game.rooms.E24N12, [{action:'repair', target:road[0]}], Game.rooms.E24N12);
                } else {
                    var ocs = Game.rooms.E24N12.find(FIND_CONSTRUCTION_SITES);
                    worker(creep, Game.rooms.E24N12, [{action:'build', target:ocs[0]}], Game.rooms.E24N12);
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
                        worker(creep, Game.rooms.E25N13, [{action:'build', target:Game.getObjectById('55db3469efa8e3fe66e05e1d')}], Game.rooms.E23N13);
                    }
                }
                break;
            case 'e25n13_extrecharger':
                transfer2(creep, new RoomPosition(22,22,'E25N13'), STRUCTURE_EXTENSION);
                break;
            case 'e25n13_harvester_1':
                harvester2(creep, Game.getObjectById('55db3469efa8e3fe66e05e1d'));
                break;
            case 'e25n13_harvester_2':
                harvester2(creep, Game.getObjectById('55db3469efa8e3fe66e05e1c'));
                break;
            case 'e25n13_pickuper1':
                creep.say('ep1');
                transfer2(creep, Game.getObjectById('55db3469efa8e3fe66e05e1d').pos, new RoomPosition(22,22,'E25N13'));
                break;
            case 'e25n13_recharger':
                transfer2(creep, new RoomPosition(22,22,'E25N13'), Game.spawns.Dream);
                break;
            case 'e25n13_pickuper2':
                creep.say('ep2');
                transfer2(creep, Game.getObjectById('55db3469efa8e3fe66e05e1c').pos, new RoomPosition(22,22,'E25N13'));
                break;
            case 'e25n13_upgrader':
                creep.say('up');
                worker(creep, Game.rooms.E25N13, [{action:'upgrade'}],  null);
                break;
            case 'e25n13_upgrader_recharger':
                //creep.say('upr');
                transfer2(creep, new RoomPosition(22,22,'E25N13'), E25N13_up);
                break;
            case 'e25n13_builder':
                if (e25n13_cs[0] != undefined) {
                    worker(creep, Game.rooms.E25N13, [{action:'build', target:e25n13_cs[0]}], new RoomPosition(22,22,'E25N13'));
                } else {
                    /*
                     var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                     filter: function(object){
                     return object.structureType == STRUCTURE_WALL
                     && (object.hits < (e25n13_min_wall.hits+creep.carryCapacity * 100));
                     }
                     });
                     worker(creep, Game.rooms.E25N13, [{action:'repair', target:wall}], new RoomPosition(22,22,'E25N13'));
                     */
                }

                break;
            case 'e25n13_reparier':
                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                if (road) {
                    worker(creep, Game.rooms.E25N13, [{action:'repair', target:road}], new RoomPosition(22,22,'E25N13'));
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
    console.log(Game.getUsedCpu());
}
