import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MEnemy')
export class MEnemy {
    id : number;
    name : string;
    curHp : number;
    maxHp : number;
    speed : number;
    attack : number;
}

