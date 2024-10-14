import { _decorator, Component, Layout, Node, ScrollView, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MyScollView')
export class MyScollView extends Component {
    protected onLoad(): void {
        let sv = this.getComponent(ScrollView);
        let content = this.node.getChildByPath("view/content");
        let layout = content.getComponent(Layout);
        let itemNum = content.children.length;
        let uitran = content.getComponent(UITransform);

        let sapcingX = layout.spacingX;
        let spacingY = layout.spacingY;
        let itemX = 0;
        let itemY = 0;

        if(itemNum > 0){
            itemX = content.children[0].getComponent(UITransform).contentSize.x;
            itemY = content.children[0].getComponent(UITransform).contentSize.y;
        }
        
        //列数量
        let colNum : number = itemNum / Math.floor(uitran.contentSize.x / itemX);
        colNum = (Math.floor(colNum) == colNum)? colNum : Math.floor(colNum) + 1;
        let newX = uitran.contentSize.x;
        let newY = colNum * itemY + (colNum-1) * spacingY;
        
        uitran.setContentSize(newX,newY);
    }

    protected onDestroy(): void {
        
    }
}


