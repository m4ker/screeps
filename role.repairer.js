/*
 * 维修机器人
 */
module.exports = function (creep, sc) {
    if(creep.carry.energy == 0) {
        if (sc) {
            if (sc.structureType != undefined && sc.structureType == STRUCTURE_STORAGE) {
                // from storage
                creep.moveTo(sc);
                sc.transferEnergy(creep);
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
        } else {
            // from spwn
            //var spwn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
            var spwn = Game.spawns.Azeroth;
            creep.moveTo(spwn);
            if((spwn) > [199]) {
                spwn.transferEnergy(creep);
            }
        }
    }else{
        /*
         var SR = creep.room.find(FIND_MY_STRUCTURES, {
         filter: function(object){
         if(object.hits < object.hitsMax) {
         return true;
         }
         return false;
         }
         });
         */
        //if (SR.length == 0) {
        var SR = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(object){
                if(object.structureType != STRUCTURE_ROAD ) {
                    return false;
                }
                if(object.hits < object.hitsMax) {
                    return true;
                }
                return false;
            }
        });
        //}
        result = creep.repair(SR);
        if (result == OK) {
            //creep.say('rp:working！');
        } else if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(SR);
            //creep.say('rp: go！');
        } else if (result == ERR_INVALID_TARGET) {
            creep.moveTo(24,26);
        } else {
            //console.log(SR.structureType);
            creep.say('rp:' + result);
        }
    }
};