/*
 * 军队
 */
module.exports = function (creep, flag) {
    //console.log(flag);
    //return;

    mod = 'WALL';
    mod = 'SPAWN';

    if (mod == 'SPAWN') {
        console.log('a');
        //return;
        var tcreep = creep.room.find(FIND_HOSTILE_CREEPS);
        var tspawn = creep.room.find(FIND_HOSTILE_SPAWNS);

        if(tcreep.length) {
            if(creep.attack(tcreep[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(tcreep[0]);
            }
        } else if (tspawn.length) {
            if(creep.attack(tspawn[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(tspawn[0]);
            }
        }

    } else if (mod == 'WALL') {
        console.log('b');
        //var x = 39;
        //var y = 32;
        //rname = creep.room.name;
        walls = [];

        //target = RoomPosition(39, 32, 'E22N15');

        var walls = creep.room.find(FIND_STRUCTURES, {
            filter: function(object){
                if(object.structureType != STRUCTURE_WALL ) {
                    return false;
                }
                //if(object.pos.x != target.pos.x || object.pos.y != target.pos.y) {
                //    return false;
                //}
                return true;
            }
        });

        //console.log(walls);
        if (walls) {
            console.log(walls[0].pos.x);
            console.log(walls[0].pos.y);
            result = creep.attack(walls[7]);
            console.log(result);
            if(result == ERR_NOT_IN_RANGE) {
                creep.moveTo(walls[7]);
            } else
                console.log(result);
        } else {
            var tcreep = creep.room.find(FIND_HOSTILE_CREEPS);
            var tspawn = creep.room.find(FIND_HOSTILE_SPAWNS);

            if(tcreep.length) {
                if(creep.attack(tcreep[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tcreep[0]);
                }
            } else if (tspawn.length) {
                if(creep.attack(tspawn[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tspawn[0]);
                }
            }
        }
    }
    /*
     if (flag) {
     //creep.move(TOP);
     result = creep.moveTo(flag);
     } else {
     creep.moveTo(20,20);
     }
     */

}