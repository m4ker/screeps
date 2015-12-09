/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('helper.move_rooms'); // -> 'a thing'
 */
move_to_room = require('helper.move_to_room2')
module.exports = function (creep, rms) {
    //creep.say('long way!')
    for (var i in rms) {
        if (creep.room.name == rms[i]) {
            if (i != (rms.length-1) ) {
                var go = parseInt(i) + 1;
                creep.say(rms[go]);
                move_to_room(creep, rms[go]);
                return;
            }
        }
    }
}