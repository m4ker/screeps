/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep_create'); // -> 'a thing'
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
        if(groups[role] == undefined){
            groups[role] = 1 
        }else {
          	groups[role] ++;
        }
    }
    
    for(var roler in data) {
        if (data[roler].max > groups[roler] || (data[roler].max > 0 && typeof groups[roler] == 'undefined')) {
            var number = parseInt(Math.random() * 900 + 100);
            cname = roler.charAt(0) + number;
            if (spawn.canCreateCreep(data[roler].body, cname) == OK) {
                result = spawn.createCreep(data[roler].body, cname,  { role: roler });
                console.log(cname);
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

