/*
 * the harvester in other room
 *
 * todo : carry energy to home if no picker
 */
var debug = false;
var move_to_room =  require('helper.move_to_room2');
module.exports = function (creep, to_room, source_no) {
    if (debug)
        cpu_usage = Game.getUsedCpu();
    if (creep.room.name == to_room) {
        //creep.say(1);
        var sources = creep.room.find(FIND_SOURCES);
        //if(creep.carry.energy < creep.carryCapacity) {
        // harvest
        if(creep.harvest(sources[source_no]) == ERR_NOT_IN_RANGE) {
            // move to energy
            creep.moveTo(sources[source_no]);
        }
        //} else {
        // drop energy
        //creep.dropEnergy();
        //}
    } else {
        //creep.say(1);
        // move to the target room
        move_to_room(creep, to_room);
        //var pos = new RoomPosition(20, 20, to_room);
        //creep.moveTo(pos) ;
    }
    if (debug) {
        cpu_usage2 = Game.getUsedCpu() - cpu_usage;
        if (cpu_usage2 > 1)
            console.log(creep.memory.role + ' cpu used:' + cpu_usage2);
    }
}