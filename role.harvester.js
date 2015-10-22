/*
 * the harvester in other room
 *
 * todo : carry energy to home if no picker
 */

module.exports = function (creep, to_room, source_no) {
    cpu_usage = Game.getUsedCpu();
    if (creep.room.name == to_room) {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.carry.energy < creep.carryCapacity) {
            // harvest
            if(creep.harvest(sources[source_no]) == ERR_NOT_IN_RANGE) {
                // move to energy
                creep.moveTo(sources[source_no]);
            }
        } else {
            // drop energy
            creep.dropEnergy();
        }
    } else {
        // move to the target room
        //move_to_room(creep, Game.rooms[to_toom]);
        var pos = new RoomPosition(20, 20, to_room);
        creep.moveTo(pos) ;
    }
    cpu_usage2 = Game.getUsedCpu() - cpu_usage;
    if (cpu_usage2 > 1)
        console.log(creep.memory.role + ' cpu used:' + cpu_usage2);
}