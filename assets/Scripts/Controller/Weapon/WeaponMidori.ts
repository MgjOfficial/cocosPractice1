import { _decorator, Collider2D, Color, Component, Contact2DType, EventTouch, Game, Graphics, IPhysics2DContact, math, MATH_FLOAT_ARRAY, misc, Node, NodeSpace, PolygonCollider2D, v2, Vec2, Vec3 } from 'cc';
import { WeaponBase } from './WeaponBase';
import { GameManager } from '../../Manager/GameManager';
import { EnemyController } from '../../Controller/EnemyController';
import { AttackerInfo } from '../../Common/CalculationUtil';
const { ccclass, property } = _decorator;


@ccclass('WeaponMidori')
export class WeaponMidori extends WeaponBase {

    @property(Node)
    skillIndicatorNode : Node;

    /* 
     * info.rangeArray 攻击范围与目标相关参数
     * [0] : 攻击范围半径 default = 300
     * [1] : 最大目标数 default = 5
     */
    rangeRadius : number;
    maxTargetNum : number;
    private lockedTargets : Array<EnemyController> = [];

    private touching : boolean = false;
    protected update(deltaTime: number): void {
        if(this.touching){
            this.updateUltimateCharge(deltaTime);
        }
    }

    protected analyzeRangeArray(): void {
    
        if(this.info.rangeArray.length != 2){
            console.error("rangeArray length error");
            return;
        }
        // 解析数组并赋值
        this.rangeRadius = this.info.rangeArray[0];
        this.maxTargetNum = this.info.rangeArray[1];

        console.log(`rangeRadius: ${this.rangeRadius}`);
        console.log(`maxTargetNum: ${this.maxTargetNum}`);
    }

    


    // Normal attack
    onNormalTouchStart(e : EventTouch){}
    onNormalTouchMove(e : EventTouch){}
    onNormalTouchEnd(e : EventTouch){}
    onNormalTouchCancel(e : EventTouch){}


    

    // Ultimate attack

    onUltimateTouchStart(e : EventTouch){
        //this 指的是传入on的target，以当前对象传入才可以正确调用this.xxx
        this.skillIndicatorNode.active = true;
        this.skillIndicatorNode.setWorldPosition(this.owner.getCenterPosition())
        this.startUltimateCharge();
    }
    onUltimateTouchMove(e : EventTouch){
    }
    onUltimateTouchEnd(e : EventTouch){
        this.onTouchEndMerge(e);
    }
    onUltimateTouchCancel(e : EventTouch){
        this.onTouchEndMerge(e);
    }

    onTouchEndMerge(e:EventTouch){
        this.skillIndicatorNode.active = false;

        this.endUltimateCharge();
    }

    // 开始按住终极技能按钮
    private startUltimateCharge(){
        this.touching = true;
        this.lockedTargets = [];
    }

    private updateUltimateCharge(deltaTime: number){
        const centerPos = this.owner.getCenterPosition();

        // 目标检测
        for(let i = 0; i < GameManager.instance().emenys.length; i++){   
            let enemy = GameManager.instance().emenys[i];
            let eCtrl = enemy.getComponent(EnemyController);
            if(this.lockedTargets.indexOf(eCtrl) != -1){
                continue;
            }
            const enemyPos = enemy.worldPosition;
            let distance = Math.sqrt((enemyPos.x - centerPos.x) * (enemyPos.x - centerPos.x) +
                                       (enemyPos.y - centerPos.y) * (enemyPos.y - centerPos.y));
            if(this.lockedTargets.length < this.maxTargetNum && distance < this.rangeRadius){
                this.lockedTargets.push(eCtrl);
            }
        }

        //this.attackDetectionDraw();
    }

    // 松开终极技能按钮
    private endUltimateCharge(){
        this.touching = false;
        this.ultimateDetection();
        this.node.getComponent(Graphics).clear();
    }

    // 终极技能攻击检测
    protected ultimateDetection() {
        const atkInfo : AttackerInfo = {
            atk : this.info.attack,
        }
        for(let i = 0; i < this.lockedTargets.length; i++){
            const target = this.lockedTargets[i];
            target.onHit(atkInfo, (dmg : number)=>{
                console.log(`deal damage [${dmg}] to ${target.name}`);
            });
        }

    }
}


