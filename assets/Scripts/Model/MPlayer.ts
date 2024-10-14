import { _decorator, Component, Node } from 'cc';
import { WeaponTest } from './Weapon/WeaponTest';
import { WeaponBase } from './Weapon/WeaponBase';
import { PlayerController } from '../Controller/PlayerController';
const { ccclass, property } = _decorator;

@ccclass('MPlayer')
export class MPlayer {
    //bind

    private controller : PlayerController;

    //data
    public name : string;
    public maxHp : number;
    public maxMp : number;

    init(name :string, maxHp : number, maxMp:number) : void{
        this.name = name;
        this.maxHp = maxHp;
        this.maxMp = maxMp;
    }

    addWeapon(wepName : string){

    }


    public getController(): PlayerController{
        return this.controller;
    }
}


