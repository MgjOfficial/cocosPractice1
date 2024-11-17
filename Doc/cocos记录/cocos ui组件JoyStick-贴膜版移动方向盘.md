@[TOC] cocos-JoyStick

# 制作cocos中的pe端移动舵盘-JoyStick

记录自己使用cocos的学习历程

## 目标：编写移动舵盘

因为cocos是便于制作手游的引擎，所以学会适配手游的操作系统也是必要的，这次直接当做手游去练习了

### 节点

UI组件都在convas下

JoyStick->Pole(中心点)，Disk(方向显示)

调整JoyStick的UITransform，这个东西的大小决定该ui识别触碰的范围


舵盘组件代码

```typescript

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
        this.playerController.stopMove();
    }


}


```


主要使用Touch_xxx相关的事件，然后获取朝向，调用绑定的玩家控制器的方法

### 注意事项
事件Touch_End : 在控制范围内手指离开屏幕

事件Touch_Cancle : 在控制范围外手指离开屏幕

两者一般不会同时触发，不是离开控制范围就会触发end，需要停止触摸屏幕才会触发以上事件其中之一