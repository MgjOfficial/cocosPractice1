import { _decorator, Button, Component, Node, NodeEventType } from 'cc';
import { JoyStick } from './JoyStick';
import { UIBase } from '../UIBase';
const { ccclass, property } = _decorator;

@ccclass('UIPlayerControl')
export class UIPlayerControl extends UIBase {
    @property(Node)
    joyStickRoot : Node;
    joyStick : JoyStick;
    @property(Node)
    actionButtonsRoot : Node;

    @property
    actionButtons : Button[];

    @property
    optionButton : Button;

    protected start(): void {
        this.actionButtons = [];//初始化

        this.joyStick = this.joyStickRoot.getComponent(JoyStick);
        if(!this.joyStick){
            this.joyStick = this.joyStickRoot.addComponent(JoyStick);
        }

        // this.addActionBtnListener(1,this.funcTest.bind(this));

        let abtnsRoot = this.node.getChildByName("ActionButtons");
        let abtns = abtnsRoot.getComponentsInChildren(Button);
        abtns.forEach(btn => {
            this.actionButtons.push(btn);
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


