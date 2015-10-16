/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('monitor'); // -> 'a thing'
 */
module.exports = function () {
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
      	
    var monitorString = ' ';
    for(var roler in groups){
        monitorString += roler +":" + groups[roler] + " ";
    }
    
    console.log("工种:"+monitorString);
    console.log("能量:" +Game.spawns.Azeroth.energy );
}/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('monitor'); // -> 'a thing'
 */
module.exports = function () {
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
      	
    var monitorString = ' ';
    for(var roler in groups){
        monitorString += roler +":" + groups[roler] + " ";
    }
    
    console.log("工种:"+monitorString);
    console.log("能量:" +Game.spawns.Azeroth.energy );
}
