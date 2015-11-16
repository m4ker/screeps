/*
 * 工人
 * worker
 */
var debug = false;
var move_to_room =  require('helper.move_to_room2');
module.exports = function (creep, room, works, energy) {
    if (debug)
        cpu_usage = Game.getUsedCpu();
    if (creep.carry.energy == 0) {
        if (energy instanceof Structure) {
            if (energy.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                if (energy.room.name != creep.room.name) {
                    move_to_room(creep, energy.room.name);
                } else {
                    creep.moveTo(energy);
                }
            }
        } else if (energy instanceof Room) {
            // find and pickup
            var EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if (EN) {
                if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(EN);
                }
            }
        } else if (energy instanceof RoomPosition) {
            // find and pickup
            var EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
                filter:function(o){
                    return o.pos.isNearTo(energy);
                }
            });
            if (EN) {
                if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(EN);
                }
            }
        } else {
            // do nothing
            // 写到这里是不对的，应该增加闲置行为的参数
            if ((
                    creep.memory.role == 'e24n13_upgrader'
                    ||creep.memory.role == 'e23n14_upgrader'
                    ||creep.memory.role == 'e25n13_upgrader'
                    ||creep.memory.role == 'e22n15_upgrader'
                ) && !creep.pos.isNearTo(creep.room.controller)) {
                creep.moveTo(creep.room.controller);
            }
        }
    } else {
        //console.log(creep.memory.role);
        if (creep.room.name == room) {
            // go to work
            for (i in works) {
                if (works[i].action == 'build') {
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(targets.length) {
                        if (targets[0].room.name == creep.room.name) {
                            result = creep.build(targets[0]);
                            if (result == OK) {
                                //creep.say('bd:working！');
                            } else if(result == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets[0]);
                            }
                        } else {
                            move_to_room(creep, targets[0].room.name);
                        }
                    }
                } else if (works[i].action == 'repair') {
                    //creep.say(11);
                    if (creep.room.name == works[i].target.room.name) {
                        result = creep.repair(works[i].target);
                        //creep.say(result);
                        if (result == OK) {
                        } else if (result == ERR_NOT_IN_RANGE) {
                            creep.moveTo(works[i].target);
                        } else {
                            //creep.say(result);
                        }
                    } else {
                        move_to_room(creep, works[i].target.room.name);
                    }
                    break;
                } else if (works[i].action == 'upgrade') {
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                    break;
                } else if (works[i].action == 'harvest') {
                    if (creep.room.name == works[i].target.room.name) {
                        if (creep.harvest(works[i].target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(works[i].target);
                        }
                    } else {
                        move_to_room(creep, works[i].target.room.name);
                    }
                    break;
                }
            }
        } else {
            move_to_room(creep, room);
        }
    }
    if(debug) {
        cpu_usage2 = Game.getUsedCpu() - cpu_usage;
        if (cpu_usage2 > 1)
            console.log(creep.memory.role + ' cpu used:' + cpu_usage2);
    }
}