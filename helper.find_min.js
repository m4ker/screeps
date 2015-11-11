/*
 * find the wall / rampart to repair
 */
module.exports = function (room) {
    var min=null;

    var structures = room.find(FIND_STRUCTURES, {
        filter: function(object) {
            return object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART;
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