import { _decorator, Component, Game, Node } from 'cc';
import Singleton from '../Common/Singleton';
import { MCharacter } from '../Model/MCharacter';
import { DataManager } from './DataManager';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Singleton<GameManager>{
    mCharacter : MCharacter;

    emenys : Array<Node> = new Array<Node>();

    //初始化玩家数据
    initPlayerInfo(characterID: number){

        this.mCharacter = DataManager.instance().getCharacterInfo(characterID);
    }

    addEnemy(enemy:Node){
        this.emenys.push(enemy);
    }
}


