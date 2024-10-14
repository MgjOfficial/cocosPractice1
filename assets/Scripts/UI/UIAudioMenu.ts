import { _decorator, assetManager, AudioClip, Button, Component, Event, EventHandler, Node, resources, Slider, UI } from 'cc';
import AudioManager from '../Manager/AudioManager';
import { UIBase } from './UIBase';
const { ccclass, property } = _decorator;

@ccclass('UIAudioMenu')
export class UIAudioMenu extends UIBase {
    @property(Button)
    buttonPlay : Button;

    @property(Button)
    buttonClick : Button;

    @property(Slider)
    sliderMusicVolume : Slider;

    @property(Slider)
    sliderSoundVolume : Slider;

    protected onLoad(): void {
        this.buttonPlay!.node.on(Button.EventType.CLICK, this.onPlayMusic, this);
        this.buttonClick!.node.on(Button.EventType.CLICK, this.onClick, this);

        this.sliderMusicVolume!.node.on('slide', this.onMusicValumeChange,this);
        this.sliderSoundVolume!.node.on('slide', this.onSoundValumeChange,this);
    }

    protected onDestroy(): void {
        this.buttonPlay.node.off(Button.EventType.CLICK, this.onPlayMusic, this);
        this.buttonClick.node.off(Button.EventType.CLICK, this.onClick, this);

        this.sliderMusicVolume!.node.off('slide', this.onMusicValumeChange,this);
        this.sliderSoundVolume!.node.off('slide', this.onSoundValumeChange,this);
    }

    onMusicValumeChange(slider : Slider){
        AudioManager.instance().setMusicVolume(slider.progress);
    }

    onSoundValumeChange(slider : Slider){
        AudioManager.instance().setSoundVolume(slider.progress);
    }


    onPlayMusic() : void{
        AudioManager.instance().playMusic("audio/music/06 Dancing Falsehood");
    }
    
    onClick(): void{

    }
}


