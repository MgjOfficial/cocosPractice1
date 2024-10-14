import { _decorator, Button, Component, EventHandheld, EventHandler, Node } from 'cc';
import { ButtonList_Button } from './ButtonList_Button';
const { ccclass, property } = _decorator;

@ccclass('ButtonList_Root')
export class ButtonList_Root extends Component {
    btnList : ButtonList_Button[] = [];
    public curSelIdx : number;

    protected onLoad(): void {
        this.curSelIdx = -1;
        this.btnList = this.node.getComponentsInChildren(ButtonList_Button);

        //todo:该idx需要根据角色id优化，目前仅为通用的从1开始
        let idx = 1;
        this.btnList.forEach(btn => {
            btn.root = this;
            btn.idx = idx;
            idx += 1;
        });
    }


    public onClick(tarBtn : ButtonList_Button) : void{
        this.btnList.forEach(btn => {
            btn.setActive(tarBtn == btn);
        });

        this.curSelIdx = tarBtn.idx;
    }


}