import { _decorator, Component, EventKeyboard, input, Input, KeyCode, Node, System, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StageManager')
export class StageManager extends Component {

    @property({
        type : Number,
    })
    width : number;

    @property({
        type : Number,
    })
    height : number;

    @property(Node)
    startNode : Node;
    @property(Node)
    endNode : Node;

    coords : Array<Array<Vec2>>;
    
    @property({
        type: [Node],
    })
    pillars : Node[] = [];
    pillarsInfo : {node :Node,y:number}[] = [];
    DynamicLayers : Node[] = [];

    DynamicLayersRoot : Node;
    

    public init() {
        this.coords = new Array(this.width);
        const startPos = this.startNode.worldPosition;
        const endPos = this.endNode.worldPosition;
        const gridSize = new Vec2((startPos.x - endPos.x) / this.width, (startPos.y - endPos.y) / this.height);
        for(let i =0;i< this.width;i++){
            this.coords[i] = new Array(this.height);
            for(let j=0;j<this.height;j++){
                this.coords[i][j] = new Vec2(startPos.x + i*gridSize.x, startPos.y + j*gridSize.y);
            }
        }

        this.DynamicLayersRoot = new Node('DynamicLayers');
        this.node.addChild(this.DynamicLayersRoot);
        this.DynamicLayersRoot.setSiblingIndex(this.node.children.length -1);

        // 渲染优先度越高越排前
        this.pillars.sort((a,b)=>a.getChildByName('coordY').worldPosition.y-b.getChildByName('coordY').worldPosition.y);
        for(let i = 0;i < this.pillars.length;i++){
            this.pillars[i].setParent(this.DynamicLayersRoot);
        }

        let len = this.DynamicLayersRoot.children.length;
        for(let i=0;i<this.pillars.length;i++){
            this.pillars[i].setSiblingIndex(len - i - 1);
            this.pillarsInfo.push({ node: this.pillars[i], y: this.pillars[i].getChildByName('coordY').worldPosition.y });
        }
    }

    addDynamicLayersNode(node:Node){
        this.DynamicLayersRoot.addChild(node);
        this.DynamicLayers.push(node);
    }

    removeDynamicLayersNode(node:Node){
        this.DynamicLayersRoot.removeChild(node);
        this.DynamicLayers.splice(this.DynamicLayers.indexOf(node),1);
    }

    update(deltaTime: number) {
        this.checkPlayerLayer();
    }

    checkPlayerLayer():void{
        let layerYArr : {node : Node,y:number}[] = [];

        for(let i = 0;i < this.pillarsInfo.length;i++){
            layerYArr.push({node : this.pillarsInfo[i].node, y:this.pillarsInfo[i].y});
        }
        for(let i = 0;i < this.DynamicLayers.length;i++){
            layerYArr.push({node : this.DynamicLayers[i], y:this.DynamicLayers[i].worldPosition.y});
        }
        // layerYArr.forEach((item)=>{
        //     console.log(`node:${item.node.name}  y:${item.y}`);
        // })
        
        // 根据实际y值排序
        layerYArr.sort((a,b)=>b.y-a.y);
        for(let i = 0;i < layerYArr.length;i++){
            layerYArr[i].node.setSiblingIndex(i);
        }
    }
}


