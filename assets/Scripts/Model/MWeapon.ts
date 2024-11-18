import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MWeapon')
export class MWeapon {

    // 绑定节点
    public node : Node;
    
    // 武器数据
    id : number;
    name : string;
    attack : number;
    cooldown : number;
    rangeArray : number[]; //一组用于计算攻击范围的数字，每个武器不同


    constructor(id : number, name : string, attack : number, cooldown : number, rangeArray : number[])
    {
        this.id = id;
        this.name = name;
        this.attack = attack;
        this.cooldown = cooldown;
        this.rangeArray = rangeArray;
    }
}


