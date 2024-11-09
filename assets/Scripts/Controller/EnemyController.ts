import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
    

    onHit(){
        console.log(`[${this.node.name} on hit]`);
    }
}


