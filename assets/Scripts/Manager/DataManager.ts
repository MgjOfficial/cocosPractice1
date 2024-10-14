import { _decorator, Component, director, instantiate, Node, Prefab, resources } from 'cc';
import Singleton from '../Common/Singleton';
import { MPlayer } from '../Model/MPlayer';
import { WeaponTest } from '../Model/Weapon/WeaponTest';
const { ccclass, property } = _decorator;

@ccclass('DataManager')
export class DataManager extends Singleton<DataManager> {

    //整合从resoureces内加载内容的方法

    //目前只在代码中直接new player
    getCharacterInfo(id : number): MPlayer{
        let newPlayer = new MPlayer();
        switch(id){
            case 1:
                newPlayer.init("Momoi",550,300);
                break;

            case 2:
                newPlayer.init("Midori",500,250);
                break;

            default:
                break;
        }
        return newPlayer;
    }

    //加载武器预制体，通过回调方法去执行
    getWeaponInfo(name : string, callback : Function) : void{
        let path = `weapon/${name}`

        resources.load(path, Prefab, (err, weaponPrefab)=>{
            if(err){
                console.error("Failed to load weapon Prefab: " + name);
                return;
            }
            callback!(weaponPrefab);
        });

    }
}


