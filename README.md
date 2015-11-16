# screeps
my screeps scripts E22N15.

目前已经实现了一下功能

* 多Spawn支持
* 0 creep启动
* 初步解决了cpu消耗问题，55creep可以将cpu控制在45以下
* 有一个souce keeper的采集方法
* 入侵检测 以及 防御模式

文件功能说明

* creep_create.js creep工厂，已废弃
* creep_create2.js creep工厂
* helper.clear_memory.js 清理memory
* helper.data.js 统计数据
* helper.find_min.js 找到房间内hits最小的wall/rampart
* helper.find_min_rampart.js 找到房间内hits最小的rampart
* helper.find_min_road.js 找到房间内hits最小的road
* helper.find_min_wall.js 找到房间内hits最小的wall
* helper.move_to_room.js 跨房间移动，已废弃
* helper.move_to_room2.js 跨房间移动，用来解决跨房间移动cpu消耗的问题
* helper.parts.js body配置解析器第一版
* main.js 主文件，负责工种调度
* role.guard.js  进入rampart的卫兵
* role.harvester.js 无Carry矿工
* role.harvester2.js 矿工，废弃
* role.harvester3.js 独立矿工
* role.nurse.js 医疗工种，未测试
* role.rampart_guard.js 守卫工种，已废弃
* role.soldier.js 士兵工种
* role.transfer.js 搬运工种，已废弃
* role.transfer2.js 搬运工种
* role.worker.js 建造工种，已废弃
* role.worker2.js 建造工种
* room.e22n15.js 单房间生产配置
* room.e23n14.js 单房间生产配置
* room.e24n13.js 单房间生产配置
* room.e25n13.js 单房间生产配置