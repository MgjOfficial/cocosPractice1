import { _decorator, Button, Component, director, Node } from 'cc';
import { UIBase } from './UIBase';
import { UIManager } from '../Manager/UIManager';
import { UIPlayerControl } from './UIPlayerControl/UIPlayerControl';
import { UIOption } from './UIOption';
import EventManager from '../Manager/EventManager';
import { UIPrepare } from './UIPrepare/UIPrepare';
const { ccclass, property } = _decorator;

@ccclass('UIMainMenu')
export class UIMainMenu extends UIBase {


    @property(Button)
    private buttonStart : Button;

    @property(Button)
    private buttonOption : Button;

    @property(Button)
    private buttonExit : Button;
    

    protected onLoad(): void {
        this.buttonStart.node?.on(Button.EventType.CLICK, this.onClickStart,this);
        this.buttonOption.node?.on(Button.EventType.CLICK, this.onClickOption,this);
        this.buttonExit.node?.on(Button.EventType.CLICK, this.onClickExit,this);
    }

    protected onDestroy(): void {
        this.buttonStart.node?.off(Button.EventType.CLICK, this.onClickStart,this);
        this.buttonOption.node?.off(Button.EventType.CLICK, this.onClickOption,this);
        this.buttonExit.node?.off(Button.EventType.CLICK, this.onClickExit,this);
    }


    onClickStart(): void{
        UIManager.instance().openUI("UIPrepare", (ui : UIPrepare)=>{
            ui.node.setParent(this.node.parent);
        });
    }

    onClickOption(): void{  
        UIManager.instance().openUI("UIOption",(ui : UIOption)=>{
            ui.node.setParent(this.node.parent);
        });
    }

    

    onClickExit(): void{
        
    }



}


