/*
 * transfer energy
 *     ex:
 *          Structure / RoomPosition / Room => Structure / StructureType / RoomPosition / Creep
 *
 */
var move_to_room =  require('helper.move_to_room');
module.exports = function (creep, from, to) {

    if (creep.carry.energy == 0) {
        if (from instanceof Structure) {
            // from a structure
            cpu_usage = Game.getUsedCpu();
            if (from.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(from);
            }
            cpu_usage2 = Game.getUsedCpu() - cpu_usage;
            if (cpu_usage2 > 1)
                console.log(creep.memory.role + ' p1 cpu used:' + cpu_usage2);
        } else if (from instanceof RoomPosition) {
            // from drop energy 
            cpu_usage = Game.getUsedCpu();
            //console.log(creep.memory.role);
            //console.log(creep.room.name );
            //console.log(from.roomName );
            if (creep.room.name
                != from.roomName) {
                //creep.moveToRoom(from);
                //creep.moveTo(from);
                move_to_room(creep, Game.rooms[from.roomName]);
            } else {
                // find and pickup
                var EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
                    filter:function(object) {
                        return object.pos.isNearTo(from) && object.energy > creep.carryCapacity;
                    }
                });
                if (EN) {
                    if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(EN);
                    }
                }
            }
            cpu_usage2 = Game.getUsedCpu() - cpu_usage;
            if (cpu_usage2 > 1)
                console.log(creep.memory.role + ' p2 cpu used:' + cpu_usage2);
        } else if (from instanceof Room) {

            // from drop energy 
            if (creep.room.name != from.name) {
                cpu_usage = Game.getUsedCpu();

                //creep.moveToRoom(from);
                move_to_room(creep, from);

                cpu_usage2 = Game.getUsedCpu() - cpu_usage;
                if (cpu_usage2 > 1)
                    console.log(creep.memory.role + ' p3.1 cpu used:' + cpu_usage2);
            } else {
                cpu_usage = Game.getUsedCpu();

                // find and pickup
                var EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
                if (EN) {
                    if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(EN);
                    }
                }

                cpu_usage2 = Game.getUsedCpu() - cpu_usage;
                if (cpu_usage2 > 1)
                    console.log(creep.memory.role + ' p3.2 cpu used:' + cpu_usage2);
            }

        }
    } else {
        // on the way to transfer
        if (to instanceof Structure || to instanceof Spawn || to instanceof Creep ) {
            cpu_usage = Game.getUsedCpu();
            //if (creep.transferEnergy(to) == ERR_NOT_IN_RANGE) {
            //    creep.moveTo(to);
            //}
            if (creep.room.name == to.room.name) {
                //if (creep.name == 'test') console.log('A');
                if (creep.transferEnergy(to) == ERR_NOT_IN_RANGE) {
                    //if (creep.name == 'test') console.log('B');
                    creep.moveTo(to);
                }
            } else {
                //if (creep.name == 'test') console.log('C');
                //creep.moveToRoom(to.room);
                move_to_room(creep, to.room);
            }
            cpu_usage2 = Game.getUsedCpu() - cpu_usage;
            if (cpu_usage2 > 1)
                console.log(creep.memory.role + ' p4 cpu used:' + cpu_usage2);
        } else if (to instanceof RoomPosition) {
            cpu_usage = Game.getUsedCpu();
            // drop energy
            if (creep.pos.isEqualTo(to)) {
                creep.dropEnergy();
            } else {
                creep.moveTo(to);
            }
            cpu_usage2 = Game.getUsedCpu() - cpu_usage;
            if (cpu_usage2 > 1)
                console.log(creep.memory.role + ' p5 cpu used:' + cpu_usage2);
        } else {
            cpu_usage = Game.getUsedCpu();
            var SR = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: function(object){
                    if(object.structureType != to) {
                        return false;
                    }
                    if(object.energy < object.energyCapacity) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });

            if(creep.transferEnergy(SR) == ERR_NOT_IN_RANGE) {
                creep.moveTo(SR);
            }
            cpu_usage2 = Game.getUsedCpu() - cpu_usage;
            if (cpu_usage2 > 1)
                console.log(creep.memory.role + ' p6 cpu used:' + cpu_usage2);
        }
    }

};