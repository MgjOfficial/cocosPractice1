import { _decorator, Component, Node } from 'cc';
import { UIManager } from '../Manager/UIManager';
const { ccclass, property } = _decorator;

@ccclass('UIBase')
export class UIBase extends Component { 
    //提供一系列ui基本功能,初始化，关闭

    protected onClose() : void{
        UIManager.instance().closeUI(this, true);

    }

    protected onHidden() : void{
        UIManager.instance().closeUI(this, false);
    }

}


