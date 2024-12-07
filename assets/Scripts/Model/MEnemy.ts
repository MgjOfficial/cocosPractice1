import { _decorator, Component, Node, EventTarget } from 'cc';
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

    // Event
    onHpChange : EventTarget = new EventTarget();
    onDead : EventTarget = new EventTarget();

    constructor(id: number, name: string, maxHp: number, speed: number, attack: number, defend : number) {
        this.id = id;
        this.name = name;
        this.curHp = maxHp;
        this.maxHp = maxHp;
        this.speed = speed;
        this.attack = attack;
        this.defend = defend;
    }

    hpChange(delta : number) : void {
        console.log(`Enemy ${this.name} hp change ${delta}`);
        this.curHp += delta;
        this.onHpChange.emit('uiUpdate', { curHp: this.curHp, maxHp: this.maxHp });
        if (this.curHp <= 0) {
            this.onDead.emit('dead');
        }
    }

}

