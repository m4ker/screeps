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
        var sources = creep.room.find(FIND_SOURCES);
        //console.log(sources[source_no]);

        if(creep.carry.energy < creep.carryCapacity) {
            if (creep.name == 'h957')console.log('a')
            // harvest
            result=creep.harvest(sources[source_no])
            //console.log(creep.name + ' ' + result);
            if(result == ERR_NOT_IN_RANGE) {
                // move to energy
                creep.moveTo(sources[source_no]);
            }
        } else {
            if (creep.name == 'h957')console.log('b')
            // drop energy
            creep.dropEnergy();
        }
    } else {
        // move to the target room
        move_to_room(creep, to_room);
    }
    if (debug) {
        cpu_usage2 = Game.getUsedCpu() - cpu_usage;
        if (cpu_usage2 > 1)
            console.log(creep.memory.role + ' cpu used:' + cpu_usage2);
    }
}