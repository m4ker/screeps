/*
 * 维修机器人
 */
module.exports = function (creep, sc, min) {

    if(creep.carry.energy == 0) {
        if (sc) {
                var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
                    filter:function(object){
                        if (object.pos.x == sc.pos.x && object.pos.y == sc.pos.y) {
                            return true;
                        }
                        return false;
                    }
                });
                result = creep.pickup(target);
                //console.log(result);
                if (result != OK) {
                    creep.moveTo(target);
                }
        } else {
                //var spwn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
                var spwn = Game.spawns.Azeroth;
                creep.moveTo(spwn);
                if((spwn) > [199]) {
                    spwn.transferEnergy(creep);
                }
        }
        creep.say('rb:$$$?');
    }else{
        
        var SR = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                   filter: function(object){
                        if(object.structureType != STRUCTURE_RAMPART ) {
                            return false;
                        }
                        //if(object.hits < object.hitsMax) {
                        if(object.hits <= min.hits + 10000) {
                            return true;
                        }
                        return false;
                   } 
        }); 
        
        //var SR = min;
        result = creep.repair(SR);
        if (result == OK) {
            creep.say('rb:ing...');
        } else if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(SR);
            creep.say('rb:go！');
        } else {
            //console.log(SR.structureType);
            creep.say('rb:' + result);
        }
    } 
};
