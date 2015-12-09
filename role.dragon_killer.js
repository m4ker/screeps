/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.dragon_team'); // -> 'a thing'
 */
var harvester = require('role.harvester');
var transfer2 = require('role.transfer2');
var move_to_room = require('helper.move_to_room2');
module.exports = {
    killer:function(creep, from, to, kl){
        creep.notifyWhenAttacked(false);
        if (creep.room.name == from) {
            move_to_room(creep, to);
        } else {
            var dragon = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 4);
            if (dragon[0] != undefined) {
                if (creep.pos.isNearTo(dragon[0])) {
                    result = creep.attack(dragon[0])
                } else {
                    creep.moveTo(dragon[0]);
                }
            } else {
                if (creep.ticksToLive < 300) {
                    creep.suicide();
                } else {
                    if (creep.hits < creep.hitsMax) {
                        creep.heal(creep);
                    } else {
                        creep.moveTo(Game.getObjectById(kl));
                    }
                }
            }
        }
    },
    harvester:function(creep, from, to, kl, sr, x, y){
        creep.notifyWhenAttacked(false);
        if (creep.room.name == from) {
            move_to_room(creep, to);
        } else {
            if (Game.getObjectById(kl).ticksToSpawn == undefined) {
                // keeper
                creep.moveTo(x, y);
            } else {
                if (Game.getObjectById(kl).ticksToSpawn < 15) {
                    creep.moveTo(x, y);
                } else {
                    if (creep.harvest(Game.getObjectById(sr)) == ERR_NOT_IN_RANGE)
                        creep.moveTo(Game.getObjectById(sr))
                }
            }
        }
    },
    carryer:function(creep, from, to, kl, x, y){
        creep.notifyWhenAttacked(false);
        if (creep.room.name == from) {
            if (creep.carry.energy == 0) {
                move_to_room(creep, to);
            } else {
                transfer2(creep, creep.room, creep.room.storage)
            }
        } else {
            if (creep.carry.energy < creep.carryCapacity) {
                if (Game.getObjectById(kl).ticksToSpawn == undefined) {
                    // keeper
                    creep.moveTo(x, y);
                } else {
                    if (Game.getObjectById(kl).ticksToSpawn < 15) {
                        creep.moveTo(x, y);
                    } else {
                        var en = Game.getObjectById(kl).pos.findInRange(FIND_DROPPED_ENERGY, 5, {
                            filter:function(o) {
                                return o.energy > 100;
                            }
                        });
                        if (en[0] != undefined) {
                            if (creep.pickup(en[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(en[0]);
                            }
                        }
                    }
                }
            } else {
                move_to_room(creep, from);
            }
        }
    }
};