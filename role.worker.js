/*
 * 工人
 * worker
 * todo: 代替 harvester
 */
module.exports = function (creep, room, works, energy) {
    /*
     energy: storage, energy, null

     works: [
     {
     action:repair,
     target:structure
     },
     {
     action:build,
     target:construct_site
     }
     ]
     */
    if (creep.carry.energy == 0) {
        //creep.say(1);
        if (energy instanceof Structure) {
            if (energy.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(energy);
            }
        } else if (energy instanceof Room) {
            // find and pickup
            //if (creep.room.name == room.name){
            var EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if (EN) {
                if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(EN);
                }
            }
            //} else {
            //creep.moveTo(RoomPosition(1,1,room.name));
            //}
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
            if (creep.memory.role == 'upgrader' && !creep.pos.isNearTo(creep.room.controller)) {
                creep.moveTo(creep.room.controller);
            }
        }
    } else {
        //console.log(creep.memory.role);
        if (creep.room.name == room.name) {
            // go to work
            for (i in works) {
                if (works[i].action == 'build') {
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(targets.length) {
                        result = creep.build(targets[0]);
                        if (result == OK) {
                            //creep.say('bd:working！');
                        } else if(result == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                    }
                } else if (works[i].action == 'repair') {
                    result = creep.repair(works[i].target);
                    if (result == OK) {
                    } else if (result == ERR_NOT_IN_RANGE) {
                        creep.moveTo(works[i].target);
                    } else {
                        //creep.say(result);
                    }
                    break;
                } else if (works[i].action == 'upgrade') {
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                    break;
                }
            }
        } else {
            // go to room
            creep.moveTo(new RoomPosition(1,1,room.name));
        }
    }
}