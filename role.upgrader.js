/*
 * 升级机器人
 */
module.exports = function (creep) {
    if(creep.room.controller) {
        if(creep.carry.energy == 0) {
            var spwn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
            creep.moveTo(spwn);
            if((spwn) > [199]) {
                spwn.transferEnergy(creep);
            }
            creep.say('rg: 我没钱了！');
        }else{
            result = creep.upgradeController(creep.room.controller);
            if (result == OK) {
                creep.say('rg:升升升！');
            } else if(result == ERR_NOT_IN_RANGE) {
                creep.say('rg:跑去升！');
                creep.moveTo(creep.room.controller);
            } else {
                creep.say('rg error:' + result);
            }
        }
    } else {
        creep.say('rg:no controller');
    }

};
