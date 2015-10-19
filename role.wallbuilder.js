/*
 * 维修机器人
 */
module.exports = function (creep, sc, min) {
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
        creep.say('wb:$$$?');
    }else{

        var SR = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(object){
                if(object.structureType != STRUCTURE_WALL ) {
                    return false;
                }
                //if(object.hits < object.hitsMax) {
                max = creep.carryCapacity*100;
                if(object.hits < min.hits+max) {
                    return true;
                }
                return false;
            }
        });

        result = creep.repair(SR);
        if (result == OK) {
            creep.say('wb:ing...');
        } else if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(SR);
            creep.say('wb:go！');
        } else {
            //console.log(SR.structureType);
            creep.say('wb:' + result);
        }
    }
};