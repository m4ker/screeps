var harvester = require('role.harvester');
var transfer  = require('role.transfer');
var worker    = require('role.worker');
var soldier   = require('role.soldier');

var min_rampart    = require('min_rampart');
var min_wall       = require('min_wall');

// war modules
//var guard    = require('role.guard');
//var attacker = require('role.attacker');

// other
var creep_create = require('creep_create');

module.exports.loop = function () {

    //path = Game.creeps['g253'].pos.findPathTo(new RoomPosition(36,24,'E22N15'));
    //str = '';
    //for(p of path) {
    //    str += p.x + ',' + p.y + '  ';
    //}
    //console.log(str);




    var room     = Game.rooms.E23N14;
    var spawn    = Game.spawns.Azeroth;

    var mrampart = min_rampart(room);
    var mwall    = min_wall(room);

    var structures = room.find(FIND_MY_STRUCTURES, {
        filter: function(object) {
            if(object.structureType == STRUCTURE_STORAGE ) {
                return true;
            }
            return false;
        }
    });
    var st = structures[0];

    var up = null;
    for ( i in Game.creeps ) {
        if (Game.creeps[i].memory.role == 'upgrader') {
            up = Game.creeps[i];
            break;
        }
    }

    var sources = room.find(FIND_SOURCES);

    // 要建造的东西
    var cs = room.find(FIND_CONSTRUCTION_SITES);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        //creep.moveTo(20, 20);
        //continue;
        switch(creep.memory.role) {
            case 'harvester1':
                harvester(creep, 'E23N14', 0);
                break;
            case 'harvester2':
                harvester(creep, 'E23N14', 1);
                break;
            case 'upgrader':
                worker(creep, room, [{action:'upgrade'}], new RoomPosition(24,16,room.name));
                break;
            case 'upgrade_recharger':
                transfer(creep, st, new RoomPosition(24,16,room.name));
                break;
            case 'pickuper':
                transfer(creep, sources[0].pos, st);
                break;
            case 'pickuper2':
                transfer(creep, sources[1].pos, st);
                break;
            case 'repairer':
                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                if (road) {
                    worker(creep, room, [{action:'repair', target:road}], st);
                }
                break;
            case 'builder':
                if (cs[0] != undefined) {
                    worker(creep, room, [{action:'build', target:cs[0]}], st);
                } else {
                    /*
                     var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                     filter: function(object){
                     return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                     }
                     });
                     if (road) {
                     worker(creep, room, [{action:'repair', target:road}], st);
                     } else {
                     */
                    var wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object){
                            return object.structureType == STRUCTURE_WALL
                                && (object.hits < (mwall.hits+creep.carryCapacity * 100))
                                && object.hits > 1;// 排除hello world
                        }
                    });
                    worker(creep, room, [{action:'repair', target:wall}], st);
                    //}
                }
                break;
            case 'guard':
                //guard(creep);
                soldier(creep);
                break;
            case 'attacker':
                soldier(creep, Game.flags.Flag1);
                break;
            case 'rampartbuilder':
                var rampart = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_RAMPART && (object.hits <= (mrampart.hits + 10000));
                    }
                });
                worker(creep, room, [{action:'repair', target:rampart}], st);
                break;
            case 'homerecharger':
                transfer(creep, st, spawn);
                break;
            case 'extrecharger':
                transfer(creep, st, STRUCTURE_EXTENSION);
                break;
            case 'outside_harvester_1':
                harvester(creep, 'E23N13', 0);
                break;
            case 'outside_carryer_1':
                transfer(creep, Game.rooms.E23N13, st);
                break;
            case 'outside_builder':
                var road = Game.rooms.E23N13.find(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
                    }
                });
                console.log(road[0]);
                if (road) {
                    worker(creep, Game.rooms.E23N13, [{action:'repair', target:road[0]}], Game.rooms.E23N13);
                }
                break;
            case 'outside_harvester_2':
                harvester(creep, 'E23N15', 1);
                break;
            case 'outside_carryer_2':
                transfer(creep, Game.rooms.E23N15, st);
                break;
            default:
                console.log('fucker');
                break;
        }
    }

    creep_create(spawn, {
        // 这个设计可以保证 0 creep 启动
        extrecharger:{
            max:3,
            body:[CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]
        },
        // e23n14 source 0 harvester
        harvester1:{
            max:1,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE]
        },
        // pickup energy to source center or storage
        pickuper:{
            max:1,
            body:[CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        // e23n14 source 1 harvester
        harvester2:{
            max:1,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE]
        },
        pickuper2:{
            max:2,
            body:[CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        homerecharger:{
            max:1,
            body:[CARRY, CARRY, MOVE, MOVE]
        },
        // controller upgrader
        upgrader:{
            max:1,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
        },
        upgrade_recharger:{
            max:1,
            body:[CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        // repair && build && repair wall
        builder:{
            max:5,
            body:[WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        // repair
        repairer:{
            max:1,
            body:[WORK, CARRY, MOVE, MOVE]
        },
        // repair rampart
        rampartbuilder:{
            max:1,
            body:[WORK, CARRY, CARRY, MOVE, MOVE]
        },
        outside_harvester_1:{
            max:1,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        outside_carryer_1:{
            max:4,
            body:[CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        outside_builder:{
            max:1,
            body:[WORK, CARRY, MOVE, MOVE]
        },
        outside_harvester_2:{
            max:1,
            body:[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        outside_carryer_2:{
            max:4,
            body:[CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        wallbuilder:{
            max:0,
            body:[WORK, CARRY, MOVE, MOVE]
        },
        guard:{
            max:1,
            body:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, ATTACK, ATTACK, MOVE]
        },
        attacker:{
            max:1,
            body:[TOUGH,ATTACK,MOVE,MOVE]
        }
    });

    // clear memory
    for( i in Memory.creeps) {
        if (Memory.creeps[i]._move != undefined) {
            if (Game.time - Memory.creeps[i]._move.time > 3000){
                delete Memory.creeps[i];
            }
        } else {
            //delete Memory.creeps[i];
        }
    }
}