/*
 * monitor
 */
module.exports = function (spawn) {
    var groups = {};

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = creep.memory.role;
        if(groups[role] == undefined){
            groups[role] = 1
        }else {
            groups[role] ++;
        }

        //if (role == 'harvester2')
        //console.log(name);
    }

    var monitorString = "\n";
    for(var roler in groups){
        monitorString += roler +":" + groups[roler] + "\n";
    }

    console.log("creeps:"+monitorString);
    console.log("energy:" +spawn.energy);
}