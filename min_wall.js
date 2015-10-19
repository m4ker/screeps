/*
 * find the wall
 */
module.exports = function () {
    var min_rampart=null;

    var structures = Game.rooms.E23N14.find(FIND_STRUCTURES, {
        filter: function(object) {
            if(object.structureType != STRUCTURE_WALL ) {
                return false;
            }
            return true;
        }
    });

    if (structures.length) {
        for ( i in structures ) {
            if ( min_rampart == null || structures[i].hits < min_rampart.hits) {
                min_rampart = structures[i];
            }
        }
    }

    return min_rampart;
}