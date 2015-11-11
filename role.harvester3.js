module.exports = function (creep, source, storage) {
    if (creep.carry.energy < creep.carryCapacity) {
        if (creep.room.name == source.room.name) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            move_to_room(creep, source.room);
        }
    } else {
        if (creep.room.name == source.room.name) {
            if (creep.transferEnergy(storage) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        } else {
            move_to_room(creep, storage.room);
        }
    }
}