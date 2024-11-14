import { _decorator, Component, director, error, instantiate, JsonAsset, Node, Prefab, resources } from 'cc';
import Singleton from '../Common/Singleton';
import { MCharacter } from '../Model/MCharacter';
import { MWeapon } from '../Model/MWeapon';
import { PATHS } from '../Common/PathUitl';
const { ccclass, property } = _decorator;


interface CharacterData{
    id : number;
    name : string;
    maxHp : number;
    maxEnergy : number;
    speed : number;
    defence : number;
    weapons : number[];
}

interface WeaponData{
    id : number;
    name : string;
    attack : number;
    cooldown : number;
    rangeArray : number[];
}

@ccclass('DataManager')
export class DataManager extends Singleton<DataManager> {

    characters : Map<number, MCharacter> = new Map<number, MCharacter>();
    weapons : Map<number, MWeapon> = new Map<number, MWeapon>();

    //整合从resoureces内加载内容的方法
    async init(){
        // 初始化武器表
        await this.loadDefine("weapons", (res: JsonAsset)=>{
            (res.json as WeaponData[]).forEach(w => {
                this.weapons.set(w.id, new MWeapon(w.id, w.name, w.attack, w.cooldown,
                     w.rangeArray));
            });
        })
    
        // 初始化角色表
        await this.loadDefine("characters", (res: JsonAsset)=>{

            (res.json as CharacterData[]).forEach(c =>{
                let weaponList : Array<MWeapon> = new Array<MWeapon>();
                c.weapons.forEach(id => {
                    weaponList.push(this.weapons.get(id));
                });
                this.characters.set(c.id, new MCharacter(c.id,c.name, c.maxHp, c.maxEnergy,
                     c.speed, c.defence, weaponList));
            });
        })
    }

    // 根据id获取Character的预设数据
    getCharacterInfo(id : number) : MCharacter{
        if(!this.characters.has(id)){
            console.error(`Character is not found : [id:${id}]!`);
            return null;
        }

        return this.characters.get(id);
    }

    getWeaponInfo(id : number) : MWeapon{
        if(!this.weapons.has(id)){
            console.error(`Weapon is not found : [id:${id}]!`);
            return null;
        }

        return this.weapons.get(id);
    }

    loadCharacterPrefab(id : number, callback : (node:Node) => void) : Promise<void>{
        const mc = this.getCharacterInfo(id);
        if(mc == null){
            return Promise.reject(new Error('Character info not find'));
        }

        return new Promise((resolve , reject)=>{
            resources.load(`${PATHS.CHARACTERS}${mc.name}`, Prefab, (err, pfb)=>{
                if(err){
                    console.error(`load character prefab error : [${err}]`);
                    reject(err);
                    return null;
                }
                let chaNode = instantiate(pfb);
                callback(chaNode);
                resolve();
            });
        })
        
    }

    // 加载武器预制体，通过回调方法去执行，回调方法要求一个参数，参数为Node，为加载出的Node
    loadWeaponPrefab(id : number, callback : (node : Node) => void) : Promise<void>{
        const mw = this.getWeaponInfo(id);
        if(mw == null){
            return Promise.reject(new Error('Weapon info not find'));
        }

        return new Promise((resolve, reject)=>{
            resources.load(`${PATHS.WEAPONS}${mw.name}`, Prefab, (err : any, pfb)=>{
                if(err){
                    console.error(`load weapon prefab error : [${err}]`);
                    reject(err);
                    return;
                }
                let wepNode = instantiate(pfb);
                callback(wepNode);
                resolve();
            });
        })
    
    }

    // 获取预设数据的模板类
    private loadDefine(name : string, callback : Function){
        resources.load(`${PATHS.DEFINE}${name}`, (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            // 获取到 Json 数据
            callback(res);
        })
    }

}


