import { _decorator, Component, director, game, instantiate, Node, Prefab, resources, Scheduler, Terrain } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { UIManager } from '../Manager/UIManager';
import { UIPlayerControl } from '../UI/UIPlayerControl/UIPlayerControl';
import { WeaponBase } from '../Controller/Weapon/WeaponBase';
import { DataManager } from '../Manager/DataManager';
import { PlayerController } from '../Controller/PlayerController';
import { StageManager } from './StageManager';
const { ccclass, property } = _decorator;

@ccclass('GameSceneLauncher')
export class GameSceneLauncher extends Component {
    //场景的启动器

    //测试
    @property({
        type: [Node],
    })
    enemys : Node[] = [];
    //end 测试

    @property({
        type: StageManager,
    })
    public stageManager : StageManager;

    protected async onLoad(){

        if(this.stageManager == null){
            this.stageManager = director.getScene().getChildByName("Canvas").getComponentInChildren(StageManager);
        }
        /*
         * 1.加载玩家模型
         * 2.加载武器
         * 3.加载操控UI界面
         * 4.加载地图
         * etc..
         */
        let chara = GameManager.instance().mCharacter;
        if(chara == undefined || chara == null){
            console.error("character data model is not existed");
        }

        await DataManager.instance().loadCharacterPrefab(chara.id, (characterNode)=>{
            characterNode.setParent(director.getScene().getChildByName("Canvas").getChildByName("GameRoot"));
            chara.node = characterNode;
            characterNode.getComponent(PlayerController).init(chara);
        })
        console.log("character load complete")

        console.log("start to load weapon");
        for(let i = 0; i < chara.weapons.length; i++){
            let wp = chara.weapons[i];
            await DataManager.instance().loadWeaponPrefab(wp.id, (weaponNode)=>{
                weaponNode.setParent(chara.node);
                weaponNode.active = true;
                wp.node = weaponNode; // 绑定节点
                let wc = weaponNode.getComponent(WeaponBase);
                wc.setOwner(chara.node);
                console.log(`load weapon [${wp.name}] complete`);
            })
        }
        console.log("weapon load complete")
        
        this.enemys.forEach(e => {
            GameManager.instance().addEnemy(e);
        });

        console.log("start load Terrain");
        GameManager.instance().setStageManager(this.stageManager);
        this.stageManager.init();
        // 更新dynamic layer
        this.stageManager.addDynamicLayersNode(chara.node);
        for(let i = 0;i < this.enemys.length; i++){
            this.stageManager.addDynamicLayersNode(this.enemys[i]);
        }

        console.log("start load ui");
        await UIManager.instance().openUI("UIPlayerControl",(ui : UIPlayerControl) =>{
            ui.node.setParent(this.node.parent.getChildByName("Canvas").getChildByName("UIRoot"));
            ui.init();
        })
    }
}


