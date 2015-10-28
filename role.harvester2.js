/*
 * the harvester in other room
 *
 * todo : carry energy to home if no picker
 */
var move_to_room =  require('helper.move_to_room');
module.exports = function (creep, source) {
    cpu_usage = Game.getUsedCpu();
    if (creep.room.name == source.room.name) {
        if(creep.carry.energy < creep.carryCapacity) {
            // harvest
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move to energy
                creep.moveTo(source);
            }
        } else {
            // drop energy
            creep.dropEnergy();
        }
    } else {
        // move to the target room
        move_to_room(creep, source.room.name);
    }
    cpu_usage2 = Game.getUsedCpu() - cpu_usage;
    if (cpu_usage2 > 1)
        console.log(creep.memory.role + ' cpu used:' + cpu_usage2);
}