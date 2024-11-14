import { _decorator, Collider2D, Color, Component, Contact2DType, EventTouch, Game, Graphics, IPhysics2DContact, math, MATH_FLOAT_ARRAY, misc, Node, NodeSpace, PolygonCollider2D, v2, Vec2, Vec3 } from 'cc';
import { WeaponBase } from './WeaponBase';
import { GameManager } from '../../Manager/GameManager';
import { EnemyController } from '../../Controller/EnemyController';
const { ccclass, property } = _decorator;


@ccclass('WeaponMomoi')
export class WeaponMomoi extends WeaponBase {

    // UI相关
    @property(Node)
    skillIndicatorNode : Node;
    touchStartPos : Vec2;
    touchEndPos : Vec2;

    // 攻击判定相关

    @property(Number)
    fanRadius : number = 300;
    @property(Number)
    startAngle : number = -23;
    @property(Number)
    endAngle : number = 23;


    onTouchStart(e : EventTouch){
        //this 指的是传入on的target，以当前对象传入才可以正确调用this.xxx
        this.skillIndicatorNode.active = true;
        this.skillIndicatorNode.setWorldPosition(GameManager.instance().mCharacter.node.worldPosition);
        this.touchStartPos = e.getUILocation();
        //console.log(`weapon momoi on touch start, pos ${this.touchStartPos}`);
    }
    onTouchMove(e : EventTouch){
        this.skillIndicatorNode.setWorldPosition(GameManager.instance().mCharacter.node.worldPosition);

        let tarPos = e.getUILocation();
        var dx = tarPos.x - this.touchStartPos.x;
        var dy = tarPos.y - this.touchStartPos.y;
        var dir = v2(dx,-dy); // ui和实际朝向在y轴上相反
        var angle = dir.signAngle(v2(1,0));
        var degree = angle / Math.PI * 180;
        //console.log(`deg : ${degree}`)
        this.skillIndicatorNode.angle = degree;

    }
    onTouchEnd(e : EventTouch){
        this.onTouchEndMerge(e);
    }
    onTouchCancel(e : EventTouch){
        this.onTouchEndMerge(e);
    }

    onTouchEndMerge(e:EventTouch){
        this.skillIndicatorNode.active = false;
        this.touchEndPos = e.getUILocation();
        let targetDirection = v2(this.touchEndPos.x - this.touchStartPos.x, 
            this.touchEndPos.y - this.touchStartPos.y).normalize();

        //this.attackDetectionDraw();
        // todo:计算最后的角度，调整角度
        this.attackDetection(targetDirection);
    }

   
    attackDetection(targetDirection : Vec2): void {
        let count = 0;
        const faceAngle = misc.radiansToDegrees(Math.atan2(targetDirection.y, targetDirection.x));
        this.attackDetectionDraw(targetDirection);
        //console.log(`face angle [${faceAngle}], atk angle range[${faceAngle + this.endAngle} , ${faceAngle + this.startAngle}]`);
        this.schedule(function(){
            console.log(`atk detect : [round ${count++}]`);
            const enemys = GameManager.instance().emenys;
            const player = GameManager.instance().mCharacter.node;
            const playerPos = player.position;
            enemys.forEach(e => {
                const enemyPos = e.position;
                const distance = Math.sqrt((enemyPos.x - playerPos.x)*(enemyPos.x - playerPos.x) +
                    (enemyPos.y - playerPos.y)*(enemyPos.y - playerPos.y));
                if(distance > this.fanRadius){
                    return;
                }
                const direction = v2(enemyPos.x - playerPos.x, enemyPos.y - playerPos.y).normalize();
                let radian = Math.atan2(direction.y, direction.x); // 计算弧度
                let angle = misc.radiansToDegrees(radian);
                //console.log(angle); // 角度正确，可以使用，需要修改forward的初始值，该计算范围为-180~180
                if(angle <= faceAngle + this.endAngle && angle >= faceAngle + this.startAngle){
                    //console.log(`[${e.name}] in target`);
                    e.getComponent(EnemyController).onHit();
                }

                
            });
            if(count == 2){
                this.attackDetectionDrawClean();
            }
        }, 0.5, 2);
        
    }

    // 攻击判定框辅助线测试绘制
    attackDetectionDraw(targetDirection : Vec2){
        let playerNode = GameManager.instance().mCharacter.node;
        let centerPos = v2(playerNode.position.x - this.node.position.x,playerNode.position.y - this.node.position.y);
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

    attackDetectionDrawClean(){
        this.node.getComponent(Graphics).clear();
    }

    

    
}


