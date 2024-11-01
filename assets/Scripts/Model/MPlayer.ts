import { _decorator, Component, Node } from 'cc';
import { WeaponTest } from './Weapon/WeaponTest';
import { WeaponBase } from './Weapon/WeaponBase';
import { PlayerController } from '../Controller/PlayerController';
const { ccclass, property } = _decorator;

@ccclass('MPlayer')
export class MPlayer {

    public controller : PlayerController;
    public node : Node;

    //data
    public name : string;
    public maxHp : number;
    public maxMp : number;

    public weapons_name : Array<string> = new Array<string>();
    public weapons_component : Array<WeaponBase> = new Array<WeaponBase>();

    init(name :string, maxHp : number, maxMp : number) : void{
        this.name = name;
        this.maxHp = maxHp;
        this.maxMp = maxMp;
    }

    addWeapon_name(wepName : string){
        this.weapons_name.push(wepName);
    }

    addWeapon_component(weaCom : WeaponBase){
        this.weapons_component.push(weaCom);
    }

}


