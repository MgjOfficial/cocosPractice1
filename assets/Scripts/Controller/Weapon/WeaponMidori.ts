import { _decorator, Collider2D, Color, Component, Contact2DType, EventTouch, Game, Graphics, IPhysics2DContact, math, MATH_FLOAT_ARRAY, misc, Node, NodeSpace, PolygonCollider2D, v2, Vec2, Vec3 } from 'cc';
import { WeaponBase } from './WeaponBase';
import { GameManager } from '../../Manager/GameManager';
import { EnemyController } from '../../Controller/EnemyController';
const { ccclass, property } = _decorator;


@ccclass('WeaponMidori')
export class WeaponMidori extends WeaponBase {

    @property(Node)
    skillIndicatorNode : Node;
    // attack range

    @property({
        type:Number,
        displayName:"攻击范围起始半径",
    })
    startRangeRadius : number = 100;

    @property({
        type:Number,
        displayName:"攻击范围最大半径",
    })
    maxRangeRadius : number = 400;

    @property({
        type:Number,
        displayName:"攻击范围增长速度",
    })
    rangeRadiusIncreaseRate : number = 20;

    @property({
        type:Number,
        displayName:"初始目标数",
    })
    startTargetNum : number = 3;

    @property({
        type:Number,
        displayName:"目标数增长速度(间隙)",
    })
    targetIncreaseInterval : number = 0.5;

    @property({
        type:Number,
        displayName:"最大目标数",
    })
    maxTargetNum : number = 6;

    private currentTargetNum : number;
    private currentRangeRadius : number;

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

    // 开始充能/蓄力攻击
    private startAttackCharge(){
        this.touching = true;
        this.elapsedTime = 0;
        this.currentTargetNum = this.startTargetNum;
        this.currentRangeRadius = this.startRangeRadius;
    }

    private attackChargeUpdate(deltaTime: number){
        this.elapsedTime += deltaTime;
        if(this.elapsedTime >= this.targetIncreaseInterval && this.currentTargetNum < this.maxTargetNum){
            this.currentTargetNum += 1;
            console.log(`curTarNum : ${this.currentTargetNum}, maxTarNum : ${this.maxTargetNum}`);
            this.elapsedTime -= this.targetIncreaseInterval;
        }
        if(this.currentRangeRadius < this.maxRangeRadius){
            this.currentRangeRadius += this.rangeRadiusIncreaseRate * deltaTime;
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
    }

    // 攻击判定框辅助线测试绘制
    private attackDetectionDraw(){
        let graphics = this.node.getComponent(Graphics);
        graphics.clear();
        graphics.lineWidth = 5;
        graphics.circle(this.skillIndicatorNode.position.x, this.skillIndicatorNode.position.y, this.currentRangeRadius);
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


