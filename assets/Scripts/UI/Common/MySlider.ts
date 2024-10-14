import { _decorator, Component, Node, Slider, Sprite } from 'cc';
const { ccclass, property } = _decorator;

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


