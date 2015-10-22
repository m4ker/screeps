module.exports =  function (creep, room) {
    data = {
        E23N14 : {
            E23N13:{
                x:32,
                y:49
            },
            E23N15:{
                x:11,
                y:0
            },
            E24N14:{
                x:49,
                y:42
            }
        },
        E23N13 : {
            E23N14 : {
                x:32,
                y:0
            }
        },
        E23N15 : {
            E23N14 : {
                x:11,
                y:49
            }
        },
        E24N14 : {
            E23N14 : {
                x:0,
                y:39
            }
        },
    };
    //console.log(creep);
    if (creep.pos.x != data[creep.room.name][room.name].x || creep.pos.y != data[creep.room.name][room.name].y) {
        creep.moveTo(data[creep.room.name][room.name].x,data[creep.room.name][room.name].y);
    }
}