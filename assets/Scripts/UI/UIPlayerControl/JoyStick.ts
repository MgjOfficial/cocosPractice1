import { _decorator, Component, director, error, EventTouch, Node, NodeEventType, UITransform, Vec3 } from 'cc';
import { PlayerController } from '../../Controller/PlayerController';
const { ccclass, property } = _decorator;

@ccclass('JoyStick')
export class JoyStick extends Component {

    dish : Node = null;
    pole : Node = null;

    @property
    moveableRadio : number;

    
    playerController : PlayerController;


    start() {
        //获取方向和圆球节点
        this.dish = this.node.getChildByName("Dish");
        this.pole = this.node.getChildByName("Pole");

        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

        this.bindController();
    }

    //绑定玩家控制器(可能在其他重置的情况下需要再次调用)
    bindController():void{
        let rootNode = director.getScene().getChildByName("Canvas");
        let ctrl = rootNode.getComponentInChildren(PlayerController);

        if(ctrl){
            console.log("binded player controller.");
            this.playerController = ctrl;
        }
        else{
            error("cant find player controller.");
        }
    }
    
    onTouchStart(e:EventTouch):void {
        let pos_touch = e.getUILocation();
        let uiTransform = this.node.getComponent(UITransform);
        let pos_nodeSpace = uiTransform.convertToNodeSpaceAR(new Vec3(pos_touch.x, pos_touch.y, 0));

        this.pole.setPosition(pos_nodeSpace);
    }

    onTouchMove(e:EventTouch):void {
        let pos_touch = e.getUILocation();
        let uiTransform = this.node.getComponent(UITransform);
        let pos_nodeSpace = uiTransform.convertToNodeSpaceAR(new Vec3(pos_touch.x, pos_touch.y, 0));

        //限制小球的移动范围
        let distance = Vec3.distance(Vec3.ZERO, pos_nodeSpace);
        if(distance > this.moveableRadio){
             Vec3.multiplyScalar(pos_nodeSpace, pos_nodeSpace.normalize(), this.moveableRadio);
        }

        this.pole.setPosition(pos_nodeSpace);


        this.playerController.move(pos_nodeSpace.normalize(),1);
    }

    onTouchEnd(e:EventTouch) {
        this.pole.setPosition(new Vec3(0,0,0));
        this.playerController.stopMove();
    }

    onTouchCancel(e:EventTouch) {
        this.pole.setPosition(new Vec3(0,0,0));
    }


}


