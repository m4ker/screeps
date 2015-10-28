# screeps
my screeps scripts E23N14.

## todo

 * 防御模式
 * 每个room的配置分离 ok
 * 单room多spawn得creep生产方式
 * 监控各种状态发邮件通知

## 关于防御模式

友军

在已方room中发现敌军和友军进入二级防御模式

    在保证正常运转的前提下生产最高级远程兵种进入全部rampart

在附近room中发现敌军进入一级防御模式

    在保证正常运转的前提下生产最高级远程兵种进入外围rampart

## 多spawn生产

生产队列

检查全部creeps，如果有在队列中的，则从队列中删除

creeps 记数和统计目前creeps和生产队列中得creeps，如果发现数量不足，则遍历spawn生产，开始生产的放入生产队列


## 防御模式

if (creep.in_rampart()) {
    if (find_h_creeps && in_range) {
        // attack
    } else {
        empty_ramparts = [];
        creep.moveTo(empty_ramparts[0]);
    }
}

## 检测敌军

var find_army = function (my_room, other_rooms, friends) {
    if (my_room) {
        return 2;
    }
    if (other_rooms) {
        return 1;
    }
}