/*
 * 建设工种
 */
 module.exports = function (creep) {
    if(creep.carry.energy == 0) {
        if(Game.spawns.Azeroth.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns.Azeroth);
            creep.say('bd:我没能量了！');
        }
    } else {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            result = creep.build(targets[0]);
            if (result == OK) {
                creep.say('bd:造造造！');
            } else if(result == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                creep.say('bd:跑去造！');
            }
        }
    }
}
