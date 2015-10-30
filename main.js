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

// 引入工具模块
// helper modules
var min_rampart = require('helper.find_min_rampart');
var min_wall    = require('helper.find_min_wall');
var move_to_room =  require('helper.move_to_room');

// 引入creep生产模块
// creep creater modules
var room_e23n14 = require('room.e23n14');
var room_e24n13 = require('room.e24n13');

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
    for ( i in Game.creeps ) {
        if (Game.creeps[i].memory.role == 'upgrader') {
            up = Game.creeps[i];
            break;
        }
    }

    var E24N13_up = null;
    for ( i in Game.creeps ) {
        if (Game.creeps[i].memory.role == 'draenor_upgrader') {
            E24N13_up = Game.creeps[i];
            break;
        }
    }

    var sources = room.find(FIND_SOURCES); // sources for harvester 资源

    // construction sites
    var cs = room.find(FIND_CONSTRUCTION_SITES);

    //var E23N15_sources = Game.rooms.E23N15.find(FIND_SOURCES);
    /*
    var E23N15_sources = [
        Game.getObjectById('55db3423efa8e3fe66e05c0a'),
        Game.getObjectById('55db3423efa8e3fe66e05c0b')
    ];
    */
    var E24N13_sources = Game.rooms.E24N13.find(FIND_SOURCES);

    if (up && up.carry.energy < 20)
        ln.transferEnergy(up);


    // 战争相关
    e23n15_army = Game.rooms.E23N15.find(FIND_HOSTILE_CREEPS);
    e23n14_army = Game.rooms.E23N14.find(FIND_HOSTILE_CREEPS);
    e23n13_army = Game.rooms.E23N13.find(FIND_HOSTILE_CREEPS);

    e24n13_army = Game.rooms.E24N13.find(FIND_HOSTILE_CREEPS);
    e24n12_army = Game.rooms.E24N12.find(FIND_HOSTILE_CREEPS);


    // role controller
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        //creep.moveTo(20, 20);
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
            case 'outside_builder_2':

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
                //console.log('db');
                //creep.say('db');
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
            case 'e24n12_harvester_1':
                harvester(creep, 'E24N12', 0);
                break;
            case 'e24n12_harvester_2':
                harvester(creep, 'E24N12', 1);
                break;
            case 'e24n12_carryer_1':
                //creep.say('ec1');
                transfer2(creep, Game.getObjectById('55db3448efa8e3fe66e05cfa').pos, e24n13_st);
                break;
            case 'e24n12_carryer_2':
                //creep.say('ec2');
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
            /*
             case 'spawn_builder':
             //soldier(creep, Game.flags.Flag1);
             var ocs = Game.rooms.E24N13.find(FIND_CONSTRUCTION_SITES);
             worker(creep, Game.rooms.E24N13, [{action:'build', target:ocs[0]}], Game.rooms.E23N13);
             break;

             case 'spawn_harvester2'://spawn_harvester2
             // e23n14 e23n13 e24n13
             //creep.say(creep.name);
             //console.log(creep.name);
             if (creep.room.name == 'E23N14') {
             move_to_room(creep,Game.rooms.E23N13);
             } else if (creep.room.name == 'E23N13') {
             move_to_room(creep,Game.rooms.E24N13);
             } else {
             harvester(creep, 'E24N13', 0);
             }
             break;
             case 'spawn_builder2'://spawn_harvester2
             // e23n14 e23n13 e24n13
             if (creep.room.name == 'E23N14') {
             move_to_room(creep,Game.rooms.E23N13);
             } else if (creep.room.name == 'E23N13') {
             move_to_room(creep,Game.rooms.E24N13);
             } else {
             //creep.move(RIGHT);
             var ocs = Game.rooms.E24N13.find(FIND_CONSTRUCTION_SITES);
             worker(creep, Game.rooms.E24N13, [{action:'build', target:ocs[0]}], Game.rooms.E24N13);
             }
             break;
             */
            default:
                console.log(creep.name + creep.memory.role + ' fucker');
                break;
        }
    }

    // creep create
    room_e23n14();
    room_e24n13();


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
