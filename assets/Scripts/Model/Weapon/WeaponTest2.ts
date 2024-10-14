import { _decorator, Component, director, instantiate, Node, Prefab, Root, Scene, Vec3 } from 'cc';
import { WeaponBase } from './WeaponBase';
import { MPlayer } from '../MPlayer';
import { BulletAxe } from '../Bullet/BulletAxe';
const { ccclass, property } = _decorator;


@ccclass('WeaponTest2')
export class WeaponTest2 extends WeaponBase {

    @property(Prefab)
    bullet : Prefab;


    fire(owner : MPlayer) : void{
        // //获取玩家信息
        // const ctrl = owner.getController();
        // const playerPos = ctrl.node.position;
        // const tarPos = ctrl.curTarget;

        // //生成子弹
        // const b = instantiate(this.bullet);
        // b.setParent(director.getScene().getChildByName("Canvas"));
        // b.setPosition(playerPos);
        // b.getComponent(BulletAxe).init(playerPos, tarPos);

        // //设置上次攻击时间
        // this.lastAtkTimestamp = Date.now();
    }

    //测试方法
    public output(): void {
        console.log("weapon test2");
    }
}


