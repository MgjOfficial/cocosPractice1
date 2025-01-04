import { _decorator, Button, Component, error, EventTouch, Node, NodeEventType, Vec2, Vec3 } from 'cc';
import { JoyStick } from './JoyStick';
import { UIBase } from '../UIBase';
import { BtnAttack } from './BtnAttack';
import { MCharacter } from '../../Model/MCharacter';
import { GameManager } from '../../Manager/GameManager';
import { WeaponBase } from '../../Controller/Weapon/WeaponBase';
const { ccclass, property } = _decorator;

@ccclass('UIPlayerControl')
export class UIPlayerControl extends UIBase {

    mplayer : MCharacter;

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

    
    public init() {
        let mc = GameManager.instance().mCharacter;
        let actionBtnsRoot = this.node.getChildByName("ActionButtons");
        let actionBtns = actionBtnsRoot.getComponentsInChildren(Button);

        this.actionButtons = [];//初始化
        actionBtns.forEach(btn => {
            this.actionButtons.push(btn);
        })

        this.joyStick = this.joyStickRoot.getComponent(JoyStick);
        if(!this.joyStick){
            error("cant find joy stick");
        }
        //初始化滚轮，内置绑定玩家
        this.joyStick.init();

        let weps = mc.weapons;
        let wpComponent = weps[0].node.getComponent(WeaponBase);
        
        let normalAttack = this.actionButtons[0].getComponent(BtnAttack);
        normalAttack?.init(wpComponent, wpComponent.onNormalTouchStart, wpComponent.onNormalTouchMove,
            wpComponent.onNormalTouchEnd, wpComponent.onNormalTouchCancel);

        let ultimateAttack = this.actionButtons[1].getComponent(BtnAttack);

        ultimateAttack?.init(wpComponent, wpComponent.onUltimateTouchStart, wpComponent.onUltimateTouchMove,
            wpComponent.onUltimateTouchEnd, wpComponent.onUltimateTouchCancel);
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


