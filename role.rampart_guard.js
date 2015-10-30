/*
 * 守卫
 */
module.exports = function (creep, rampart) {
    creep_on_rampart = false;
    list = creep.pos.lookForAt('structure');
    for (o of list) {
        if (o.structureType == STRUCTURE_RAMPART) {
            creep_at_rampart = true;
        }
    }
    if (creep_on_rampart) {
        range_attack = true;
        if (range_attack) {
            army = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
            if (army[0] != undefined) {
                // rangeAttack
                creep.rangeAttach(army[0]);
            }
        } else {
            // todo:attack
        }
    } else {
        creep.moveTo(rampart);
    }
}
