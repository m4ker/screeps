/*
 * 
 */
module.exports = function (creep) {
    from_room = 'E23N14';
    storage_no = 0;
    to_room   = 'E23N13';
    source_no = 0;
    //console.log(creep.name + ':' + creep.fatigue);
    if (creep.room.name == to_room) {
        if(creep.carry.energy < creep.carryCapacity) {
            // pickup
            var EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if (EN) {
                if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(EN);
                }
            }
        } else {
            // go home
            var to_pos = new RoomPosition(1, 1, from_room);
            creep.moveTo(to_pos);

        }
    } else {
        if(creep.carry.energy == 0) {
            // on the way
            var to_pos = new RoomPosition(20, 20, to_room);
            creep.moveTo(to_pos);
        } else {
            // storge
            var SR = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(object){
                    if(object.structureType == STRUCTURE_STORAGE) {
                        return true;
                    }
                    return false;
                }
            });
            if (creep.transferEnergy(SR) == ERR_NOT_IN_RANGE) {
                creep.moveTo(SR);
            }
        }
    }
    //console.log(creep.name + ':' + creep.fatigue);
}