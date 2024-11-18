import { _decorator, Component, EventTouch, Node } from 'cc';
import { MWeapon } from '../../Model/MWeapon';
const { ccclass, property } = _decorator;
@ccclass('WeaponBase')
export class WeaponBase extends Component {

    protected owner : Node; // 武器拥有者
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
    protected attackDetection(target : any){};


    // 设置拥有者
    public setOwner(owner : Node){
        this.owner = owner;
    }

    // 检测当前是不是在cd中
    public checkInFireCD():boolean{
        const currentTimestamp = Date.now();
        const difInSeconds = Math.floor((currentTimestamp - this.lastAtkTimestamp) / 1000);
        return !(difInSeconds > this.info.cooldown);
    }
    
    // UI方法，在ui中进行事件回调注册
    // 当指定按钮按下
    public onTouchStart(e : EventTouch){
        console.log("weapon base on touch start");
    }
    // 当指定按钮按下并拖动
    public onTouchMove(e : EventTouch){

    }
    // 当指定按钮在ui范围内松开
    public onTouchEnd(e : EventTouch){
        console.log("weapon base on touch end");
    }
    // 当指定按钮在ui范围外松开
    public onTouchCancel(e : EventTouch){
        console.log("weapon base on touch cancel");
    }
}


