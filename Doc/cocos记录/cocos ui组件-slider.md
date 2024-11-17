@[TOC] cocos-slider的使用

# 关于cocos中的UI组件-Slider

## 目标:使用Slider控制音量

记录自己使用cocos的学习历程

### 遇到问题

1. button组件和slider组件的监听事件方式有差异

2. 原生Slider组件没有Fill填充内容物

### Slider的监听事件

```typescript
this.sliderMusicVolume!.node.on('slide', this.onMusicValumeChange,this);

...

onMusicValumeChange(slider : Slider){
    AudioManager.instance().setMusicVolume(slider.progress);
}

```

### Button的监听事件

```typescript

this.buttonPlay!.node.on(Button.EventType.CLICK, this.onPlayMusic, this);

...

onPlayMusic() : void{
    AudioManager.instance().playMusic(musicPath);
}

```


### Slider的填充

思路：通过自己制作填充图片，然后用代码调用slide事件进行填充

步骤：
1. 裁切一个填充图片（纯色）
2. 编写一个myslider脚本，代码如下
```typescript
@ccclass('MySlider')
export class MySlider extends Component {
    slider : Slider;
    fill : Sprite;

    protected onLoad(): void {
        this.slider = this.node.getComponent(Slider);
        this.fill = this.node.getChildByName("Fill").getComponent(Sprite);

        this.node.on('slide', this.onSlide, this);

        this.fill.fillRange = this.slider.progress;
    }
    
    protected onDestroy(): void {
        this.node.off('slide', this.onSlide, this);
    }


    private onSlide(slider: Slider) {
       this.fill.fillRange = slider.progress;
    }
}

```

3. 将填充图片对齐

### 注意
onDestroy中应该使用this~~.slider~~.node.off(xxx);

否则会因为slider先被消除而产生无法获取node，因为产生事件的事node而不是slider，所以这样也可以成功触发事件


