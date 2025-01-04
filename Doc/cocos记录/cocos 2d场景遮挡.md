@[TOC] cocos-2d场景遮挡

# cocos-2d场景遮挡

## 背景与目的

使用Tiled制作地形，场景中存在柱子之类的内容，需要实现玩家在柱子前后移动时，与柱子成正常的遮挡关系。

## 思路

尝试过使用unity那样的sortinglayer，添加sorting组件，但是并不起效，又尝试改layer，也不起效。如果有大佬有方便的实现效果欢迎指点

目前主要使用思路是将所有需要动态比对的个体存入一个节点中，通过修改节点的渲染顺序来达到前后遮挡，使用Node.setSiblingIndex方法去修改节点顺序。

## 代码

1. 创建动态遮挡根节点，将柱子等物传入，有新实体添加进去时通过方法移到该节点下
```typescript
this.DynamicLayersRoot = new Node('DynamicLayers'); //添加存放动态遮挡根节点
this.node.addChild(this.DynamicLayersRoot);
this.DynamicLayersRoot.setSiblingIndex(this.node.children.length -1);

// 先将所有柱子节点添加到DynamicLayersRoot中
// 渲染优先度越高越排前
this.pillars.sort((a,b)=>a.getChildByName('coordY').worldPosition.y-b.getChildByName('coordY').worldPosition.y);
for(let i = 0;i < this.pillars.length;i++){
    this.pillars[i].setParent(this.DynamicLayersRoot);
}

...

addDynamicLayersNode(node:Node){
    this.DynamicLayersRoot.addChild(node);
    this.DynamicLayers.push(node);
}

removeDynamicLayersNode(node:Node){
    this.DynamicLayersRoot.removeChild(node);
    this.DynamicLayers.splice(this.DynamicLayers.indexOf(node),1);
}
```

2. 根据他们的y轴进行排序，然后进行编排(要注意各个节点的y值应该取什么，我对柱子新建了一个节点标在底端来确定y值)
```typescript
checkPlayerLayer():void{
    let layerYArr : {node : Node,y:number}[] = [];

    for(let i = 0;i < this.pillarsInfo.length;i++){
        layerYArr.push({node : this.pillarsInfo[i].node, y:this.pillarsInfo[i].y});
    }
    for(let i = 0;i < this.DynamicLayers.length;i++){
        layerYArr.push({node : this.DynamicLayers[i], y:this.DynamicLayers[i].worldPosition.y});
    }
    
    // 根据实际y值排序
    layerYArr.sort((a,b)=>b.y-a.y);
    for(let i = 0;i < layerYArr.length;i++){
        layerYArr[i].node.setSiblingIndex(i);
    }
}
```

写起来挺简单，场景中的静态物需要在Tiled中分一个层来画，这样会分一个Node出来，可以对所有动态层实时更新
