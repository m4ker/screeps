/*
 * 军队
 */
module.exports = function (creep, flag) {
    //console.log(flag);
    var targets = creep.room.find(FIND_HOSTILE_CREEPS);
    var targets2 = creep.room.find(FIND_HOSTILE_SPAWNS);
    if(targets.length) {
        if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        }
    } else if (targets2.length) {
        if(creep.attack(targets2[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets2[0]);
        }
    } else {
        if (flag) {
            result = creep.moveTo(flag);
        } else {
            creep.moveTo(20,20);
        }
    }
}
