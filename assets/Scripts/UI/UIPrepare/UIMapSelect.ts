import { _decorator, Component, Node } from 'cc';
import { UIPrepare } from './UIPrepare';
import { MapButton } from './MapButton';
const { ccclass, property } = _decorator;

@ccclass('UIMapSelect')
export class UIMapSelect extends Component {

    public root : UIPrepare;
    

    protected onLoad(): void {
        let mapList = this.node.getComponentsInChildren(MapButton);
        mapList.forEach(map => {
            map.root = this;
        });
    }

    public mapSelect(idx : number){
        this.root.enterGame(idx);
    }

}


