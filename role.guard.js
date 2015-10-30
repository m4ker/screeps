/*
 * 守卫
 */
module.exports = function (creep) {
    target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target != null) {
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    } else {
        // 巡逻
        creep.moveTo(10,10);
    }
}
