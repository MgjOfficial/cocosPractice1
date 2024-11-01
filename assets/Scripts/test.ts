import { _decorator, Component, JsonAsset, Node } from 'cc';
import { DataManager } from './Manager/DataManager';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
    start() {
        DataManager.instance().init();
        this.scheduleOnce(this.func, 1);
        
    }

    func(){
        console.log(DataManager.instance().weapons.get(1));
    }

    update(deltaTime: number) {
        
    }
}


