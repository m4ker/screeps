/*
 * 守卫
 */
module.exports = function (creep) {
    var targets = creep.room.find(FIND_HOSTILE_CREEPS);
    if(targets.length) {
        if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        }
    } else {
        creep.moveTo(15,40);
    }
}