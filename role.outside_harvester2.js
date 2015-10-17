/*
 * 采集
 */
module.exports = function (creep) {
    if (creep.room.name == 'E23N14') {
        if (creep.carry.energy > 0) {
            if(creep.pos.x==24 && creep.pos.y==16) {
                creep.dropEnergy();
            } else {
                creep.moveTo(24, 16);
            }
        } else {
            var pos = new RoomPosition(1, 1, 'E23N15');
            creep.moveTo(pos) ;
        }
    } else {
        if (creep.carry.energy < creep.carryCapacity) {
            sources = creep.room.find(FIND_SOURCES);
            source = sources[parseInt(creep.name.charAt(creep.name.length-2) + creep.name.charAt(creep.name.length-1))%sources.length];
            result = creep.harvest(source);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            var pos = new RoomPosition(1, 1, 'E23N14');
            creep.moveTo(pos) ;
        }
    }
};
