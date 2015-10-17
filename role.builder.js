/*
 * 建设工种
 */
 module.exports = function (creep, sc) {
    if(creep.carry.energy == 0) {
        if (sc) {
                var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
                    filter:function(object){
                        if (object.pos.x == sc.pos.x && object.pos.y == sc.pos.y) {
                            return true;
                        }
                        return false;
                    }
                });
                result = creep.pickup(target);
                //console.log(result);
                if (result != OK) {
                    creep.moveTo(target);
                }
            } else {
                var spwn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
                creep.moveTo(spwn);
                if((spwn) > [199]) {
                    spwn.transferEnergy(creep);
                }
            }
    } else {
        //creep.say('?');
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            result = creep.build(targets[0]);
            if (result == OK) {
                //creep.say('bd:working！');
            } else if(result == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                //creep.say('bd:gogogo！');
            }
        } else {
            creep.moveTo(25,25);
        }
    }
}
