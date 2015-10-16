/*
 * 矿工
 */
 module.exports = function (creep) {
    if (Game.spawns.Azeroth.energy == 300)
        return;
        
    var sources = creep.room.find(FIND_SOURCES);
    
    last = parseInt(creep.name.charAt(creep.name.length - 1));
    
    sourceNo = last%2;

    if(creep.carry.energy < creep.carryCapacity) {
        if(creep.harvest(sources[sourceNo]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[sourceNo]);
        }
    }
    else {
        
        var SR = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                   filter: function(object){
                        if(object.structureType != STRUCTURE_EXTENSION ) {
                           return false;
                        }
                        if(object.energy < object.energyCapacity) {
                            return true;
                        }
                        return false;
                   } 
        });   
        
        if (SR) {
            if(creep.transferEnergy(SR) == ERR_NOT_IN_RANGE) {
                creep.moveTo(SR);
                creep.moveTo('wk:ext需要我！');
            }
        } else {
            if(creep.transferEnergy(Game.spawns.Azeroth) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Azeroth);
            }
        }
    }
}
