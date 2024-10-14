import { _decorator, Component, Node, Prefab } from 'cc';
import { ButtonList_Root } from '../Common/ButtonList_Root';
import { UIPrepare } from './UIPrepare';
const { ccclass, property } = _decorator;

@ccclass('UIBuildSelect')
export class UIBuildSelect extends Component {
    @property(ButtonList_Root)
    charSel : ButtonList_Root;

    public root :UIPrepare;

    public getSelectedChar() : number{
        //console.log("curselidx" + this.charSel.curSelIdx);
        return this.charSel.curSelIdx;
    }

}


