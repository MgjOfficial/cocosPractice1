import { _decorator, Component, Node } from 'cc';
import { PlayerController } from '../Controller/PlayerController';
import { WeaponBase } from '../Controller/Weapon/WeaponBase';
import { MWeapon } from './MWeapon';
const { ccclass, property } = _decorator;

@ccclass('MCharacter')
export class MCharacter {

    // 绑定控制器，节点
    controller : PlayerController;
    node : Node; 

    // 数据
    id : number;
    name : string;      // 角色名称
    curHp : number;     // 当前生命值
    maxHp : number;     // 最大生命值
    curEnergy : number; // 当前能量值
    maxEnergy : number; // 最大能量值
    speed : number;     // 移动速度
    defence : number;   // 防御力

    weapons : Array<MWeapon> = new Array<MWeapon>();

    constructor(id : number, name : string, maxHp : number, maxEnergy : number, speed : number,
        defence : number, weapons : Array<MWeapon>){
        this.id = id;
        this.name = name;
        this.maxHp = maxHp;
        this.maxEnergy = maxEnergy;
        this.speed = speed;
        this.defence = defence;

        this.curHp = maxHp;
        this.curEnergy = maxEnergy;
        this.weapons = weapons;
    }
    init(name :string, maxHp : number) : void{
        this.name = name;
        this.maxHp = maxHp;
    }


    addWeapon(wep : MWeapon){
        this.weapons.push(wep);
    }

}


