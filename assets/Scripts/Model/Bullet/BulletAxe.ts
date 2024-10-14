import { _decorator, Collider2D, Component, Contact2DType, debug, IPhysics2DContact, Node, Vec3 } from 'cc';
import { BulletBase } from './BulletBase';
const { ccclass, property } = _decorator;

@ccclass('BulletAxe')
export class BulletAxe extends BulletBase {

    private dir : Vec3 = null;
    private speed : number = 500;
    

    protected start(): void {
        this.coll = this.getComponent(Collider2D);
        if (this.coll) {
            this.coll.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }


    }
    

    init(originPos : Vec3, targetPos : Vec3){

        //console.log("[bullet] origin:" + originPos + " target:" + targetPos);

        this.dir = targetPos.subtract(originPos).normalize();
        
    }

    update(deltaTime: number) {
        if(this.dir != null){
            const pos = this.node.position;
            const targetPos = new Vec3(pos.x + this.dir.x * this.speed * deltaTime, pos.y + this.dir.y * this.speed * deltaTime, pos.z);
            this.node.setPosition(targetPos);
        }
        
    }

    //开始碰撞

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        if(otherCollider.tag == 10){
            //碰撞检测:敌对
            console.log('on hit');
            setTimeout(()=> {
                if(this.node && this.node.isValid) {
                  selfCollider.node.destroy();
                }
              }, 1);
        }
        
        
    }

    
}


