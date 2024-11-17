@[TOC] cocos-on事件触发的this指针

# 关于cocos调用Node.on注册的事件时this指针的问题

记录自己使用cocos的学习历程

## 问题

方法on使用如下，this.node.on(eventType,callback,target)

在传入外部类中的方法作为callback时，target需要定位为调用者的对象，如果传入的调用者的node或者this.node，会导致callback方法中的this不能指向内容，例如
```typescript

//注册事件的脚本中
public init(target :Node, onTouchStart) {
    this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, target);
}

//另一个脚本中Weapon.ts

skill : Node;
onTouchStart(e : EventTouch){
    //此处会获取不到this.skill的node，因为this不是该类对象
    this.skill.active = true;

}
```

正确情况应该是
```typescript

//注册事件的脚本中
public init(target : Weapon, onTouchStart) {
    this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, target);
}

//另一个脚本中Weapon.ts

skill : Node;
onTouchStart(e : EventTouch){
    //传入事件时target为该类的对象，才可以使用
    this.skill.active = true;

}
```





