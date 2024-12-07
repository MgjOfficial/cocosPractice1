import { _decorator, Component, Node } from 'cc';
import { AttackerInfo, CalculationUtil, DefenderInfo } from '../Common/CalculationUtil';
import { MEnemy } from '../Model/MEnemy';
import { UIEntityEnemy } from '../UI/GameEntity/UIEntityEnemy';
import { DataManager } from '../Manager/DataManager';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
    
    protected info : MEnemy;

    ui : UIEntityEnemy;

    protected start(): void {
        //test
        this.init(DataManager.instance().getEnemyInfo(1));
        this.ui = this.node.getComponent(UIEntityEnemy);
        this.ui.init(this.info);
        //死亡测试
        this.info.onDead.on('dead',()=>{
            console.log("Enemy dead");
            this.node.destroy();
        })
    }
    public init(info : MEnemy){
        this.info = info;
    }
    public onHit(atkInfo : AttackerInfo, attackerCallBack : Function){

        let defInfo : DefenderInfo = {
            def : this.info.defend,
        }
        CalculationUtil.attackCauculation(atkInfo, defInfo, attackerCallBack, (damage : number) => {
            //console.log(`get demage ${damage}`);
            this.info.hpChange(-damage);
        });

        
    }
}


