@[TOC] cocos-帧动画制作

# cocos的帧动画如何实现

记录自己使用cocos的学习历程


### 素材切割

通过photoshop的切片工具对图进行切割，保存->存储为web所用格式

### animation制作

1. 给物体添加上animation组件

2. 制作animation clip

3. 编写程序化动画播放处理

### 动画图&animation controller

动画图(animation graph):类似于unity的动画控制一样使用状态机进行管理

目前来说在使用浏览器进行调试时使用动画图似乎存在报空的错误，但是在使用编辑器调试就没有问题。。以后再来看，根据网上说的复杂点的动画可以用复杂的软件去做

所以还是选择直接使用程序去对动画进行播放

移动的代码测试如下，也许用状态机的模板会更好，但是模板暂时不造

```typescript
private lastDirForAnim : number = 1;
    moveUpdate(deltaTime: number):void{
        //0:idle, 1:front, 2: left, 3:right, 4:back
        let dirForAnim : number = 0;
        if(this.isMoving){
            let newPos = new Vec3();
            let step = new Vec3();
            Vec3.multiplyScalar(step, this.curDirection, this.moveSpeed * deltaTime);
            Vec3.add(newPos,this.node.position, step);
            this.node.setPosition(newPos);
            if(Math.abs(this.curDirection.x) < Math.abs(this.curDirection.y)){

                dirForAnim = (this.curDirection.y < 0)? 1 : 4;
            }
            else{
                dirForAnim = (this.curDirection.x < 0)? 2 : 3;
            }
        }

        switch(dirForAnim){
            case 0: 
                if(!this.anim.getState('idle_f').isPlaying && !this.anim.getState('idle_l').isPlaying &&
                   !this.anim.getState('idle_r').isPlaying && !this.anim.getState('idle_b').isPlaying){
                    switch(this.lastDirForAnim){
                        case 1:this.anim.play('idle_f');break;
                        case 2:this.anim.play('idle_l');break;
                        case 3:this.anim.play('idle_r');break;
                        case 4:this.anim.play('idle_b');break;
                        default:this.anim.play('idle_f');break;
                    }
                }
            break;

            case 1: 
                if(!this.anim.getState('walk_f').isPlaying){
                    this.anim.play('walk_f');
                }
            break;

            case 2: 
                if(!this.anim.getState('walk_l').isPlaying){
                    this.anim.play('walk_l');
                }
            break;

            case 3: 
                if(!this.anim.getState('walk_r').isPlaying){
                    this.anim.play('walk_r');
                }
            break;

            case 4:
                if(!this.anim.getState('walk_b').isPlaying){
                    this.anim.play('walk_b');
                }
            break;
        }
    }

```
