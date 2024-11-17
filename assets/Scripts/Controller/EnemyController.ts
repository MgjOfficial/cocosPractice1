import { _decorator, Component, Node } from 'cc';
import { AttackerInfo, CalculationUtil, DefenderInfo } from '../Common/CalculationUtil';
import { MEnemy } from '../Model/MEnemy';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
    
    enemyInfo : MEnemy;

    
    protected start(): void {
        //test
        this.init(new MEnemy(1, "Enemy", 100, 10, 10, 5))
    }
    init(enemyInfo : MEnemy){
        this.enemyInfo = enemyInfo;
    }
    onHit(atkInfo : AttackerInfo, attackerCallBack : Function){

        let defInfo : DefenderInfo = {
            def : this.enemyInfo.defend,
        }
        CalculationUtil.attackCauculation(atkInfo, defInfo, attackerCallBack, (damage : number) => {
            console.log(`get demage ${damage}`)
        });
    }
}


