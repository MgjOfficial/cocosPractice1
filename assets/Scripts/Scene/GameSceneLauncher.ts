import { _decorator, Component, director, instantiate, Node, Prefab, resources } from 'cc';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('GameSceneLauncher')
export class GameSceneLauncher extends Component {
    //场景的启动器


    protected onLoad(): void {
        /*
        todo
        1.加载玩家模型
        2.加载武器
        3.加载操控UI界面
        etc..
        */


        // loading character
        resources.load(`character/${GameManager.instance().playerInfo.name}`, Prefab, (err, pfb)=>{
            if(err){
                console.error("Failed to load character Prefab: " + name);
                return null;
            }
            let node = instantiate(pfb);
            node.setParent(director.getScene().getChildByName("Canvas"));
        });
    }
}


