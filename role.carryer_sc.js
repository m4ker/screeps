/*
 * 搬运工 -> sc
 */
module.exports = function (creep, source_centers) {
    //creep.move(20,20);
    //return;
    if(creep.carry.energy == 0) {
        //creep.say('=');
        var EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
            filter: function(object) {
                for (var i in source_centers) {
                    if (source_centers[i].pos.x == object.pos.x && source_centers[i].pos.y == object.pos.y) {
                        return false;
                    }
                }
                return true;
            }
        });
        if (EN) {
            if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
                creep.moveTo(EN);
            }
        } else {
            creep.moveTo(38,8);
        }
    } else {
        //creep.say('!');
        var ST = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: function(object){
                if(object.structureType != STRUCTURE_STORAGE) {
                    return false;
                }
                return true;
            }
        });
        //console.log(ST);
        if (ST) {
            if(creep.transferEnergy(ST) == ERR_NOT_IN_RANGE) {
                creep.moveTo(ST);
            }
        } else {
            x=source_centers[1].pos.x;
            y=source_centers[1].pos.y;
            if(creep.pos.x==x && creep.pos.y==y) {
                creep.dropEnergy();
            } else {
                creep.moveTo(x,y);
            }
        }

    }
}