import { _decorator, Component, EventHandheld, EventHandler, EventTouch, Node } from 'cc';
import { WeaponBase } from '../../Model/Weapon/WeaponBase';
const { ccclass, property } = _decorator;

@ccclass('Btn_Attack')
export class Btn_Attack extends Component {

    private onTouchStart : Function;
    private onTouchMove : Function;
    private onTouchEnd : Function;
    private onTouchCancel : Function;
    private target :  WeaponBase;

    public init(target : WeaponBase, onTouchStart : Function, onTouchMove : Function, onTouchEnd : Function, onTouchCancel :Function) {
        this.target = target;
        this.onTouchStart = onTouchStart;
        this.onTouchMove = onTouchMove;
        this.onTouchEnd = onTouchEnd;
        this.onTouchCancel = onTouchCancel;

        console.log(`btn_attack bind node : ${target.name}`);

        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this.target);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this.target);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this.target);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this.target);
    }

    protected onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this.target);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this.target);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this.target);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this.target);
    }

}


