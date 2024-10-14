import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Manager')
export class Manager extends Component {

    protected onLoad(): void {
        director.addPersistRootNode(this.node);
        //todo:初始化其他manager
    }


}


