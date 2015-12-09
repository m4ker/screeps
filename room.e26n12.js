var creep_create = require('creep_create2');
module.exports = function (D) {
    creep_create(Game.rooms.E26N12, {
        e26n12_ext_1: {
            max: 0,
            body: 'CCCC MM',
            distance: 5,
            condition: true
        },
        e26n12_harvester : {
            max: 0,
            //body: 'WWWWW CCCCC MMMMM',
            //body: 'WW C M',
            body: 'WWWWW CCC MMM',
            distance: 0,
            condition: true
        },
        e26n12_builder : {
            max: 0,
            //body: 'WWWW CCCC MMMMM MMM',
            body: 'WW C M',
            distance: 0,
            condition: true
        },
        e26n12_upgrader : {
            max: 0,
            //body: 'WWWW CCCC MMMMM MMM',
            body: 'WW C M',
            distance: 0,
            condition: true
        },

    },D);
}