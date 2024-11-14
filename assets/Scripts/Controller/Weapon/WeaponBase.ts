import { _decorator, Component, EventTouch, Node } from 'cc';
import { MWeapon } from '../../Model/MWeapon';
const { ccclass, property } = _decorator;
@ccclass('WeaponBase')
export class WeaponBase extends Component {

    protected owner : Node;
    //武器参数
    protected weaponName : string;
    protected attack : number;      //攻击力    
    protected cooldown : number;    //攻击间隔，冷却

    //辅助数据
    protected lastAtkTimestamp : number;

    protected data : MWeapon;

    public setOwner(owner : Node){
        this.owner = owner;
    }

    public init(name : string, attack : number, cooldown :number) : void {

        this.attack = attack;
        this.cooldown = cooldown;

        this.lastAtkTimestamp = Date.now() - cooldown * 1000;
    }


    // //攻击判定
    // todo: 攻击判定以每个武器自己特有的范围判断,在武器内单独定制判断，重载的时候any可以替换成别的类型
    protected attackDetection(target : any) : void{};



    //检测当前是不是在cd中
    public checkInFireCD():boolean{
        const currentTimestamp = Date.now();
        const difInSeconds = Math.floor((currentTimestamp - this.lastAtkTimestamp) / 1000);
        return !(difInSeconds > this.cooldown);
    }
    
    //UI方法，在ui中进行事件回调注册
    //当指定按钮按下
    onTouchStart(e : EventTouch){
        console.log("weapon base on touch start");
    }
    //当指定按钮按下并拖动
    onTouchMove(e : EventTouch){

    }
    //当指定按钮在ui范围内松开
    onTouchEnd(e : EventTouch){
        console.log("weapon base on touch end");
    }
    //当指定按钮在ui范围外松开
    onTouchCancel(e : EventTouch){
        console.log("weapon base on touch cancel");
    }
}


