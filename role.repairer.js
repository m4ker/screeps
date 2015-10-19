/*
 * 升级机器人
 */
module.exports = function (creep, sc) {
    if(creep.room.controller) {
        if(creep.carry.energy == 0) {
            creep.say('$?');
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
        }else{
            result = creep.upgradeController(creep.room.controller);
            if (result == OK) {
                creep.say('rg:ing...');
            } else if(result == ERR_NOT_IN_RANGE) {
                creep.say('rg:go！');
                creep.moveTo(creep.room.controller);
            } else {
                creep.say('rg error:' + result);
            }
        }
    } else {
        //creep.say('rg:no controller');
    }

};