import { _decorator, Component, Game, Node } from 'cc';
import Singleton from '../Common/Singleton';
import { MPlayer } from '../Model/MPlayer';
import { DataManager } from './DataManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Singleton<GameManager>{
    public player : MPlayer;

    emenys : Array<Node> = new Array<Node>();

    //初始化玩家数据
    initPlayerInfo(characterID: number){
        let chararcterName = "";
        if(characterID === 1){
            chararcterName = "momoi";
        }
        else if(characterID === 2){
            chararcterName = "midori";
        }

        DataManager.instance().createNewPlayer(chararcterName, (mp : MPlayer)=>{
            this.player = mp;
        })
        
    }

    addEnemy(enemy:Node){
        this.emenys.push(enemy);
    }
}


