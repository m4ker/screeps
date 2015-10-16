/*
 * carryer用来给ext补充energy
 * 目前已经使用harvester代替
 */
 module.exports = function (creep) {
    var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
    var structures = creep.room.find(FIND_MY_STRUCTURES);
    for( i in structures) {
        if (structures[i].structureType == STRUCTURE_EXTENSION) {
            if (structures[i].energy < structures[i].energyCapacity) {
                if(creep.carry.energy == 0) {
                    if(spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(spawn);
                        creep.say('bd:我没能量了！');
                        console.log('carryer working');
                    }
                } else {
                    if(creep.transferEnergy(structures[i]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structures[i]);
                        console.log('carryer working done');
                    }
                }
                break;
            }
        }
    }
}
