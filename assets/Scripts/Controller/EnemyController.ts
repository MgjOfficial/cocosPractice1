import { _decorator, Component, Node } from 'cc';
import { AttackerInfo, CalculationUtil, DefenderInfo } from '../Common/CalculationUtil';
import { MEnemy } from '../Model/MEnemy';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
    
    protected info : MEnemy;
    protected start(): void {
        //test
        this.init(new MEnemy(1, "Enemy", 100, 10, 10, 5))
    }
    public init(info : MEnemy){
        this.info = info;
    }
    public onHit(atkInfo : AttackerInfo, attackerCallBack : Function){

        let defInfo : DefenderInfo = {
            def : this.info.defend,
        }
        CalculationUtil.attackCauculation(atkInfo, defInfo, attackerCallBack, (damage : number) => {
            console.log(`get demage ${damage}`)
        });
    }
}


