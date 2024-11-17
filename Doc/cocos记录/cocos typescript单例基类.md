@[TOC] cocos-单例基类

# typescript单例类

记录自己使用cocos的学习历程

## 目的：让所有单例类继承于一个父类，避免重复编写

## Singleton类

贴代码

```
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Singleton')
export default class Singleton<T extends Singleton<T>> {
    private static instances: { [key: string]: Singleton<Singleton<any>> } = {};

    public static instance<T extends Singleton<T>>(this: new() => T):T{
        const className = this.name;
        if(!Singleton.instances[className]){
            Singleton.instances[className] = new this();
        }
        return Singleton.instances[className] as T;
    }

    constructor(){}
}

...

export default class AudioManager extends Singleton<AudioManager>{
    ...
}

...

AudioManager.instance().func();

```

大概是在一个static的键值对中存放 <实际单例的类名-单例> 然后通过类名获取这个类的单例



## 记录一个错误

关于设置了不因为场景切换销毁的结点的时候，如果在该场景下有一个相同的结点，会发生错误
