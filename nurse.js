/*
 * 护士
 */
module.exports = function (creep, flag, friends) {
    if (flag) {
        if (flag.pos.roomName != creep.room.name) {
            creep.moveTo(new RoomPosition(1,1,flag.pos.roomName));
        } else {
            my_creep = creep.pos.findClosestByPath(FIND_MY_CREEP, {
                filter: function(o) {
                    return o.hits< o.maxHits;
                }
            });
            if (my_creep instanceof Creep) {
                if (creep.heal(my_creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(my_creep);
                }
            } else {
                fo_creep = creep.pos.findClosestByPath(FIND_MY_CREEP);
                creep.moveTo(fo_creep);
            }
        }
    } else {
        // 防守模式
        my_creep = creep.pos.findClosestByPath(FIND_MY_CREEP, {
            filter: function(o) {
                return o.hits< o.maxHits;
            }
        });
        if (my_creep instanceof Creep) {
            if (creep.heal(my_creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(my_creep);
            }
        }
    }
}
