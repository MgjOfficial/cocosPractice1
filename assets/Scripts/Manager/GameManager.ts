import { _decorator, Component, Game, Node } from 'cc';
import Singleton from '../Common/Singleton';
import { MPlayer } from '../Model/MPlayer';
import { DataManager } from './DataManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Singleton<GameManager>{
    playerInfo : MPlayer;


    //初始化玩家数据
    initPlayerInfo(characterID: number, weaponID:number){
        let player = DataManager.instance().getCharacterInfo(characterID);

        this.playerInfo = player;
    }
}


