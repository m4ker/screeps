/*
 * keep creeps count & monitor
 * can before 100 ticks create new creep
 */
module.exports = function (room, data) {

    var groups = {};
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = creep.memory.role;
        if (creep.ticksToLive == undefined || creep.ticksToLive > 50) { // before 100 ticks create new creep
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

    //console.log("creeps:" + monitorString);
    //console.log("energy:" + spawn.room.energyAvailable);
    spawns = room.find(FIND_MY_SPAWNS);
    for(var i in spawns) {
        for(var roler in data) {
            if (data[roler].max > groups[roler] || (data[roler].max > 0 && typeof groups[roler] == 'undefined')) {
                var number = parseInt(Math.random() * 900 + 100);
                cname = roler.charAt(0) + number;
                if(data[roler].condition != undefined && ! data[roler].condition){
                    continue;
                }
                if (spawns[i].canCreateCreep(data[roler].body, cname) == OK) {
                    result = spawns[i].createCreep(data[roler].body, cname,  { role: roler });
                    if ( result == cname) {
                        groups[roler]++;
                        console.log(spawns[i].name + ' create a creep:' + roler + " " + cname);
                    } else {
                        console.log(result);
                    }
                    break;
                }
            }
        }
    }
}