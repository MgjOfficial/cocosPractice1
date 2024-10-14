import { _decorator, Button, Component, Node, Prefab } from 'cc';
import { UIMapSelect } from './UIMapSelect';
const { ccclass, property } = _decorator;

@ccclass('MapButton')
export class MapButton extends Component {
    @property({
        type : Number,
    })
    mapIdx : number;

    root : UIMapSelect;
    btn : Button;

    protected onLoad(): void {
        this.btn = this.node.getComponent(Button);
        this.node.on(Button.EventType.CLICK, this.onMapSelected, this);
    }
    protected onDestroy(): void {
        this.node.off(Button.EventType.CLICK, this.onMapSelected, this);
    }

    setParent(ui : UIMapSelect){
        this.root = ui;
    }

    onMapSelected(){
        this.root.mapSelect(this.mapIdx);
    }
}


