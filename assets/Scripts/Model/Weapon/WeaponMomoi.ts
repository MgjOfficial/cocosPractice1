import { _decorator, Component, EventTouch, misc, Node, v2, Vec2, Vec3 } from 'cc';
import { WeaponBase } from './WeaponBase';
import { MPlayer } from '../MPlayer';
import { GameManager } from '../../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('WeaponMomoi')
export class WeaponMomoi extends WeaponBase {

    fire(owner : MPlayer) : void{
        
    }

    // output(): void {
    //     super.output();
    //     console.log("weapon momoi output")
    // }


    //UI相关

    

    @property(Node)
    skill_area : Node;

    startPos : Vec2;
    endPos : Vec2;
    
    protected start(): void {
        //此处this.skill_area与事件触发的this.skill_area不相同
        console.log(this.skill_area);
    }

    onTouchStart(e : EventTouch){
        //this 指的是传入on的target，以当前对象传入才可以正确调用this.xxx
        this.skill_area.active = true;
        this.skill_area.setWorldPosition(GameManager.instance().player.node.worldPosition);
        this.startPos = e.getUILocation();
        console.log(`weapon momoi on touch start, pos ${this.startPos}`);
    }
    onTouchMove(e : EventTouch){
        this.skill_area.setWorldPosition(GameManager.instance().player.node.worldPosition);

        let tarPos = e.getUILocation();
        var dx = tarPos.x - this.startPos.x;
        var dy = tarPos.y - this.startPos.y;
        var dir = v2(dx,-dy); //ui和实际朝向在y轴上相反
        var angle = dir.signAngle(v2(1,0));
        var degree = angle / Math.PI * 180;
        //console.log(`deg : ${degree}`)
        this.skill_area.angle = degree;

    }
    onTouchEnd(e : EventTouch){
        this.skill_area.active = false;
        this.endPos = e.getUILocation();
        console.log(`weapon momoi on touch end, pos ${this.endPos}`);
    }
    onTouchCancel(e : EventTouch){
        this.skill_area.active = false;
        this.endPos = e.getUILocation();
        console.log(`weapon momoi on touch cancel, pos ${this.endPos}`);
    }
}


