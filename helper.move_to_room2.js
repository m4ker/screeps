module.exports =  function (creep, room) {
    data = {
        E28N17: {
            E29N17:{
                x:49,
                y:13
            },
            E27N17:{
                x:0,
                y:30
            }
        },
        E29N17: {
            E28N17:{
                x:0,
                y:14
            },
            E29N18:{
                x:7,
                y:0
            }
        },
        E29N18:{
            E29N17:{
                x:8,
                y:49
            }
        },
        E27N17: {
            E28N17:{
                x:49,
                y:29
            }
        },
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
                y:41
            }
        },
        E24N14 : {
            E24N13 : {
                x:23,
                y:49
            },
            E23N14 : {
                x:0,
                y:39
            },
            E25N14 : {
                x: 49,
                y: 37
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
            E24N11: {
                x:40,
                y:49
            },
            E24N13 : {
                x:23,
                y:0
            },
            E25N12 : {
                x:49,
                y:38
            },
            E23N12 : {
                x:0,
                y:14
            }
        },
        E23N12: {
            E24N12 : {
                x:49,
                y:14
            }
        },
        E23N16 : {
            E23N15 : {
                x:34,
                y:49
            }
        },
        E25N14 : {
            E25N13 : {
                x: 11,
                y: 49
            },
            E25N15 : {
                x: 37,
                y: 0
            }
        },
        E25N15 : {
            E25N14 : {
                x:37,
                y:49
            }
        },
        E25N13 : {
            E25N12 : {
                x:43,
                y:49
            },
            E25N14 : {
                x:12,
                y:0
            }
        },
        E25N12 : {
            E25N13 : {
                x:44,
                y:0
            },
            E24N12: {
                x:0,
                y:40
            },
            E26N12 : {
                x:49,
                y:29
            }
        },
        E22N15 : {
            E22N14 : {
                x:24,
                y:49
            },
            E21N15 : {
                x:0,
                y:18
            },
            E22N16 : {
                x:30,
                y:0
            },
            E23N15 : {
                x:49,
                y:40
            }
        },
        E22N14 : {
            E22N15 : {
                x:23,
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
                y : 19
            },
            E21N14 : {
                x : 29,
                y : 49
            },
            E20N15 : {

            },
            E21N16 : {

            }
        },
        E21N14 : {
            E21N15 : {
                x : 30,
                y : 0
            }
        },
        E22N16 : {
            E22N15 : {
                x : 29,
                y : 49
            }
        }
    };

    if (data[creep.room.name] != undefined && data[creep.room.name][room] != undefined) {
        if (
            creep.pos.x!= data[creep.room.name][room].x || creep.pos.y != data[creep.room.name][room].y) {
            //creep.say(data[creep.room.name][room].x + ' ' + data[creep.room.name][room].y);
            creep.moveTo(data[creep.room.name][room].x,data[creep.room.name][room].y);
        }
    } else {
        console.log('move_to_room2:',creep.memory.role, creep.room.name,' ',room)
        creep.moveTo(new RoomPosition(1,1,room));
    }
}