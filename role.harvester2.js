/*
 * 矿工v2 只采集资源1
 */
module.exports = function (creep) {
    var sources = creep.room.find(FIND_SOURCES);
    if(creep.carry.energy < creep.carryCapacity) {
        if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1]);
        }
    } else {
        creep.dropEnergy();
    }
}