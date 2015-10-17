/*
 * 采集
 */
module.exports = function (creep, source_center) {
    if (creep.room.name == 'E23N14') {
        if (creep.carry.energy > 0) {
            if (source_center) {
                x = source_center.pos.x;
                y = source_center.pos.y;
                
                if(creep.pos.x==x && creep.pos.y==y) {
                    creep.dropEnergy();
                } else {
                    creep.moveTo(x,y);
                }
            } else {
                //var SR = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
                SR = Game.spawns.Azeroth;
                if (SR.energy == SR.energyCapacity)
                    return;
                if(creep.transferEnergy(SR) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(SR);
                }
            }
        } else {
            var pos = new RoomPosition(1, 1, 'E23N13');
            creep.moveTo(pos) ;
        }
    } else {
        if (creep.carry.energy < creep.carryCapacity) {
            sources = creep.room.find(FIND_SOURCES);
            source = sources[parseInt(creep.name.charAt(creep.name.length-2) + creep.name.charAt(creep.name.length-1))%sources.length];
            result = creep.harvest(source);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            var pos = new RoomPosition(1, 1, 'E23N14');
            creep.moveTo(pos) ;
        }
    }
};
