@[TOC] cocos-resources目录加载资源-Json

# 关于cocos中通过resources目录加载资源

记录自己使用cocos的学习历程


### Json格式

JSON语法是JavaScript语法的子集，具有以下规则：

数据在名称/值对中

数据由逗号分隔

大括号保存对象

中括号保存数组

### 官方样例

```typescript

import { _decorator, Component, JsonAsset, resources, error } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemTemplate')
export class ItemTemplate extends Component {

    start () {

        resources.load('gameGiftJson', (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            // 获取到 Json 数据
            const jsonData: object = res.json!;

        })

    }
}

```

Json 资源。 Json 资源加载后将直接解析为对象。如果你希望获得 JSON 的原始文本，你需要使用文本资源（使用文件名后缀“.txt”）。

在读取.txt后缀的时候不会获得json对象，会直接获得文本，在JsonAsset.text中，因此在读取txt时，通过变量名访问会报错


样例

momoi.json文件

```Json
{
    "_name" : "momoi",
    "maxHp" : 550,
    "maxMp" : 300
}
```


```typescript
//在DataManager中通过resource加载
DataManager.instance().getDefine("momoi",(res: JsonAsset)=>{
    const jsonData = res.json;

    let name = jsonData._name;
    let hp = jsonData.maxHp;
    let mp = jsonData.maxMp;
});

```