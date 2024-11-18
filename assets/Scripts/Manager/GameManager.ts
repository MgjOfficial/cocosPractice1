import { _decorator, Component, Game, Node } from 'cc';
import Singleton from '../Common/Singleton';
import { MCharacter } from '../Model/MCharacter';
import { DataManager } from './DataManager';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Singleton<GameManager>{
    public mCharacter : MCharacter;

    public emenys : Array<Node> = new Array<Node>();

    //初始化玩家数据
    public initPlayerInfo(characterID: number){
        this.mCharacter = DataManager.instance().getCharacterInfo(characterID);
    }

    public addEnemy(enemy:Node){
        this.emenys.push(enemy);
    }
}


