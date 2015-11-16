/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('helper.parts'); // -> 'a thing'
 */

module.exports = function (str) {
    var parts = [];
    var data = {
        W:WORK,
        M:MOVE,
        C:CARRY,
        A:ATTACK,
        R:RANGED_ATTACK,
        H:HEAL,
        T:TOUGH
    };
    for (var i=0; i<str.length; i++) {
        if (str.charAt(i) != ' ') {
            parts.push(data[str.charAt(i)]);
        }
        if (parts.length === 50)
            break;
    }
    //console.log(parts);
    return parts;
}