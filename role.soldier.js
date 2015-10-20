/*
 * 士兵
 */
module.exports = function (creep, flag, friends) {
    if (flag) {

        // 巡逻 or 进攻模式
        if (flag.room.name != creep.room.name) {
            creep.moveTo(new RoomPosition(1,1,flag.room.name));
        } else {

            target = flag.pos.lookFor('structure');
            if (target instanceof Structure) {
                // 攻击建筑
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                // 巡逻
                var targets = creep.room.find(FIND_HOSTILE_CREEPS);
                if(targets.length) {
                    // attack creep first
                    if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                } else {
                    // what to do ?
                    creep.moveTo(flag.pos);
                }
            }
        }
    } else {
        // 防守模式
        var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        if(targets.length) {
            if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            creep.moveTo(15,40);
        }
    }
}