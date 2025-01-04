import { _decorator, Component, EventTouch, Node, Vec2 } from 'cc';
import { MWeapon } from '../../Model/MWeapon';
import { PlayerController } from '../PlayerController';
const { ccclass, property } = _decorator;
@ccclass('WeaponBase')
export class WeaponBase extends Component {

    protected owner : PlayerController; // 武器拥有者
    protected lastAtkTimestamp : number; //上次攻击事件
    protected info : MWeapon;
    public init(data : MWeapon) : void {
        this.info = data;
        this.lastAtkTimestamp = Date.now() - this.info.cooldown * 1000;
        this.analyzeRangeArray();
    }

    // 解析范围数组
    protected analyzeRangeArray(){};
    
    // 攻击判定以每个武器自己特有的范围判断,在武器内单独定制判断，重载的时候any可以替换成别的类型
    protected ultimateDetection(target : any){};


    // 设置拥有者
    setOwner(owner : PlayerController){
        this.owner = owner;
    }

    // 检测当前是不是在cd中
    checkInFireCD():boolean{
        const currentTimestamp = Date.now();
        const difInSeconds = Math.floor((currentTimestamp - this.lastAtkTimestamp) / 1000);
        return !(difInSeconds > this.info.cooldown);
    }
    
    // UI方法，在ui中进行事件回调注册

    // Normal attack
    onNormalTouchStart(e : EventTouch){}
    onNormalTouchMove(e : EventTouch){}
    onNormalTouchEnd(e : EventTouch){}
    onNormalTouchCancel(e : EventTouch){}

    // Ultimate attack
    onUltimateTouchStart(e : EventTouch){}
    onUltimateTouchMove(e : EventTouch){}
    onUltimateTouchEnd(e : EventTouch){}
    onUltimateTouchCancel(e : EventTouch){}
}


