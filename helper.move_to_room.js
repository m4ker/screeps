module.exports =  function (creep, room) {
    data = {
        E23N14 : {
            E23N13:{
                x:31,
                y:49
            },
            E23N15:{
                x:10,
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
            },
            E24N13 : {
                x:49,
                y:15
            }
        },
        E23N15 : {
            E23N14 : {
                x:11,
                y:49
            },
            E22N15 : {
                x:0,
                y:46
            }
        },
        E24N14 : {
            E23N14 : {
                x:0,
                y:39
            }
        },
        E24N13 : {
            E23N13 : {
                x:0,
                y:11
            },
            E24N14 : {
                x:25,
                y:0
            },
            E24N12 :{
                x:23,
                y:49
            }
        },
        E24N12 : {
            E24N13 : {
                x:42,
                y:0
            },
            E25N12 : {
                x:49,
                y:38
            }
        },
        E23N16 : {
            E23N15 : {
                x:34,
                y:49
            }
        },
        E25N12 : {
            E25N13 : {
                x:43,
                y:0
            }
        },
        E24N14 : {
            E25N14 : {
                x: 49,
                y: 37
            }
        },
        E25N14 : {
            E25N13 : {
                x: 11,
                y: 49
            }
        }
    };
    //console.log(creep.room.name);
    //console.log(room.name);
    if (data[creep.room.name][room.name] != undefined) {
        if (
            creep.pos.x!= data[creep.room.name][room.name].x || creep.pos.y != data[creep.room.name][room.name].y) {
            creep.moveTo(data[creep.room.name][room.name].x,data[creep.room.name][room.name].y);
        }
    } else {
        console.log('move_to_room:',creep.room.name,' ',room.name)
        creep.moveTo(new RoomPosition(1,1,room.name));
    }
}