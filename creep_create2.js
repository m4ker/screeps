/*
 * keep creeps count & monitor
 * can before 100 ticks create new creep
 */
var parts = require('helper.parts');
module.exports = function (room, data, D) {

    var groups = {};
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = creep.memory.role;

        if (data[role] != undefined && data[role].distance != undefined) {
            var distance = data[role].distance;
            var spawningTime = data[role].body.replace(/\s+/g, '').length * 3;
            // 计算工作距离 和 生产时间
            var before = distance + spawningTime;
        } else {
            //var distance = 50;
            var before = 50;
        }

        if (creep.ticksToLive == undefined || creep.ticksToLive > before) {
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
    spawns = D.sp[room.name];
    var sn = 0;
    for(var i in spawns) {
        sn ++;
        //console.log(spawns.length == 3 && sn == 1);
        if (spawns.length == 3 && sn == 1)
            continue;
        for(var roler in data) {
            if (data[roler].max > groups[roler] || (data[roler].max > 0 && typeof groups[roler] == 'undefined')) {
                var number = parseInt(Math.random() * 900 + 100);
                cname = roler.charAt(7) + number;
                if(data[roler].condition != undefined && ! data[roler].condition){
                    continue;
                }
                var body = parts(data[roler].body);
                var result = spawns[i].canCreateCreep(body, cname);
                if (result == OK) {
                    result = spawns[i].createCreep(body, cname,  { role: roler });
                    if ( result == cname) {
                        groups[roler]++;
                        console.log(spawns[i].name + ' create a creep:' + roler + " " + cname);
                    } else {
                        console.log(result);
                    }
                    break;
                } else {
                    //console.log(result);
                }
            }
        }

    }
}