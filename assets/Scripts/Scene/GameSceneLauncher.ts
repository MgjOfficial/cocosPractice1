import { _decorator, Component, director, game, instantiate, Node, Prefab, resources, Scheduler } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { UIManager } from '../Manager/UIManager';
import { UIPlayerControl } from '../UI/UIPlayerControl/UIPlayerControl';
import { WeaponBase } from '../Controller/Weapon/WeaponBase';
import { DataManager } from '../Manager/DataManager';
import { PlayerController } from '../Controller/PlayerController';
const { ccclass, property } = _decorator;

@ccclass('GameSceneLauncher')
export class GameSceneLauncher extends Component {
    //场景的启动器

    //测试
    @property({
        type: [Node],
    })
    enemys : Node[] = [];

    protected async onLoad(){
        /*
         * 1.加载玩家模型
         * 2.加载武器
         * 3.加载操控UI界面
         * etc..
         */
        let mc = GameManager.instance().mCharacter;
        if(mc == undefined || mc == null){
            console.error("character data model is not existed");
        }

        await DataManager.instance().loadCharacterPrefab(mc.id, (characterNode)=>{
            characterNode.setParent(director.getScene().getChildByName("Canvas").getChildByName("GameRoot"));
            mc.node = characterNode;
            characterNode.getComponent(PlayerController).init(mc);
        })
        console.log("character load complete")

        console.log("start to load weapon");
        for(let i = 0; i < mc.weapons.length; i++){
            let wp = mc.weapons[i];
            await DataManager.instance().loadWeaponPrefab(wp.id, (weaponNode)=>{
                weaponNode.setParent(mc.node);
                weaponNode.active = true;
                wp.node = weaponNode; // 绑定节点
                weaponNode.getComponent(WeaponBase).setOwner(mc.node);
                console.log(`load weapon [${wp.name}] complete`);
            })
        }
        console.log("weapon load complete")

        console.log("start load ui")
        UIManager.instance().openUI("UIPlayerControl",(ui : UIPlayerControl) =>{
            ui.node.setParent(this.node.parent.getChildByName("Canvas").getChildByName("UIRoot"));
            ui.init();
        })

        this.enemys.forEach(e => {
            GameManager.instance().addEnemy(e);
        });
    }
}


