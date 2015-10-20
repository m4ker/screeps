/*
 * transfer energy
 *     ex:
 *          Structure / RoomPosition / Room => Structure / StructureType / RoomPosition / Creep
 *
 */
module.exports = function (creep, from, to) {
    if (creep.carry.energy == 0) {
        if (from instanceof Structure) {
            // from a structure
            if (from.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(from);
            }
        } else if (from instanceof RoomPosition) {
            // todo: from drop energy 
            if (creep.room.name != from.roomName) {
                creep.moveTo(from);
            } else {
                // find and pickup
                var EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
                    filter:function(object) {
                        return object.pos.isNearTo(from) && object.energy > creep.carryCapacity;
                    }
                });
                if (EN) {
                    if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(EN);
                    }
                }
            }
        } else if (from instanceof Room) {
            // from drop energy 
            if (creep.room.name != from.name) {
                rp = new RoomPosition(1,1,from.name)
                creep.moveTo(rp);
            } else {
                // find and pickup
                var EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
                if (EN) {
                    if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(EN);
                    }
                }
            }
        }
    } else {

        // on the way to transfer
        if (to instanceof Structure || to instanceof Spawn || to instanceof Creep ) {
            if (creep.transferEnergy(to) == ERR_NOT_IN_RANGE) {
                creep.moveTo(to);
            }
        } else if (to instanceof RoomPosition) {
            // drop energy
            if (creep.pos.isEqualTo(to)) {
                creep.dropEnergy();
            } else {
                creep.moveTo(to);
            }
        } else {
            var SR = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: function(object){
                    if(object.structureType != to) {
                        return false;
                    }
                    if(object.energy < object.energyCapacity) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });
            if(creep.transferEnergy(SR) == ERR_NOT_IN_RANGE) {
                creep.moveTo(SR);
            }
        }
    }
};