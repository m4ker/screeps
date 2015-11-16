module.exports = function (creep, ramparts) {
    // clear memory
    if (Game.time % 1000 == 0) {
        for( var i in Memory.creeps) {
            if (Memory.creeps[i]._move != undefined) {
                if (Game.time - Memory.creeps[i]._move.time > 1500){
                    delete Memory.creeps[i];
                }
            } else {
                //delete Memory.creeps[i];
            }
        }
    }
}