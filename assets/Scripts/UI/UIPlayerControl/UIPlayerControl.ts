import { _decorator, Button, Component, error, EventTouch, Node, NodeEventType, Vec2, Vec3 } from 'cc';
import { JoyStick } from './JoyStick';
import { UIBase } from '../UIBase';
import { Btn_Attack } from './Btn_Attack';
import { MPlayer } from '../../Model/MPlayer';
import { GameManager } from '../../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIPlayerControl')
export class UIPlayerControl extends UIBase {

    mplayer : MPlayer;

    @property(Node)
    joyStickRoot : Node;
    joyStick : JoyStick;
    @property(Node)
    actionButtonsRoot : Node;

    @property
    actionButtons : Button[];

    @property
    optionButton : Button;


    //技能释放测试
    startPos : Vec2 = new Vec2(0,0);
    curPos : Vec2 = new Vec2(0,0);
    tarPos : Vec2 = new Vec2(0,0);

    
    public init(): void {
        let mplayer = GameManager.instance().player;
        this.actionButtons = [];//初始化

        this.joyStick = this.joyStickRoot.getComponent(JoyStick);
        if(!this.joyStick){
            error("cant find joy stick");
        }
        //初始化滚轮，内置绑定玩家
        this.joyStick.init();


        let abtnsRoot = this.node.getChildByName("ActionButtons");
        let abtns = abtnsRoot.getComponentsInChildren(Button);

        let weps = mplayer.weapons_component;
        abtns.forEach(btn => {
            this.actionButtons.push(btn);
            let btn_atk = btn.getComponent(Btn_Attack);

            btn_atk?.init(weps[0], weps[0].onTouchStart, weps[0].onTouchMove, weps[0].onTouchEnd, weps[0].onTouchCancel);

            //sample init
            // btn_atk?.init(this.node, 
            // (e: EventTouch)=>{
            //     e.getUILocation(this.startPos);
            //     console.log(this.startPos);
            //     console.log("uiplayercontroller call on touch start");
            // },
            // (e: EventTouch)=>{
            //     e.getUILocation(this.curPos);
            //     console.log(this.curPos);
            //     console.log("uiplayercontroller call on touch move");
            // },
            // (e: EventTouch)=>{
            //     e.getUILocation(this.tarPos);
            //     console.log(this.tarPos);
            //     console.log("uiplayercontroller call on touch end");
            // },
            // (e: EventTouch)=>{
            //     e.getUILocation(this.tarPos);
            //     console.log(this.tarPos);
            //     console.log("uiplayercontroller call on touch cancel");
            // }
            // )
            
        });
    }




    /**
     * 给动作按钮组的按钮添加回调方法
     * @param idx 添加回调方法的按钮所在按钮组的下标
     * @param callback 回调方法
     */
    public addActionBtnListener(idx : number, callback : Function) {
        if(idx >= this.actionButtons.length){return;}
        this.actionButtons[idx].node.on(Button.EventType.CLICK, ()=>{
            callback();
        });
    }

    public removeActionBtnListener(idx : number, callback : Function){
        if(idx >= this.actionButtons.length){return;}
        this.actionButtons[idx].node.off(Button.EventType.CLICK, ()=>{
            callback();
        });
    }


    

}


