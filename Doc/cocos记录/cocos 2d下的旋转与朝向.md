@[TOC] cocos-2d下的旋转与朝向

# 关于cocos2d下的旋转与朝向

记录自己使用cocos的学习历程

## 目标：制作技能指示器


### 代码

```typescript
onTouchMove(e : EventTouch){
    let tarPos = e.getUILocation();
    var dx = tarPos.x - this.startPos.x;
    var dy = tarPos.y - this.startPos.y;
    var dir = v2(dx,-dy); //ui和实际朝向在y轴上相反
    var angle = dir.signAngle(v2(1,0));
    var degree = angle / Math.PI * 180;
    //console.log(`deg : ${degree}`)
    //网上的2.x版本用的是node.rotation，但是3.x需要改成angle
    this.skill_area.angle = degree;
}
```



