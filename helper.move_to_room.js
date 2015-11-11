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
        },
        E25N13 : {
            E25N12 : {
                x:43,
                y:49
            }
        },
        E25N12 : {
            E25N13 : {
                x:44,
                y:0
            }
        },
        E22N15 : {
            E22N14 : {
                x:28,
                y:49
            },
            E21N15 : {
                x:0,
                y:16
            },
            E22N16 : {
                x:30,
                y:0
            }
        },
        E22N14 : {
            E22N15 : {
                x:27,
                y:0
            },
            E21N14 : {
                x : 0,
                y: 16
            }
        },
        E21N15 : {
            E22N15 : {
                x : 49,
                y : 16
            },
            E21N24 : {

            },
            E20N15 : {

            },
            E21N16 : {

            }
        },
        E22N16 : {
            E22N15 : {
                x : 29,
                y : 49
            }
        }
    };
    //console.log(creep.room);
    //console.log(room);
    if (creep.room != undefined && room != undefined && data[creep.room.name][room.name] != undefined) {
        if (
            creep.pos.x!= data[creep.room.name][room.name].x || creep.pos.y != data[creep.room.name][room.name].y) {
            creep.moveTo(data[creep.room.name][room.name].x,data[creep.room.name][room.name].y);
        }
    } else {
        console.log('move_to_room:',creep.room.name,' ',room.name)
        creep.moveTo(new RoomPosition(1,1,room.name));
    }
}