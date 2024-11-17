@[TOC] cocos-碰撞体

# 关于cocos中的碰撞体

记录自己使用cocos的学习历程

## 目标：设置子弹攻击判定


1. 子弹和受击体添加collider2d组件以及rigibody2d组件
2. 如果不需要刚体移动，刚体设置为Kinematic
3. 刚体需要都勾选 Enable Contact Listener
4. 触发器：在collider组件中勾选Sensor，类似于unity的trigger


### 代码：碰撞事件与回调

```
//注册事件

this.coll.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);


//回调方法
onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
    console.log('on hit');
}
```



