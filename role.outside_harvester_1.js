/**
 * Created by maker on 15/10/19.
 */
/*
 *
 */
module.exports = function (creep) {
    //f = 'E23N14';
    to_room   = 'E23N13';
    source_no = 0;

    if (creep.room.name == to_room) {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.carry.energy < creep.carryCapacity) {
            if(creep.harvest(sources[source_no]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[source_no]);
            }
        } else {
            creep.dropEnergy();
        }
    } else {
        var pos = new RoomPosition(20, 20, to_room);
        creep.moveTo(pos) ;
    }
}