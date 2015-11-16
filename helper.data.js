// todo: army data
var find_min     = require('helper.find_min');
module.exports = function () {

    var myRooms   = [];
    var nearRooms = [];
    var myCreeps = [];
    var myStructures = [];
    var myConstructSites = [];
    var wallsNeedBuild = [];
    var mode = null;
    var myEnergy = [];

    var cnt = 0;
    for (var i in Game.creeps) {

        if (Game.creeps[i].memory.role != undefined) {
            if (myCreeps[Game.creeps[i].memory.role] != undefined) {
                myCreeps[Game.creeps[i].memory.role].push(Game.creeps[i]);
            } else {
                myCreeps[Game.creeps[i].memory.role] = [Game.creeps[i]];
            }
        }
        cnt ++;
    }


    for (var i in Game.structures) {
        if (myStructures[Game.structures[i].structureType] != undefined) {
            myStructures[Game.structures[i].structureType].push(Game.structures[i]);
        } else {
            myStructures[Game.structures[i].structureType] = [Game.structures[i]];
        }
    }

    for (var i in Game.rooms) {
        if (Game.rooms[i].controller != undefined && Game.rooms[i].controller.my) {
            myRooms.push(Game.rooms[i]);
            wallsNeedBuild[i] = find_min(Game.rooms[i]);
            myEnergy[i] = Game.rooms[i].storage.store.energy;
            //console.log(i,myEnergy[i]);
        } else {
            nearRooms.push(Game.rooms[i]);
        }

        if (Game.rooms[i] != undefined) {
            myConstructSites[i] = Game.rooms[i].find(FIND_CONSTRUCTION_SITES);
            mode = Game.rooms[i].mode;

            //if (myEnergy[i] != undefined) {

            //}
        }

    }

    if (Game.time % 10 == 0)  {
        console.log('creeps:' + cnt);
    }

    return {
        r:myRooms,
        m:mode,
        n:nearRooms,
        c:myCreeps,
        s:myStructures,
        b:myConstructSites,
        w:wallsNeedBuild
    }
}



