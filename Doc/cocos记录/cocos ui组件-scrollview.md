@[TOC] cocos-scrollview的使用

# 关于cocos中的UI组件-ScrollView

## 目标:制作一个更优化的滚动视图

记录自己使用cocos的学习历程

### 遇到的麻烦

1. 原始滚动视图组件与unity的有所差异，并且需要自行编辑滚动区域

2. 想要制作一个可以自定义滚动范围的

直接上代码
```typescript
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


```

思路是根据计算当前容器的行列数和item长宽，以及预设的间隔去直接赋值，这个类直接添加到scollView的root中