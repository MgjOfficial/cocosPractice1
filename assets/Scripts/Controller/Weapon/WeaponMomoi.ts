import { _decorator, Collider2D, Color, Component, Contact2DType, EventTouch, Game, Graphics, IPhysics2DContact, math, MATH_FLOAT_ARRAY, misc, Node, NodeSpace, PolygonCollider2D, v2, Vec2, Vec3 } from 'cc';
import { WeaponBase } from './WeaponBase';
import { GameManager } from '../../Manager/GameManager';
import { EnemyController } from '../../Controller/EnemyController';
import { AttackerInfo } from '../../Common/CalculationUtil';
const { ccclass, property } = _decorator;


@ccclass('WeaponMomoi')
export class WeaponMomoi extends WeaponBase {

    // UI相关
    @property(Node)
    skillIndicatorNode : Node;
    touchStartPos : Vec2;
    touchEndPos : Vec2;

    fanRadius : number;
    startAngle : number;
    endAngle : number;
    protected analyzeRangeArray(): void {

        if(this.info.rangeArray.length != 3){
            console.error("rangeArray length error");
            return;
        }

        this.fanRadius = this.info.rangeArray[0];
        this.startAngle = this.info.rangeArray[1];
        this.endAngle = this.info.rangeArray[2];
    }

    onUltimateTouchStart(e : EventTouch){
        //this 指的是传入on的target，以当前对象传入才可以正确调用this.xxx
        this.skillIndicatorNode.active = true;
        this.skillIndicatorNode.setWorldPosition(GameManager.instance().mCharacter.node.worldPosition);
        this.touchStartPos = e.getUILocation();
    }
    onUltimateTouchMove(e : EventTouch){
        this.skillIndicatorNode.setWorldPosition(GameManager.instance().mCharacter.node.worldPosition);

        let tarPos = e.getUILocation();
        var dx = tarPos.x - this.touchStartPos.x;
        var dy = tarPos.y - this.touchStartPos.y;
        var dir = v2(dx,-dy); // ui和实际朝向在y轴上相反
        var angle = dir.signAngle(v2(1,0));
        var degree = angle / Math.PI * 180;
        this.skillIndicatorNode.angle = degree;

    }
    onUltimateTouchEnd(e : EventTouch){
        this.onTouchEndMerge(e);
    }
    onUltimateTouchCancel(e : EventTouch){
        this.onTouchEndMerge(e);
    }

    onTouchEndMerge(e:EventTouch){
        this.skillIndicatorNode.active = false;
        this.touchEndPos = e.getUILocation();
        let targetDirection = v2(this.touchEndPos.x - this.touchStartPos.x, 
            this.touchEndPos.y - this.touchStartPos.y).normalize();

        //this.attackDetectionDraw();
        // todo:计算最后的角度，调整角度
        this.ultimateDetection(targetDirection);
    }
   
    ultimateDetection(targetDirection : Vec2): void {
        let count = 0;
        let faceAngle = misc.radiansToDegrees(Math.atan2(targetDirection.y, targetDirection.x));
        let atkInfo : AttackerInfo = {
            atk : this.info.attack,
        }
        this.attackDetectionDraw(targetDirection);
        //console.log(`face angle [${faceAngle}], atk angle range[${faceAngle + this.endAngle} , ${faceAngle + this.startAngle}]`);
        this.schedule(function(){
            console.log(`atk detect : [round ${count++}]`);
            let enemys = GameManager.instance().emenys;
            let centerPos = this.owner.getCenter();
            enemys.forEach(e => {
                let enemyPos = e.position;
                let distance = Math.sqrt((enemyPos.x - centerPos.x)*(enemyPos.x - centerPos.x) +
                    (enemyPos.y - centerPos.y)*(enemyPos.y - centerPos.y));
                if(distance > this.fanRadius){
                    return;
                }
                let direction = v2(enemyPos.x - centerPos.x, enemyPos.y - centerPos.y).normalize();
                let radian = Math.atan2(direction.y, direction.x); // 计算弧度
                let angle = misc.radiansToDegrees(radian);
                if(angle <= faceAngle + this.endAngle && angle >= faceAngle + this.startAngle){
                    e.getComponent(EnemyController).onHit(atkInfo, (dmg : number)=>{
                        console.log(`deal damage [${dmg}] to ${e.name}`);
                    });
                }

            });
            if(count == 2){
                this.attackDetectionDrawClean();
            }
        }, 0.5, 2);
        
    }

    

    // 攻击判定框辅助线测试绘制
    attackDetectionDraw(targetDirection : Vec2){
        let centerPos = this.owner.getCenterPosition();
        const graphics = this.node.getComponent(Graphics);

        // 初始化一下Graphics的绘制参数
        graphics.strokeColor = Color.RED; // 绘制笔的颜色
        graphics.lineWidth = 5; // 线段粗度
        
        // 计算指向目标弧度
        const targetAngle = misc.radiansToDegrees(Math.atan2(targetDirection.y, targetDirection.x));

        // 绘制圆弧
        graphics.arc(centerPos.x, centerPos.y, this.fanRadius, misc.degreesToRadians(this.startAngle + targetAngle),
            misc.degreesToRadians(this.endAngle + targetAngle),true);
        
        // 圆弧终点连接圆心
        graphics.lineTo(centerPos.x, centerPos.y);

        // 计算圆弧的起点
        const angleInRadian = misc.degreesToRadians(targetAngle + this.startAngle); // 角度转弧度
        const directorVector = v2(Math.cos(angleInRadian), Math.sin(angleInRadian)); // 弧度计算向量
        const arcStartPoint = v2(centerPos.x + directorVector.x * this.fanRadius, centerPos.y + directorVector.y * this.fanRadius);

        // 圆心连接圆弧起点
        graphics.lineTo(arcStartPoint.x, arcStartPoint.y);

        // 绘制路径
        graphics.stroke();
    }

    private attackDetectionDrawClean(){
        this.node.getComponent(Graphics).clear();
    }
    
}


