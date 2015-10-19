/*
 * ext补给
 */
module.exports = function (creep, sc) {
    if(creep.carry.energy < creep.carryCapacity) {
        if (sc) {
            if (sc.structureType != undefined && sc.structureType == STRUCTURE_STORAGE) {
                // from storage
                creep.moveTo(sc);
                spwn.transferEnergy(creep);
            } else {
                // from sc
                var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
                    filter:function(object){
                        if (object.pos.x == sc.pos.x && object.pos.y == sc.pos.y) {
                            return true;
                        }
                        return false;
                    }
                });
                result = creep.pickup(target);
                if (result != OK) {
                    creep.moveTo(target);
                }
            }
        }
    }else{
        var SR = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(object){
                if(object.structureType != STRUCTURE_EXTENSION) {
                    return false;
                }
                if(object.energy < object.energyCapacity) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        if(SR){
            if(creep.transferEnergy(SR) == ERR_NOT_IN_RANGE) {
                creep.moveTo(SR);
            }
        }
    }
};