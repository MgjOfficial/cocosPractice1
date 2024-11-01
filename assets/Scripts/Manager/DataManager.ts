import { _decorator, Component, director, error, instantiate, JsonAsset, Node, Prefab, resources } from 'cc';
import Singleton from '../Common/Singleton';
import { MPlayer } from '../Model/MPlayer';
import { WeaponTest } from '../Model/Weapon/WeaponTest';
const { ccclass, property } = _decorator;

@ccclass('DataManager')
export class DataManager extends Singleton<DataManager> {

    public weapons : Map<number,string> = new Map<number, string>();
    //整合从resoureces内加载内容的方法

    public init(){
        this.getDefine("weapons", (res: JsonAsset)=>{
            let data = res.json!;
            for(const key in data){
                const value = data[key];
                this.weapons.set(value, key);
            }
        })
    }

    //目前只在代码中直接new player
    createNewPlayer(characterName : string, callback : Function){
        
        this.getDefine("momoi",(res: JsonAsset)=>{

            let newPlayer = new MPlayer();
            const jsonData = res.json;

            let _name = jsonData._name;
            let maxHp = jsonData.maxHp;
            let maxMp = jsonData.maxMp;
            let weapons = jsonData.weapons;


            newPlayer.init(_name,maxHp,maxMp);
            weapons.forEach(id => {
                newPlayer.addWeapon_name(this.weapons.get(id));
            });

            callback(newPlayer);
        });
        
        
    }

    public getWeaponInfoById(id : number, callback : Function){
        this.getWeaponInfoByName(this.weapons.get(id),callback);
    }

    //加载武器预制体，通过回调方法去执行
    public getWeaponInfoByName(name : string, callback : Function){

        resources.load(`weapon/${name}`, Prefab, (err : any, weaponPrefab)=>{
            if(err){
                error(err.message || err);
                return;
            }
            callback(weaponPrefab);
            
        });

    }

    public getDefine(name : string, callback : Function){
        resources.load(`define/${name}`, (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            // 获取到 Json 数据
            callback(res);
        })
    }
}


