/*
 * 维修机器人
 */
 module.exports = function (creep) {

    if(creep.carry.energy == 0) {
        var spwn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
        creep.moveTo(spwn);
        if((spwn) > [199]) {
            spwn.transferEnergy(creep);
        }
        creep.say('rp:我没钱了！');
    }else{
        var SR = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                   filter: function(object){
                       if(object.structureType != STRUCTURE_ROAD ) {
                           return false;
                       }
                       if(object.hits > object.hitsMax * 0.9) {
                        return false;
                      }
                       return true;
                   } 
        });     
        result = creep.repair(SR);
        if (result == OK) {
            creep.say('rp:修修修！');
        } else if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(SR);
            creep.say('rp:跑去修！');
        } else {
            //console.log(SR.structureType);
            creep.say('rp:' + result);
        }
    } 
};
