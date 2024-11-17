@[TOC] cocos-制作UIManager

# 制作UIManager

记录自己使用cocos的学习历程

## 目标：制作一个ui管理器

关于想要方便的获取ui，管理ui，加载ui..balabala

制作一个模板化系统对ui进行操作(其他的东西也可以进行模板化处理)

### ui管理器和ui资源

ui管理器是一个单例类(同时只会有一个管理器)，她负责开放一些对ui进行操作的统一化接口，同时对ui进行存放

因为ui是有不同的类型，在管理器挨个编写类型的话和没有一样，也会越来越复杂，所以统一一个uibase作为ui的基类

ui会继承于这个基类，同时ui管理器通过存放基类，在提取的时候转换为相应ui子类即可

代码

```typescript
@ccclass('UIManager')
export class UIManager extends Singleton<UIManager> {
    uiMap : Map<string, UIBase>;

    uiRoot : Node;

    constructor(){
        super();
        this.init();
    }

    public init() : void{
        console.log("uiManager init");
        this.uiMap = new Map<string, UIBase>();
        this.uiRoot = director.getScene().getChildByName("Canvas");
    }

    //todo: ui管理器职能，加载ui，关闭ui，管理ui容器，提供获取某个ui的方法(通过name)

    //开启ui,当已经加载过ui的时候，直接提取出来，否则加载ui
    public openUI(name : string, callback : Function) : void{
        //todo: 设置ui层级参数

        console.log("open ui : " + name);

        if(this.uiMap.has(name)){
            //console.log("has ui");
            this.uiMap.get(name).node.active = true;
        }
        else{
            let path = `ui/${name}`;
            console.log(path);
            resources.load(path, Prefab, (err, uiPrefab)=>{
                if(err){
                    console.error("Failed to load UI Prefab: " + name);
                    return null;
                }
                let uiNode = instantiate(uiPrefab);
                let uiComponent = uiNode.getComponent(name);
                this.uiMap.set(name, uiComponent as UIBase);
                callback!(uiComponent);
            });

        }
    }

    //关闭ui
    public closeUI<T extends UIBase>(ui : T, shutdown : boolean) : void{
        if(shutdown){
            //彻底关闭
            this.uiMap.forEach((m_ui, key) => {
                if(m_ui == ui){
                    this.uiMap.delete(key);
                }
            });
            //这里要先清除ui组件,否则报错，暂时未知
            let node = ui.node;
            ui.destroy();
            node.destroy();
        }
        else{
            //暂时关闭
            ui.node.active = false;
        }
        
    }
    ...

```


### 遇到的麻烦

在typescript中处理类型转换，和带类型模版的函数，需要不停查资料去看清楚ts的语法，以及cocos中组件的生命周期引起的报空问题

~~上面的代码还没完工，其他的也是相同思路~~
1. 对泛型函数捣鼓了好久，还是没有完全理解，对这个语言还是直接用简单的不对类型有太大要求的方式，因此例如在*let uiComponent = uiNode.getComponent(name); callback!(uiComponent);*这就直接通过类名去获取组件，然后直接传入没有预设参数的callback里

2. resources.load是一个异步函数，在她内部回调的return基本没有意义（暂时不知道有啥用，不能作为主函数的返回值），因此在调用openUI时应该用回调函数来对生成的ui组件操作，否则openUI返回的话会来不及返回
```typescript
UIManager.instance().openUI("UIOption",(ui : UIOption)=>{
    ui.node.setParent(this.node);
});
```
如果这里使用let ui = xxx，ui会报空

1. 关于清理ui时的生命周期，先贴代码
```typescript
public closeUI<T extends UIBase>(ui : T, shutdown : boolean) : void{
    if(shutdown){
        //彻底关闭
        this.uiMap.forEach((m_ui, key) => {
            if(m_ui == ui){
                this.uiMap.delete(key);
            }
        });

        let node = ui.node;
        ui.destroy();
        node.destroy();
    }
    else{
        //暂时关闭
        ui.node.active = false;
    }

}

```
在清理时，先清理了ui组件，后清理节点，不知道为啥直接清理节点会导致报空，应该在后面清理时去对node作注销事件却找不到node导致，同时清理带MySlider(自己编写的带事件的)，Myslider中也要即时清理注册的事件
```typescript
let node = ui.node;
ui.destroy();
node.destroy();
```


### 拓展

对不同ui所有的职能可以进一步细分基类，同时ui管理器也可以存放临时关闭的ui而不是每次都加载，，之类的，懒得搞了