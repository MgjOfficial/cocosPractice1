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
    
    @property({
        type: [Node],
    })
    pillars : Node[] = [];
    pillars_y : number[] = []; 
    

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
        // 按 age 升序排序
        //people.sort((a, b) => a.age - b.age);
        //console.log(people);
        // 输出:
        // [
        //   { name: 'Bob', age: 25 },
        //   { name: 'Alice', age: 30 },
        //   { name: 'Charlie', age: 35 }
        // ]
        this.pillars.sort((a,b)=>a.getChildByName('coordY').worldPosition.y-b.getChildByName('coordY').worldPosition.y);

        let len = this.node.children.length;
        for(let i=0;i<this.pillars.length;i++){
            this.pillars[i].setSiblingIndex(len - i - 1);
            this.pillars_y.push(this.pillars[i].worldPosition.y);
        }
    }


    update(deltaTime: number) {
        
    }

    
}


