/*
 * 采集
 */
module.exports = function (creep, sc) {
    if (creep.room.name == 'E23N14') {
        if (creep.carry.energy > 0) {
            x=source_centers[1].pos.x;
            y=source_centers[1].pos.y;
            if(creep.pos.x==x && creep.pos.y==y) {
                creep.dropEnergy();
            } else {
                creep.moveTo(x,y);
            }
        } else {
            var pos = new RoomPosition(1, 1, 'E24N13');
            creep.moveTo(pos) ;
        }
    } else {
        //console.log(creep.carry.energy + " " + creep.carryCapacity);
        if (creep.carry.energy < creep.carryCapacity) {
            sources = creep.room.find(FIND_SOURCES);
            //console.log(creep.name.charAt(-2));
            source = sources[parseInt(creep.name.charAt(creep.name.length-2) + creep.name.charAt(creep.name.length-1))%sources.length];
            //console.log(parseInt(creep.name.charAt(-2) + creep.name.charAt(-1))%sources.length);
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
