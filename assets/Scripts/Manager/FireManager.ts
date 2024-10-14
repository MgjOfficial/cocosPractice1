import { _decorator, Component, debug, director, find, instantiate, Node, Prefab, Vec3 } from 'cc';
import { WeaponBase } from '../Model/Weapon/WeaponBase';
import { MPlayer } from '../Model/MPlayer';
import Singleton from '../Common/Singleton';
const { ccclass, property } = _decorator;

@ccclass('FireManager')
export default class FireManager extends Singleton<FireManager>{

    waeponFireTest(weapon : WeaponBase, owner : MPlayer): boolean{
        if(weapon.checkInFireCD()){
            console.log("weapon in cd");
            return false;
        }
        weapon.fire(owner);

        return true;
    }
    
}


