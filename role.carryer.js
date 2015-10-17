/*
 * 搬运工
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
        var SR = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                       filter: function(object){
                            if(object.structureType != STRUCTURE_EXTENSION) {
                                return false;
                            }
                            if(object.energy < object.energyCapacity) {
                                return true;
                            } else {
                                return false;
                            }
                       } 
            });
            
        if(SR){
            if(creep.transferEnergy(SR) == ERR_NOT_IN_RANGE) {
                creep.moveTo(SR);
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
        
        /*
        last = parseInt(creep.name.charAt(creep.name.length - 1));
        if (last%2 == 1) {
            //creep.say('!')
            // 这些和EXT到处跑
            var SR = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                       filter: function(object){
                            if(object.structureType != STRUCTURE_EXTENSION) {
                                return false;
                            }
                            if(object.energy < object.energyCapacity) {
                                return true;
                            } else {
                                return false;
                            }
                       } 
            });
            if(SR){
                if(creep.transferEnergy(SR) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(SR);
                }
            }
        } else {
            //creep.say('?');
            x=source_centers[1].pos.x;
            y=source_centers[1].pos.y;
            if(creep.pos.x==x && creep.pos.y==y) {
                creep.dropEnergy();
            } else {
                creep.moveTo(x,y);
            }
        }
        */
    }
}
