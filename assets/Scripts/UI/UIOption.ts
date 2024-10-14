import { _decorator, Button, Component, Node, Prefab, Slider } from 'cc';
import { UIBase } from './UIBase';
import AudioManager from '../Manager/AudioManager';
import { MySlider } from './Common/MySlider';
import { UIManager } from '../Manager/UIManager';
const { ccclass, property } = _decorator;

@ccclass('UIOption')
export class UIOption extends UIBase {

    @property(Button)
    btnClose : Button;

    @property(Slider)
    sliderMusicVolume : Slider;

    @property(Slider)
    sliderSoundVolume : Slider;

    protected onLoad(): void {
        
        this.init();
        this.btnClose.node.on(Button.EventType.CLICK, this.onHidden, this);
        this.sliderMusicVolume.node.on('slide', this.onMusicValumeChange,this);
        this.sliderSoundVolume.node.on('slide', this.onSoundValumeChange,this);

        this.sliderMusicVolume.progress = AudioManager.instance().getMusicVolume();
        this.sliderSoundVolume.progress = AudioManager.instance().getSoundVolume();
    }

    protected onDestroy(): void {
        this.btnClose.node.off(Button.EventType.CLICK, this.onHidden, this);
        this.sliderMusicVolume.node.off('slide', this.onMusicValumeChange,this);
        this.sliderSoundVolume.node.off('slide', this.onSoundValumeChange,this);
    }

    protected onClose(): void {
        super.onClose();
    }

    protected onHidden(): void {
        super.onHidden();
    }

    public init(): void {
        super.init();
    }

    onMusicValumeChange(slider : Slider){
        AudioManager.instance().setMusicVolume(slider.progress);
    }

    onSoundValumeChange(slider : Slider){
        AudioManager.instance().setSoundVolume(slider.progress);
    }
}


