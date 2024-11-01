import { _decorator, Component, EventTouch, Node } from 'cc';
import { MPlayer } from '../MPlayer';
const { ccclass, property } = _decorator;

@ccclass('WeaponBase')
export class WeaponBase extends Component {

    protected owner : Node;
    //武器参数
    protected weaponName : string;
    protected attack : number;      //攻击力    
    protected cooldown : number;    //攻击间隔，冷却
    protected range : number;       //攻击范围
    protected scale : number;       //判定尺寸

    //辅助数据
    protected lastAtkTimestamp : number;

    public setOwner(owner : Node){
        this.owner = owner;
    }

    public init(name : string, attack : number, cooldown :number, range : number, scale: number ) : void {

        this.attack = attack;
        this.cooldown = cooldown;
        this.range = range;
        this.scale = scale;

        this.lastAtkTimestamp = Date.now() - cooldown * 1000;
    }


    //待继承方法

    //执行武器的攻击行为(normal attack)
    fire(owner : MPlayer):void{};


    // output(){
    //     console.log("weapon base output");
    // }

    //公共方法


    //检测当前是不是在cd中
    public checkInFireCD():boolean{
        const currentTimestamp = Date.now();
        const difInSeconds = Math.floor((currentTimestamp - this.lastAtkTimestamp) / 1000);
        return !(difInSeconds > this.cooldown);
    }
    
    //UI方法
    onTouchStart(e : EventTouch){
        console.log("weapon base on touch start");
    }
    onTouchMove(e : EventTouch){

    }
    onTouchEnd(e : EventTouch){
        console.log("weapon base on touch end");
    }
    onTouchCancel(e : EventTouch){
        console.log("weapon base on touch cancel");
    }
}


