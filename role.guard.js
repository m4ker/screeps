/*
 * 守卫
 */
module.exports = function (creep, ramparts) {
    in_position = false;
    empty = [];
    for (var i in ramparts) {
        if (creep.pos.x == ramparts[i].pos.x && creep.pos.y == ramparts[i].pos.y) {
            in_position = true;
        }
        if (ramparts[i].pos.lookFor('creep').length == 0) {
            empty.push(ramparts[i]);
        }
    }
    if (in_position) {
        army = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        creep.attack(army);
    } else {
        if (empty.length > 0) {
            creep.moveTo(empty[0]);
        } else {
            creep.moveTo(ramparts[0]);
        }
    }
}