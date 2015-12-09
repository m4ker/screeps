/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.take_room'); // -> 'a thing'
 */
var move_rooms = require('helper.move_rooms');
var worker = require('role.worker2')
module.exports = {
    builder : function (creep, to, rms, Data) {
        if (creep.room.name != to) {
            move_rooms(creep, rms);
        } else {
            if (!creep.room.controller.my) {
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            } else if (creep.room.controller.level < 2) {
                worker(creep, to, [{action:'upgrade'}], creep.room);
            } else {

                if (creep.room.controller.ticksToDowngrade < 49000) {
                    worker(creep, to, [{action:'upgrade'}], creep.room);
                } else {
                    if (Data.b[to][0] !== undefined) {
                        worker(creep, to, [{action:'build', target:Data.b[to][0]}], creep.room);
                    } else {
                        worker(creep, to, [{action:'upgrade'}], creep.room);
                        return;
                        var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: function(object){
                                return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                            }
                        });
                        if (road) {
                            worker(creep, to, [{action:'repair', target:road}], creep.room);
                        } else {
                            min = find_min(creep.room);
                            var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: function(object){
                                    return (object.structureType == STRUCTURE_WALL)
                                        && (object.hits < min.hits+3000) ;
                                }
                            })
                            if (wall)
                                worker(creep, to, [{action:'repair', target:wall}], creep.room);
                        }

                    }
                }
            }
        }
    },
    harvester: function (creep, to, rms) {
        if (creep.room.name != to) {
            move_rooms(creep, rms);
        } else {
            s = creep.pos.findClosestByRange(FIND_SOURCES)
            if (creep.harvest(s) == ERR_NOT_IN_RANGE)
                creep.moveTo(s)
        }
    }
};