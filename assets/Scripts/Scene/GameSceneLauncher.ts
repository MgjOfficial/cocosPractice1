import { _decorator, Component, director, game, instantiate, Node, Prefab, resources, Scheduler } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { UIManager } from '../Manager/UIManager';
import { UIPlayerControl } from '../UI/UIPlayerControl/UIPlayerControl';
import { WeaponBase } from '../Model/Weapon/WeaponBase';
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
        let mplayer = GameManager.instance().player;
        if(!mplayer){
            console.error("player data is not existed");
        }

        // loading character
        resources.load(`character/${mplayer.name}`, Prefab, (err, pfb)=>{
            if(err){
                console.error(err.message);
                return null;
            }
            let chaNode = instantiate(pfb);
            chaNode.setParent(director.getScene().getChildByName("Canvas").getChildByName("GameRoot"));
            mplayer.node = chaNode;
            //console.log("start to load weapon");

            mplayer.weapons_name.forEach(wep => {
                resources.load(`weapon/${wep}`, Prefab, (err, pfb)=>{
                    if(err){
                        console.error(err.message);
                        return null;
                    }
                    let wepNode = instantiate(pfb);
                    wepNode.setParent(chaNode);
                    wepNode.active = true;
                    console.log(`load weapon [${wep}] complete`);

                    const wc = wepNode.getComponent(WeaponBase);

                    mplayer.addWeapon_component(wc);
                    wc.setOwner(chaNode);
                })

                
            });
            this.scheduleOnce(UIManager.instance().openUI("UIPlayerControl",(ui : UIPlayerControl) =>{
                ui.node.setParent(this.node.parent.getChildByName("Canvas").getChildByName("UIRoot"));
                ui.init();
            }), 1);

            
    
        });

        
    }
}


