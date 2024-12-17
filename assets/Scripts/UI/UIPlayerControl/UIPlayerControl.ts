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
        this.actionButtons = [];//初始化

        this.joyStick = this.joyStickRoot.getComponent(JoyStick);
        if(!this.joyStick){
            error("cant find joy stick");
        }
        //初始化滚轮，内置绑定玩家
        this.joyStick.init();

        let abtnsRoot = this.node.getChildByName("ActionButtons");
        let abtns = abtnsRoot.getComponentsInChildren(Button);

        let weps = mc.weapons;
        abtns.forEach(btn => {
            let wpComponent = weps[0].node.getComponent(WeaponBase);
            this.actionButtons.push(btn);
            let btnAtk = btn.getComponent(BtnAttack);

            btnAtk?.init(wpComponent, wpComponent.onTouchStart, wpComponent.onTouchMove,
                wpComponent.onTouchEnd, wpComponent.onTouchCancel);
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


