@[TOC] cocos-鼠标指针与世界坐标

# 关于cocos中按目标点朝向旋转物体的记录

记录自己使用cocos的学习历程

## 目标：做一个player朝向鼠标指针的功能

刚开始接触cocos，虽然之前在unity中写跟旋转有关的东西也是胡乱的一笔，数学没学好捏

翻来覆去憋了好久，问ai也是一堆过期新闻

1. 监听鼠标移动事件

```typescript
//开始监听
input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);

//结束监听
input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);

onMouseMove(event: EventMouse){
    ...
}

```
onMouseMove是监听的方法，在监听的方法中编写逻辑

2. 获取鼠标处于世界坐标的位置

不知道接下来的会不会是我搞得复杂,当我跟着仅有的几个方法获取坐标时都发现每个的基准位置都优点混乱

为了调整基准位，获取流程如下
- 获取鼠标的屏幕位置
- 获取摄像头，及其长宽
- 使用Camera.ScreenToWorld,得到一个pos
- 将pos进行调整，减去一半摄像头长宽,并调整z值为该2d下的基本z值

```typescript
//获取当前鼠标位置和屏幕大小
const mouse_pos = event.getLocationInView();

//获取当前的main camera
const cur_cam = director.getScene()!.scene.renderScene!.cameras[0];
const cur_cam_height = cur_cam.height;
const cur_cam_width = cur_cam.width;

let pos = new Vec3(0,0,0);
cur_cam.screenToWorld(pos, new Vec3(mouse_pos.x, mouse_pos.y, 0));
let real_mouse_pos = new Vec3(pos.x - cur_cam_width/2, pos.y - cur_cam_height/2, this.node.position.z);
console.log("mousepos:" + real_mouse_pos);
...
```

3. 简单计算旋转角度

计算角度一开始到处绕圈子，实际上获得了目标位置和当前自身位置就可以根据math.atan2得到夹角弧度

通过夹角弧度转换为360的角度，最后赋值给this.node.angle;

那些我看不太懂的四元数欧拉角就不太用了，在unity中也不是很熟，虽然原理应该可能都一样（吧），要好好学了

```typescript
const direction = new Vec3(0,0,0);
Vec3.subtract(direction, real_mouse_pos, this.node.position);

// 计算向量的旋转角度（弧度）
const angleRad = Math.atan2(direction.y, direction.x);

// 将弧度转换为角度
const angleDeg = -angleRad * 180 / Math.PI;

this.node.angle = angleDeg;
```

最后就能让玩家持续注视鼠标落点了