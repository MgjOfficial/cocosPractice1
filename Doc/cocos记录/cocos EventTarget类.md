@[TOC] cocos-EventTarget类

# cocos EventTarget类

官方文档
https://docs.cocos.com/creator/3.7/manual/zh/engine/event/event-emit.html#%E7%9B%91%E5%90%AC%E5%92%8C%E5%8F%91%E5%B0%84%E4%BA%8B%E4%BB%B6

1. 事件发放者
定义: et : EventTarget()
回调: et.emit(eventType, ...args),或者et.once(eventType, {args1, args2})
第二种回调方式将多个参数打包成一个结构

2. 事件监听者
开始监听: target.et.on(eventType, callback, target)

```typescript
// 发布者的脚本
onHpChange : EventTarget = new EventTarget();

hpChange(delta : number) : void {
    console.log(`Enemy ${this.name} hp change ${delta}`);
    this.curHp += delta;
    this.onHpChange.emit('uiUpdate', { curHp: this.curHp, maxHp: this.maxHp });
}

// 监听者的脚本
init(model : MEnemy){
    this._model = model;
    this._model.onHpChange.on('uiUpdate', this._onHpChange, this);
}

protected onDestroy(): void {
    this._model.onHpChange.off('uiUpdate', this._onHpChange, this);
}

_onHpChange(data){
    console.log(`curHp : ${data.curHp}, maxHp : ${data.maxHp}`);
}

```