import { _decorator, Component, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Terrain')
export class Terrain extends Component {

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

    @property(Node)
    player:Node;
    

    start() {
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
    }


    update(deltaTime: number) {
        
    }
}


