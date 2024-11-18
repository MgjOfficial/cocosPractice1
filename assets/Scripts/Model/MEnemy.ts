import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MEnemy')
export class MEnemy {

    public node : Node;

    id : number;
    name : string;
    curHp : number;
    maxHp : number;
    speed : number;
    attack : number;
    defend : number;

    constructor(id: number, name: string, maxHp: number, speed: number, attack: number, defend : number) {
        this.id = id;
        this.name = name;
        this.curHp = maxHp;
        this.maxHp = maxHp;
        this.speed = speed;
        this.attack = attack;
        this.defend = defend;
    }
}

