/*
 * 资源中心管理者
 */
module.exports = function (creep, sc) {
    //var spwn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
    var spwn = Game.spawns.Azeroth;
    if(creep.carry.energy < creep.carryCapacity) {
        creep.moveTo(spwn);
        if((spwn) > [199]) {
            spwn.transferEnergy(creep);
        }
        creep.say('no money!');
    }else{
        for (var i in source_centers) {
            var en = spwn.room.lookForAt('energy', source_centers[i].pos.x, source_centers[i].pos.y);
            var total = 0;
            if (en) {
                for (var j in en) {
                    total += en.energy;
                }
            }
            // recharge
            if (source_centers[i].min > total) {
                if (creep.pos.x == source_centers[i].pos.x && creep.pos.y == source_centers[i].pos.y) {
                    creep.dropEnergy();
                    creep.say('wahaha!');
                } else {
                    creep.moveTo(source_centers[i].pos.x, source_centers[i].pos.y);
                    creep.say('gogogo!');
                }
            }
        }
    }
};