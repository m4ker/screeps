/*
 * 基地补给
 */
module.exports = function (creep, sc) {
        if(creep.carry.energy < creep.carryCapacity) {
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
        }else{
            var spwn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
            if (spwn.energy == spwn.energyCapacity)
                return;
            if(creep.transferEnergy(spwn) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spwn);
            }
        }
};
