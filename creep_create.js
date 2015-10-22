/*
 * keep creeps count & monitor
 * can before 100 ticks create new creep
 */
module.exports = function (spawn, data) {
    /*
     data = {
     harvester:{
     max:20,
     body:[WORK, CARRY, CARRY, MOVE, MOVE]
     },
     builder:{
     max:2,
     body:[WORK, CARRY, CARRY, MOVE, MOVE]
     },
     repairer:{
     max:2,
     body:[WORK, CARRY, CARRY, MOVE, MOVE]
     },
     upgrader:{
     max:2,
     body:[WORK, CARRY, CARRY, MOVE, MOVE]
     }
     };
     */
    var groups = {};
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = creep.memory.role;
        if (creep.ticksToLive > 100) { // before 100 ticks create new creep
            if(groups[role] == undefined){
                groups[role] = 1
            }else {
                groups[role] ++;
            }
        }
    }

    var monitorString = "\n";
    for(var roler in groups){
        monitorString += roler +":" + groups[roler] + "\n";
    }

    console.log("creeps:" + monitorString);
    console.log("energy:" + spawn.room.energyAvailable);

    for(var roler in data) {
        if (data[roler].max > groups[roler] || (data[roler].max > 0 && typeof groups[roler] == 'undefined')) {
            var number = parseInt(Math.random() * 900 + 100);
            cname = roler.charAt(0) + number
            if (data[roler].room !== undefined) {
                // 在目标房间查找 Source Keeper
                sk = data[roler].room.find(FIND_HOSTILE_CREEPS, { filter: function(i) {
                    return i.owner.username == 'Source Keeper';
                }});
                if (sk[0] !== undefined) {
                    // 如果发现 Source Keeper ，则不生产该 creep
                    continue;
                }
            }
            if (spawn.canCreateCreep(data[roler].body, cname) == OK) {
                result = spawn.createCreep(data[roler].body, cname,  { role: roler });
                if ( result == cname) {
                    console.log('create a creep:' + roler);
                } else {
                    console.log(result);
                }
                return;
            } else {
                return;
            }
        }
    }
}