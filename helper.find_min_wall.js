/*
 * find the wall to repair
 */
module.exports = function (room) {
    var min=null;

    var structures = room.find(FIND_STRUCTURES, {
        filter: function(object) {
            if(object.structureType != STRUCTURE_WALL ) {
                return false;
            }
            // 字不造
            if(object.hits === 1 ) {
                return false;
            }
            return true;
        }
    });

    if (structures.length) {
        for ( i in structures ) {
            if ( min == null || structures[i].hits < min.hits) {
                min = structures[i];
            }
        }
    }

    return min;
}