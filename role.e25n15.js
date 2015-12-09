/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.e25n15_carryer'); // -> 'a thing'
 */
var move_to_room = require('helper.move_to_room2');
var transfer = require('role.transfer2');
module.exports = {
    harvester:function(creep, source_id){
        if (creep.room.name == 'E25N13') {
            move_to_room(creep, 'E25N14');
        } else if (creep.room.name == 'E25N14') {
            move_to_room(creep, 'E25N15');
        } else {
            if (creep.harvest(Game.getObjectById(source_id)) == ERR_NOT_IN_RANGE)
                creep.moveTo(Game.getObjectById(source_id))
        }
    },
    carryer:function(creep, source_id) {

        if (creep.room.name == 'E25N13') {
            if (creep.carry.energy == 0) {
                move_to_room(creep, 'E25N14');
            } else {
                transfer(creep, creep.room, creep.room.storage);
            }
        } else if (creep.room.name == 'E25N14') {
            if (creep.carry.energy == 0) {

                move_to_room(creep, 'E25N15');
            } else {
                move_to_room(creep, 'E25N13');
            }
        } else {
            //console.log(creep.name + ' ' + creep.room.name)
            if (creep.carry.energy < creep.carryCapacity) {
                // find source
                var en = Game.getObjectById(source_id).pos.findInRange(FIND_DROPPED_ENERGY, 5, {
                    filter:function(o) {
                        return o.energy > 100;
                    }
                });
                //console.log(creep.memory.role.charAt(15),en)
                //creep.say(en[0])
                if (en[0] != undefined) {
                    if (creep.pickup(en[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(en[0]);
                    }
                }
            } else {
                //console.log(creep.name + ' ' + creep.room.name + '  ' + creep.carry.energy+ '  ' + creep.carryCapacity)
                move_to_room(creep, 'E25N14');
            }
        }
    }
};