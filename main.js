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
var dragon_killer = require('role.dragon_killer');
var take_room = require('role.take_room');
var e25n15 = require('role.e25n15');
var reservation = require('role.reservation');

// 引入工具模块 | helper modules
var find_min     = require('helper.find_min');
var data     = require('helper.data');
var move_to_room =  require('helper.move_to_room2');
var move_rooms =  require('helper.move_rooms');
var find_min_road =  require('helper.find_min_road');
var clear_memory =  require('helper.clear_memory');

// 引入creep生产模块 / creater modules
var room_e23n14 = require('room.e23n14');
var room_e24n13 = require('room.e24n13');
var room_e25n13 = require('room.e25n13');
var room_e22n15 = require('room.e22n15');
var room_e28n17 = require('room.e28n17');
var room_e26n12 = require('room.e26n12');

module.exports.loop = function () {
    var Data = data();

    //console.log(Data.sp.E22N15);

    if (Data.m == MODE_WORLD) {
        for(var i in Data.s[STRUCTURE_OBSERVER]) {
            x = Data.s[STRUCTURE_OBSERVER][i].room.name.substr(1,2);
            y = Data.s[STRUCTURE_OBSERVER][i].room.name.substr(4,2);
            n = Game.time%81;
            x = x-5+(n%9);
            y = y-5+(Math.floor(n/9));
            //console.log(x,y);
            //observeRoom
            Data.s[STRUCTURE_OBSERVER][i].observeRoom('E'+x+'N'+y);
        }

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
            //creep.moveTo(20,20);
            //continue;

            if (creep.ticksToLive < 300) {
                creep.say('help');
                //console.log(creep.memory.needRenew,Data.r[creep.room.name] != undefined,Data.sp[creep.room.name].length == 3);
                creep.memory.needRenew = true;
            }

            if (
                creep.memory.needRenew
                && Data.sp[creep.room.name] != undefined
                && Data.sp[creep.room.name].length == 3 // 8级房间
            )  {
                //ERR_FULL
                var result = Data.sp[creep.room.name][0].renewCreep(creep);
                if (result == ERR_NOT_IN_RANGE) {
                    //creep.say('help!')
                    creep.moveTo(Data.sp[creep.room.name][0]);
                } else if (result == ERR_FULL) {
                    creep.memory.needRenew = false;
                }
                continue;

            }

            switch(creep.memory.role) {
                case 'e29n18_harvester_1':
                    if (creep.room.name == 'E29N18') {
                        harvester(creep, 'E29N18', 0);
                    } else {
                        move_rooms(creep, ['E28N17', 'E29N17', 'E29N18']);
                    }
                    break;
                case 'e29n18_carryer_1':
                    if (creep.carry.energy<creep.carryCapacity) {
                        if (creep.room.name == 'E29N18') {
                            //creep.move(TOP);
                            //transfer2(creep, creep.room, Game.rooms.E28N17.storage);
                            //creep.dropEnergy();
                            if (Data.d[creep.room.name]) {
                                if (creep.pickup(Data.d[creep.room.name][0]) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(Data.d[creep.room.name][0])
                                }
                            }
                        } else {
                            move_rooms(creep, ['E28N17', 'E29N17', 'E29N18']);
                        }
                    } else {
                        if (creep.room.name == 'E28N17') {
                            transfer2(creep, creep.room, creep.room.storage);
                        } else {
                            move_rooms(creep, ['E29N18', 'E29N17', 'E28N17']);
                        }
                    }
                    break;
                case 'e28n17_upgrade_recharger':
                    transfer2(creep, creep.room.storage, [STRUCTURE_LINK]);
                    break;
                case 'e27n17_harvester_1':
                    harvester(creep, 'E27N17', 0);
                    break;
                case 'e27n17_carryer_1':
                    transfer2(creep, Game.rooms.E27N17, Game.rooms.E28N17.storage);
                    break;
                case 'e29n17_harvester_1':
                    harvester(creep, 'E29N17', 0);
                    break;
                case 'e29n17_carryer_1':
                    //creep.suicide();
                    if (Game.getObjectById('55db34f3efa8e3fe66e061c3'))
                        transfer2(creep, Game.getObjectById('55db34f3efa8e3fe66e061c3').pos, Game.rooms.E28N17.storage);
                    // transfer2(creep, Game.rooms.E29N17, Game.rooms.E28N17.storage);
                    break;
                case 'e29n17_harvester_2':
                    harvester(creep, 'E29N17', 1);
                    break;
                case 'e29n17_carryer_2':
                    //creep.suicide();
                    if (Game.getObjectById('55db34f3efa8e3fe66e061c4'))
                        transfer2(creep, Game.getObjectById('55db34f3efa8e3fe66e061c4').pos, Game.rooms.E28N17.storage);
                    //transfer2(creep, Game.rooms.E29N17, Game.rooms.E28N17.storage);
                    break;
                case 'e23n15_reservation_worker':
                case 'e21n15_reservation_worker':
                case 'e22n16_reservation_worker':
                case 'e22n14_reservation_worker':
                    //creep.say('a')
                    var room_name = creep.memory.role.substr(0,6).toUpperCase()
                    reservation.worker(creep, room_name, Data);
                    break;
                case 'e23n15_reservation_carryer':
                case 'e21n15_reservation_carryer':
                case 'e22n16_reservation_carryer':
                case 'e22n14_reservation_carryer':
                    //creep.say('b')
                    var room_name = creep.memory.role.substr(0,6).toUpperCase()
                    reservation.carryer(creep, room_name, room_name + '_reservation_worker', Data);
                    break;
                case 'e28n17_carryer_1':
                    transfer2(creep, new RoomPosition(17,14,creep.room.name), creep.room.storage);
                    break;
                case 'e28n17_carryer_2':
                    transfer2(creep, new RoomPosition(37,44,creep.room.name), creep.room.storage);
                    break;
                case 'e23n14_war_builder':
                case 'e23n14_builder':
                case 'e24n13_war_builder':
                case 'e24n13_builder':
                case 'e25n13_war_builder':
                case 'e25n13_builder':
                case 'e22n15_war_builder':
                case 'e22n15_builder':
                case 'e28n17_war_builder':
                case 'e28n17_builder':
                    if (Data.b[creep.room.name][0] != undefined) {
                        worker(creep, creep.room.name, [{action:'build', target:Data.b[creep.room.name][0]}], creep.room.storage);
                    } else {
                        var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: function(object){
                                return (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART )
                                    && (Data.w[creep.room.name]!=undefined && object.hits < (Data.w[creep.room.name].hits+(creep.carryCapacity * 100 * Data.c[creep.memory.role].length)));
                            }
                        });
                        //creep.say(wall.hits);
                        if (Data.d[creep.room.name][0] != undefined && Data.a[creep.room.name][0] == undefined) {
                            if (wall)
                                worker(creep, creep.room.name, [{action:'repair', target:wall}], Data.d[creep.room.name][0]);
                        } else {
                            if (wall)
                                worker(creep, creep.room.name, [{action:'repair', target:wall}], creep.room.storage);
                        }
                    }

                    break;
                case 'e28n17_ext_1':
                case 'e28n17_ext_2':
                    transfer2(creep, creep.room.storage, [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_LINK]);
                    break;
                case 'e26n12_ext_1':
                case 'e26n12_ext_2':
                case 'e23n14_ext_1':
                case 'e23n14_ext_2':
                case 'e24n13_ext_1':
                case 'e24n13_ext_2':
                case 'e25n13_ext_1':
                case 'e25n13_ext_2':
                case 'e22n15_ext_1':
                case 'e22n15_ext_2':
                    transfer2(creep, creep.room.storage, [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_POWER_SPAWN, STRUCTURE_TOWER]);
                    break;
                case 'e24n13_reparier':
                case 'e23n14_repairer':
                case 'e22n15_repairer':
                case 'e25n13_repairer':
                case 'e28n17_repairer':
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
                            if (Data.d[creep.room.name][0] != undefined) {
                                worker(creep, creep.room.name, [{action:'repair', target:road}], Data.d[creep.room.name][0]);
                            } else {
                                worker(creep, creep.room.name, [{action:'repair', target:road}], creep.room.storage);
                            }
                        }
                    }
                    break;
                case 'e25n14_builder':
                case 'e24n12_builder':
                case 'e25n12_builder':
                case 'e22n14_repairer':
                case 'e22n16_repairer':
                case 'e23n15_repairer':
                case 'e21n15_repairer':
                    var room_name = creep.memory.role.substr(0,6).toUpperCase()
                    if (creep.room.name != room_name) {
                        move_to_room(creep, room_name);
                    } else {
                        if (Data.b[creep.room.name][0] !== undefined) {
                            worker(creep, creep.room.name, [{action:'build', target:Data.b[creep.room.name][0]}], creep.room);
                        } else {
                            var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: function(object){
                                    return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                                }
                            });
                            if (road) {
                                worker(creep, creep.room.name, [{action:'repair', target:road}], creep.room);
                            }
                        }
                    }
                    break;
                case 'e28n17_upgrader':
                    worker(creep, creep.room.name, [{action:'upgrade'}], creep.room);
                    break;
                case 'e28n17_harvester_1':
                    source = Game.getObjectById('55db34d0efa8e3fe66e060fe');
                    if (source.energy > 0) {
                        harvester(creep, creep.room.name, 0)
                    } else {
                        worker(creep, creep.room.name, [{action:'upgrade'}], creep.room);
                    }

                    break;
                case 'e28n17_harvester_2':
                    harvester(creep, creep.room.name, 1)
                    break;
                case 'e25n15_harvester_1':
                    e25n15.harvester(creep, '55db3467efa8e3fe66e05e0f');
                    break;
                case 'e25n15_harvester_2':
                    e25n15.harvester(creep, '55db3467efa8e3fe66e05e11');
                    break;
                case 'e25n15_harvester_3':
                    e25n15.harvester(creep, '55db3467efa8e3fe66e05e0c');
                    break;
                case 'e25n15_harvester_4':
                    e25n15.harvester(creep, '55db3467efa8e3fe66e05e0b');
                    break;
                case 'e25n15_carryer_1':
                    e25n15.carryer(creep, '55db3467efa8e3fe66e05e0f');
                    break;
                case 'e25n15_carryer_2':
                    e25n15.carryer(creep, '55db3467efa8e3fe66e05e11');
                    break;
                case 'e25n15_carryer_3':
                    e25n15.carryer(creep, '55db3467efa8e3fe66e05e0c');
                    break;
                case 'e25n15_carryer_4':
                    e25n15.carryer(creep, '55db3467efa8e3fe66e05e0b');
                    break;
                case 'e25n15_builder':
                    if (creep.room.name == 'E25N13') {
                        move_to_room(creep, 'E25N14');
                    } else if (creep.room.name == 'E25N14') {
                        move_to_room(creep, 'E25N15');
                    } else {
                        if (Data.b.E25N15[0] !== undefined) {
                            worker(creep, 'E25N15', [{action:'build', target:Data.b.E25N15[0]}], creep.room);
                        } else {
                            var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: function(object){
                                    return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                                }
                            });
                            if (road) {
                                worker(creep, 'E25N15', [{action:'repair', target:road}], creep.room);
                            }
                        }
                    }
                    break;
                case 'e24n11_builder':
                    //creep.say('building');
                    if (creep.room.name == 'E25N13') {
                        move_to_room(creep,'E25N12');
                    } else if (creep.room.name == 'E25N12') {
                        move_to_room(creep,'E24N12');
                    } else if (creep.room.name == 'E24N12') {
                        move_to_room(creep,'E24N11');
                    } else {
                        if (creep.room.controller.ticksToDowngrade < 49000) {
                            worker(creep, 'E24N11', [{action:'upgrade'}], creep.room);
                        } else {
                            if (Data.b.E24N11 != undefined && Data.b.E24N11[0] !== undefined) {
                                worker(creep, 'E24N11', [{action:'build', target:Data.b.E24N11[0]}], creep.room);
                            } else {
                                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                    filter: function(object){
                                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                                    }
                                });
                                if (road) {
                                    worker(creep, 'E24N11', [{action:'repair', target:road}], creep.room);
                                } else {
                                    min = find_min(creep.room);
                                    var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                        filter: function(object){
                                            return (object.structureType == STRUCTURE_WALL)
                                                && (object.hits < min.hits+3000)
                                            //&& object.id != '564c067e5def115d5b2af1cb';
                                        }
                                    })
                                    if (wall)
                                        worker(creep, 'E24N11', [{action:'repair', target:wall}], creep.room);
                                }
                            }
                        }
                    }
                    break;
                case 'e24n11_harvester':
                    creep.say('gogogo');
                    if (creep.room.name == 'E25N13') {
                        move_to_room(creep,'E25N12');
                    } else if (creep.room.name == 'E25N12') {
                        move_to_room(creep,'E24N12');
                    } else if (creep.room.name == 'E24N12') {
                        move_to_room(creep,'E24N11');
                    } else {
                        harvester(creep, 'E24N11', 0);
                    }
                    break;
                case 'e26n12_upgrader':
                    worker(creep, 'E26N12', [{action:'upgrade'}], creep.room.storage);
                    break;
                case 'e26n12_builder':
                    /*
                     worker(creep, 'E26N12', [{action:'repair', target:Game.getObjectById('565b1bab2b2554927268fbfb')}], creep.room.storage);
                     break;
                     */
                    if (creep.room.controller.ticksToDowngrade < 40000) {
                        worker(creep, 'E26N12', [{action:'upgrade'}], creep.room.storage);
                    } else {
                        if (Data.b.E26N12[0] !== undefined) {
                            worker(creep, 'E26N12', [{action:'build', target:Data.b.E26N12[0]}], creep.room.storage);
                        } else {
                            var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: function(object){
                                    return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax && object.pos.x<30 && object.pos.y<30;
                                }
                            });
                            if (road) {
                                //creep.say('a')
                                worker(creep, 'E26N12', [{action:'repair', target:road}], creep.room.storage);
                            } else {
                                //creep.say('b')
                                min = find_min(creep.room);
                                var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                    filter: function(object){
                                        return (object.structureType == STRUCTURE_WALL)
                                            && (object.hits <= min.hits)
                                        //&& object.id != '564c067e5def115d5b2af1cb';
                                    }
                                })
                                //creep.say(wall.pos.x + ' ' + wall.pos.y)
                                if (wall)
                                    worker(creep, 'E26N12', [{action:'repair', target:wall}], creep.room.storage);
                            }

                        }
                    }

                    break;
                case 'e26n12_harvester':
                    //harvester(creep, 'E26N12', 0);
                    harvester3(creep, Game.getObjectById('55db3490efa8e3fe66e05f49'), creep.room.storage);
                    break;
                case 'e21n14_harvester':
                    if (creep.room.name == 'E22N15') {
                        move_to_room(creep,'E21N15');
                    } else {
                        harvester(creep, 'E21N14', '0')
                    }
                    break;
                case 'e21n14_carryer':
                    if (creep.carry.energy == 0) {
                        if (creep.room.name == 'E22N15') {
                            move_to_room(creep,'E21N15');
                        } else if (creep.room.name == 'E21N15') {
                            move_to_room(creep, 'E21N14')
                        } else {
                            var EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
                            if (EN) {
                                if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(EN);
                                }
                            }
                        }
                    } else {
                        if (creep.room.name == 'E22N15') {
                            if (creep.transferEnergy(creep.room.storage) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage);
                            }
                        } else if (creep.room.name == 'E21N15') {
                            move_to_room(creep, 'E22N15')
                        } else {
                            move_to_room(creep, 'E21N15')
                        }
                    }
                    break;
                case 'e25n13_e24n13':
                    if (creep.room.name == 'E25N13') {
                        if (creep.carry.energy == 0) {
                            if (creep.ticksToLive < 100) {
                                //creep.say('$$');
                                creep.suicide()
                            } else {
                                //creep.say('$');
                                result = creep.room.storage.transferEnergy(creep);
                                creep.say(result);
                                if (result == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.storage);
                                }
                            }
                        } else {
                            move_to_room(creep, 'E25N14');
                        }
                    } else if (creep.room.name == 'E25N14') {
                        if (creep.carry.energy == 0) {
                            move_to_room(creep, 'E25N13')
                        } else {
                            move_to_room(creep, 'E24N14');
                        }
                    } else if (creep.room.name == 'E24N14') {
                        if (creep.carry.energy == 0) {
                            move_to_room(creep, 'E25N14')
                        } else {
                            move_to_room(creep, 'E24N13');
                        }
                    } else {
                        if (creep.carry.energy == 0) {
                            if (creep.ticksToLive < 200) {
                                creep.suicide()
                            } else {
                                move_to_room(creep, 'E24N14')
                            }
                        } else {
                            if (creep.transferEnergy(creep.room.storage)) {
                                creep.moveTo(creep.room.storage);
                            }
                        }
                    }
                    break;
                case 'e24n13_e23n13':
                    //creep.suicide();
                    creep.say('$$$!');
                    if (creep.room.name == 'E24N13') {
                        if (creep.carry.energy == 0) {
                            if (creep.ticksToLive < 110) {
                                creep.suicide()
                            } else {
                                if (creep.room.storage.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.storage);
                                }
                            }
                        } else {
                            move_to_room(creep, 'E23N13');
                        }
                    } else {
                        if (creep.carry.energy == 0) {
                            if (creep.ticksToLive < 220) {
                                creep.suicide()
                            } else {
                                move_to_room(creep, 'E24N13')
                            }
                        } else {
                            if (creep.pos.isNearTo(32,7)) {
                                creep.dropEnergy();
                            } else {
                                creep.moveTo(32,7);
                            }
                            /*
                             if (creep.transferEnergy(creep.room.storage)) {
                             creep.moveTo(creep.room.storage);
                             }
                             */
                        }
                    }
                    break;
                case 'e24n13_e23n14':
                    creep.say('$$$');
                    if (creep.room.name == 'E24N13') {
                        if (creep.carry.energy == 0) {
                            if (creep.ticksToLive < 110) {
                                creep.suicide()
                            } else {
                                if (creep.room.storage.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.storage);
                                }
                            }
                        } else {
                            move_to_room(creep, 'E23N13');
                        }
                    } else if (creep.room.name == 'E23N13') {
                        if (creep.carry.energy == 0) {
                            move_to_room(creep, 'E24N13')
                        } else {
                            move_to_room(creep, 'E23N14');
                        }
                    } else {
                        if (creep.carry.energy == 0) {
                            if (creep.ticksToLive < 220) {
                                creep.suicide()
                            } else {
                                move_to_room(creep, 'E23N13')
                            }
                        } else {
                            if (creep.transferEnergy(creep.room.storage)) {
                                creep.moveTo(creep.room.storage);
                            }
                        }
                    }
                    break;
                case 'e22n15_e23n14':
                    creep.say('$$');
                    if (creep.carry.energy == 0) {
                        if (creep.room.name != 'E22N15') {
                            move_rooms(creep, ['E23N14', 'E23N15', 'E22N15'])
                        } else {
                            if (creep.room.storage.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage);
                            }
                        }
                    } else {
                        if (creep.room.name != 'E23N14') {
                            move_rooms(creep, ['E22N15', 'E23N15', 'E23N14'])
                        } else {
                            if (creep.transferEnergy(creep.room.storage) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage);
                            }
                        }
                    }
                    break;
                case 'e23n14_e24n13':
                    creep.say('$$');
                    if (creep.carry.energy == 0) {
                        if (creep.room.name != 'E23N14') {
                            move_rooms(creep, ['E24N13', 'E23N13', 'E23N14'])
                        } else {
                            if (creep.room.storage.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage);
                            }
                        }
                    } else {
                        if (creep.room.name != 'E24N13') {
                            move_rooms(creep, ['E23N14', 'E23N13', 'E24N13'])
                        } else {
                            if (creep.transferEnergy(creep.room.storage) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage);
                            }
                        }
                    }
                    break;
                case 'e24n13_e24n12':
                    creep.say('$$');
                    if (creep.carry.energy == 0) {
                        if (creep.room.name != 'E24N13') {
                            move_rooms(creep, ['E24N12', 'E24N13'])
                        } else {
                            if (creep.room.storage.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage);
                            }
                        }
                    } else {
                        if (creep.room.name != 'E24N12') {
                            move_rooms(creep, ['E24N13', 'E24N12'])
                        } else {

                            if (creep.transferEnergy(creep.room.storage) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage);
                            }
                            /*
                             if (!creep.pos.isEqualTo(27,8)) {
                             creep.moveTo(27,8);
                             } else {
                             creep.dropEnergy();
                             }
                             */
                        }
                    }
                    break;
                case 'e25n13_e24n12':
                    creep.say('$$');
                    if (creep.carry.energy == 0) {
                        if (creep.room.name != 'E25N13') {
                            move_rooms(creep, ['E24N12', 'E25N12', 'E25N13'])
                        } else {
                            if (creep.room.storage.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage);
                            }
                        }
                    } else {
                        if (creep.room.name != 'E24N12') {
                            move_rooms(creep, ['E25N13', 'E25N12', 'E24N12'])
                        } else {
                            if (creep.transferEnergy(creep.room.storage) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage);
                            }
                            /*
                             if (!creep.pos.isEqualTo(27,8)) {
                             creep.moveTo(27,8);
                             } else {
                             creep.dropEnergy();
                             }
                             */
                        }
                    }
                    break;
                case 'e23n14_e22n15':
                    creep.say('$$');
                    if (creep.room.name == 'E23N14') {
                        if (creep.carry.energy == 0) {
                            if (creep.ticksToLive < 80) {
                                creep.suicide()
                            } else {
                                if (creep.room.storage.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.storage);
                                }
                            }
                        } else {
                            move_to_room(creep, 'E23N15');
                        }
                    } else if (creep.room.name == 'E23N15') {
                        if (creep.carry.energy == 0) {
                            move_to_room(creep, 'E23N14')
                        } else {
                            move_to_room(creep, 'E22N15');
                        }
                    } else {
                        if (creep.carry.energy == 0) {
                            if (creep.ticksToLive < 150) {
                                creep.suicide()
                            } else {
                                move_to_room(creep, 'E23N15')
                            }
                        } else {
                            if (creep.transferEnergy(creep.room.storage)) {
                                creep.moveTo(creep.room.storage);
                            }
                        }
                    }
                    break;
                case 'e24n14_dragon_killer_1':
                    dragon_killer.killer(creep, 'E24N13', 'E24N14', '55db3447efa8e3fe66e05cf2');
                    break;
                case 'e24n14_harvester_1':
                    dragon_killer.harvester(creep, 'E24N13', 'E24N14', '55db3447efa8e3fe66e05cf2', '55db3447efa8e3fe66e05cf3', 22, 47);
                    break;
                case 'e24n14_carryer_1':
                    dragon_killer.carryer(creep, 'E24N13', 'E24N14', '55db3447efa8e3fe66e05cf2', 22, 47);
                    break;
                case 'e24n14_dragon_killer_2':
                    dragon_killer.killer(creep, 'E24N13', 'E24N14', '55db3447efa8e3fe66e05cf0');
                    break;
                case 'e24n14_harvester_2':
                    dragon_killer.harvester(creep, 'E24N13', 'E24N14', '55db3447efa8e3fe66e05cf0', '55db3447efa8e3fe66e05cf1', 25, 44);
                    break;
                case 'e24n14_carryer_2':
                    dragon_killer.carryer(creep, 'E24N13', 'E24N14', '55db3447efa8e3fe66e05cf0', 25, 44);
                    break;
                case 'e25n14_dragon_killer_1':
                    dragon_killer.killer(creep, 'E25N13', 'E25N14', '55db3468efa8e3fe66e05e1a');
                    break;
                case 'e25n14_harvester_1':
                    dragon_killer.harvester(creep, 'E25N13', 'E25N14', '55db3468efa8e3fe66e05e1a', '55db3468efa8e3fe66e05e19', 29, 47);
                    break;
                case 'e25n14_carryer_1':
                    dragon_killer.carryer(creep, 'E25N13', 'E25N14', '55db3468efa8e3fe66e05e1a', 29, 47);
                    break;
                case 'attacker':
                    soldier(creep);
                    break;
                case 'nurse':
                    nurse(creep, Game.flags.Flag1);
                    break;
                case 'e22n15_guard':
                case 'guard':
                    soldier(creep);
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
                    transfer2(creep, Game.rooms.E23N13, Game.rooms.E23N15.storage);
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
                case 'e24n13_upgrader':
                    worker(creep, 'E24N13', [{action:'upgrade'}],  null);
                    break;
                case 'e24n13_upgrader_recharger':
                    transfer2(creep, Game.rooms.E24N13.storage, STRUCTURE_LINK);
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
                    transfer2(creep, creep.room.storage, STRUCTURE_LINK);
                    break;
                case 'e25n12_harvester':
                    harvester(creep, 'E25N12', 0);
                    break;
                case 'e25n12_carryer':
                    //transfer2(creep, Game.rooms.E25N12, Game.getObjectById('563707dc3ff735a878e1baea'));
                    transfer2(creep, Game.rooms.E25N12, Game.rooms.E25N13.storage);
                    break;
                case 'e22n15_left_guard':
                    //creep.suicide();
                    left_ramparts = [
                        Game.getObjectById('56414fefea8c65cf5f0514a1'),
                        Game.getObjectById('563da0a410e22baa19c8dd5d'),
                        Game.getObjectById('56414fe3b17dfb915f4b8f95')
                    ];
                    guard(creep, left_ramparts);
                    break;
                case 'e22n15_bottom_guard':
                    //creep.suicide();
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
                    harvester3(creep, Game.getObjectById('55db33ffefa8e3fe66e05b45'), Game.rooms.E22N15.storage);
                    break;
                case 'e22n15_harvester_2':
                    harvester3(creep, Game.getObjectById('55db33ffefa8e3fe66e05b44'), Game.rooms.E22N15.storage);
                    break;
                case 'e22n15_upgrader':
                    worker(creep, 'E22N15', [{action:'upgrade'}], null);
                    break;
                case 'e22n15_upgrader_recharger':
                    transfer2(creep, creep.room.storage, STRUCTURE_LINK);
                    break;
                case 'e22n14_harvester_1':
                    harvester(creep, 'E22N14', 0);
                    break;
                case 'e22n14_carryer_1':
                    transfer2(creep, Game.rooms.E22N14, Game.rooms.E22N15.storage);
                    break;
                case 'e22n16_harvester_1':
                    harvester(creep, 'E22N16', 0);
                    break;
                case 'e22n16_carryer_1':
                    transfer2(creep, Game.rooms.E22N16, Game.rooms.E22N15.storage);
                    break;
                case 'e21n15_harvester_1':
                    harvester(creep, 'E21N15', 1);
                    break;
                case 'e21n15_carryer_1':
                    if (Game.getObjectById('55db33ddefa8e3fe66e05a7f'))
                        transfer2(creep, Game.getObjectById('55db33ddefa8e3fe66e05a7f').pos, Game.rooms.E22N15.storage);
                    break;
                case 'e21n15_harvester_2':
                    harvester(creep, 'E21N15', 0);
                    break;
                case 'e21n15_carryer_2':
                    if (Game.getObjectById('55db33ddefa8e3fe66e05a7d'))
                        transfer2(creep, Game.getObjectById('55db33ddefa8e3fe66e05a7d').pos, Game.rooms.E22N15.storage);
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
        room_e23n14(Data);
        room_e24n13(Data);
        room_e25n13(Data);
        room_e22n15(Data);
        room_e28n17(Data);
        room_e26n12(Data);

        clear_memory();

        if (debug)
            console.log('1:' + Game.getUsedCpu());
    } else if (Data.mode == MODE_SIMULATION) {
        console.log('i am in MODE_SIMULATION')
    }
}
