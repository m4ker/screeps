/*
 * 矿工v2 只采集资源0
 */
module.exports = function (creep) {
    var sources = creep.room.find(FIND_SOURCES);
    if(creep.carry.energy < creep.carryCapacity) {
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    } else {
        creep.dropEnergy();
    }
}