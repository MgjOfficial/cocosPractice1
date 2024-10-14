import { _decorator, Component, error, Node, NodeEventType } from 'cc';
import { ButtonList_Root as ButtonList_Root } from './ButtonList_Root';
const { ccclass, property } = _decorator;

@ccclass('ButtonList_Button')
export class ButtonList_Button extends Component {
    
    @property(Node)
    highLight : Node;

    public root : ButtonList_Root;

    //代表被选择的序号(不一定是下标，是任何使用该组件的标记物)
    @property({
        type:Number,
    })
    public idx : number;


    protected onLoad(): void {
        if(this.highLight == null){
            this.highLight = this.node.getChildByName("HighLight");
        }
        this.node.on(Node.EventType.TOUCH_START,this.onClick, this);
    }

    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_START,this.onClick, this);
    }

    onClick() : void{
        if(this.root == null){
            console.error("Cant find button list root.");
            return;
        }

        this.root.onClick(this);
    }

    setActive(b : boolean) : void{
        this.highLight.active = b;
    }
}


