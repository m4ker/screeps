/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('outsidebuilder'); // -> 'a thing'
 */
 module.exports = function (creep) {
    if(creep.room.name !="E27N13"){
        	var pos = new RoomPosition(7,24, 'E27N13');
		     creep.moveTo(pos) ; 
		   //  continue;
    }else {
	if(creep.carry.energy < creep.carryCapacity) {
		var sources = creep.room.find(FIND_SOURCES);
	
		if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
			creep.moveTo(sources[0]);
		}		

	}
	else {
	    if(creep.room.controller.owner=='bobhero'){
	         if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                          creep.moveTo(creep.room.controller);    
                         }
	        
	    }else {

	    
	 	var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
				if(targets.length) {
				    //if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					//	creep.moveTo(targets[0].pos);		
					 
					//}
					
					
			    for(var i=1;i<20;i++){
				    for (var aim in targets){
				        if (targets[aim].pos.inRangeTo( creep.room.find(FIND_SOURCES)[0],i)){
				            	if(creep.build(targets[aim]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[aim].pos);		
						break;
					}
				        }
				    }
			    }

				}	
	}
    }}
}
