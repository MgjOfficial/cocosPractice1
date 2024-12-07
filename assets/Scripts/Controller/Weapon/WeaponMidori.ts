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
     * [0] : 攻击范围起始半径 default = 100
     * [1] : 攻击范围最大半径 default = 400
     * [2] : 攻击范围增长速度 default = 20
     * [3] : 初始目标数 default = 3
     * [4] : 目标数增长速度(间隙) default = 0.5
     * [5] : 最大目标数 default = 6
     */
    startRangeRadius : number;
    maxRangeRadius : number;
    rangeRadiusIncreaseRate : number;
    startTargetNum : number;
    targetIncreaseInterval : number;
    maxTargetNum : number;

    private currentTargetNum : number;
    private currentRangeRadius : number;
    private lockedTargets : Array<EnemyController> = [];

    private touching : boolean = false;
    private elapsedTime : number = 0;

    protected start(): void {
        // 此处this.skill_area与事件触发的this.skill_area不相同
    }

    protected update(deltaTime: number): void {
        if(this.touching){
            this.attackChargeUpdate(deltaTime);
        }
    }

    protected analyzeRangeArray(): void {
    
        if(this.info.rangeArray.length != 6){
            console.error("rangeArray length error");
            return;
        }
        // 解析数组并赋值
        this.startRangeRadius = this.info.rangeArray[0];
        this.maxRangeRadius = this.info.rangeArray[1];
        this.rangeRadiusIncreaseRate = this.info.rangeArray[2];
        this.startTargetNum = this.info.rangeArray[3];
        this.targetIncreaseInterval = this.info.rangeArray[4];
        this.maxTargetNum = this.info.rangeArray[5];
    }

    // 开始充能/蓄力攻击
    private startAttackCharge(){
        this.touching = true;
        this.elapsedTime = 0;
        this.currentTargetNum = this.startTargetNum;
        this.currentRangeRadius = this.startRangeRadius;
        this.lockedTargets = [];
    }

    private attackChargeUpdate(deltaTime: number){
        this.elapsedTime += deltaTime;
        if(this.elapsedTime >= this.targetIncreaseInterval && this.currentTargetNum < this.maxTargetNum){
            this.currentTargetNum += 1;
            this.elapsedTime -= this.targetIncreaseInterval;
        }
        if(this.currentRangeRadius < this.maxRangeRadius){
            this.currentRangeRadius += this.rangeRadiusIncreaseRate * deltaTime;
        }
        const player = GameManager.instance().mCharacter.node;
        const playerPos = player.position;

        // 目标检测
        for(let i = 0; i < GameManager.instance().emenys.length; i++){
            
            const enemy = GameManager.instance().emenys[i];
            const ctrl = enemy.getComponent(EnemyController);
            if(this.lockedTargets.indexOf(ctrl) != -1){
                continue;
            }
            const enemyPos = enemy.position;
            const distance = Math.sqrt((enemyPos.x - playerPos.x) * (enemyPos.x - playerPos.x) +
                                       (enemyPos.y - playerPos.y) * (enemyPos.y - playerPos.y));
            if(this.lockedTargets.length < this.currentTargetNum && distance < this.currentRangeRadius){
                this.lockedTargets.push(ctrl);
            }
        }

        this.attackDetectionDraw();
    }

    // 结束充能/蓄力攻击
    private endAttackCharge(){
        this.touching = false;
        this.attackDetection();
        this.node.getComponent(Graphics).clear();
    }

    // 攻击检测
    protected attackDetection() {
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

    // 攻击判定框辅助线测试绘制
    private attackDetectionDraw(){
        let graphics = this.node.getComponent(Graphics);
        graphics.clear();
        const player = GameManager.instance().mCharacter.node;
        const playerPos = player.position;
        const centerPos = v2(playerPos.x - this.node.position.x, playerPos.y - this.node.position.y);
        graphics.lineWidth = 5;
        graphics.circle(centerPos.x, centerPos.y, this.currentRangeRadius);
        graphics.stroke();
    }

    onTouchStart(e : EventTouch){
        //this 指的是传入on的target，以当前对象传入才可以正确调用this.xxx
        this.skillIndicatorNode.active = true;
        this.skillIndicatorNode.setWorldPosition(GameManager.instance().mCharacter.node.worldPosition);
        this.startAttackCharge();
    }
    onTouchMove(e : EventTouch){
    }
    onTouchEnd(e : EventTouch){
        this.onTouchEndMerge(e);
    }
    onTouchCancel(e : EventTouch){
        this.onTouchEndMerge(e);
    }

    onTouchEndMerge(e:EventTouch){
        this.skillIndicatorNode.active = false;

        this.endAttackCharge();
    }
}


