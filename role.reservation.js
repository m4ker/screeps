/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.reservation'); // -> 'a thing'
 */
var transfer2 = require('role.transfer2');
var move_to_room = require('helper.move_to_room2');
var move_room2 = require('helper.move_to_room2');
module.exports = {
    worker:function(creep, room, Data){
        if (room instanceof Array) {
            if (creep.room.name != room[room.length - 1]) {
                move_rooms(creep, room);
            } else {
                if (creep.pos.isNearTo(creep.room.controller)) {
                    creep.moveTo(creep.room.controller);
                } else {
                    creep.reserveController(creep.room.controller);
                }
            }
        } else {
            if (creep.room.name != room) {
                move_to_room(creep, room)
            } else {

                if (!creep.pos.isNearTo(creep.room.controller)) {
                    //console.log(creep.room.controller);
                    result = creep.moveTo(creep.room.controller);
                    //console.log(result)
                } else {
                    creep.reserveController(creep.room.controller);
                }
            }
        }
    },
    carryer:function(creep, room, recharge_to, Data){
        //creep.say('here') 
        if (room instanceof Array) {
            if (creep.room.name != room[room.length - 1]) {
                if (creep.carry.energy == 0) {
                    if (creep.room.storage.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room)
                    }
                } else {
                    move_rooms(creep, room);
                }
            } else {
                if (Data.c[recharge_to][0]!=undefined) {
                    if (creep.transferEnergy(Data.c[recharge_to][0])) {
                        creep.moveTo(Data.c[recharge_to][0]);
                    }
                }
            }
        } else {
            if (creep.room.name != room) {
                if (creep.carry.energy == 0) {
                    //creep.say(1)
                    if (creep.room.storage.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage)
                    }
                } else {

                    move_to_room(creep, room);
                }
            } else {
                recharge_to = recharge_to.toLowerCase();
                if (Data.c[recharge_to] != undefined && Data.c[recharge_to][0]!=undefined) {
                    if (creep.transferEnergy(Data.c[recharge_to][0])) {
                        creep.moveTo(Data.c[recharge_to][0]);
                    }
                }
            }
        }
    }
};