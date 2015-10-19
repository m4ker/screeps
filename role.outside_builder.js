/*
 * builder & repairer in other room
 * pickup droped energy 
 */
module.exports = function (creep, to_room) {
	//to_room   = 'E23N13';
	if (creep.room.name == to_room) {
		if(creep.carry.energy == 0) {
			// pickup
			var EN = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
			if (EN) {
				if (creep.pickup(EN) == ERR_NOT_IN_RANGE) {
					creep.moveTo(EN);
				}
			}
		} else {
			// working
			var SR = creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: function(object){
					if(object.structureType != STRUCTURE_ROAD ) {
						return false;
					}
					if(object.hits < object.hitsMax) {
						return true;
					}
					return false;
				}
			});
			//}
			result = creep.repair(SR);
			if (result == OK) {
				//creep.say('rp:working！');
			} else if (result == ERR_NOT_IN_RANGE) {
				creep.moveTo(SR);
				//creep.say('rp: go！');
			} else {
				var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
				if(targets.length) {
					result = creep.build(targets[0]);
					if (result == OK) {
						//creep.say('bd:working！');
					} else if(result == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[0]);

						//creep.say('bd:gogogo！');
					}
				} else {
					creep.moveTo(40, 26);
				}
			}
		}
	} else {
		// on the way
		var to_pos = new RoomPosition(20, 20, to_room);
		creep.moveTo(to_pos);
	}
}