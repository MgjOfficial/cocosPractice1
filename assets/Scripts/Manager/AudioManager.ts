import { _decorator, AudioClip, AudioSource, Component, Node, resources } from 'cc';
import Singleton from '../Common/Singleton';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export default class AudioManager extends Singleton<AudioManager>{

    //单例类

    private curMusicSource : AudioSource = null;
    private curSoundSource : AudioSource = null;

    private musicVolume : number = 0.5;
    private soundVolume : number = 0.5;

    private curMusicName : String = "";
    private curSoundName : string = "";
    
    public createNewSource(parent : Node) : void{
        if(this.curMusicSource == null){
            this.curMusicSource = parent.addComponent(AudioSource);
            this.curMusicSource.loop = true;
            this.curMusicSource.clip = null;
            this.curMusicSource.volume = this.musicVolume;
        }

        if(this.curSoundSource == null){
            this.curSoundSource = parent.addComponent(AudioSource);
            this.curSoundSource.loop = false;
            this.curSoundSource.clip = null;
            this.curSoundSource.volume = this.musicVolume;
        }
    }

    public setMusicVolume(value : number) : void{
        this.musicVolume = value;
        this.curMusicSource.volume = this.musicVolume;
    }

    public getMusicVolume():number{
        return this.musicVolume;
    }

    public setSoundVolume(value : number) : void{
        this.soundVolume = value;
        this.curSoundSource.volume = this.soundVolume;
    }

    public getSoundVolume():number{
        return this.soundVolume;
    }

    public playMusic(music : string):void{

        if(music === this.curMusicName){
            this.curMusicSource.play();
        }
        else{
            resources.load(music, AudioClip, (err, audioClip)=>{
                if(!err){
                    this.curMusicSource.clip = audioClip;
                    this.curMusicSource.play();
                    this.curMusicName = music;
                }
                else{
                    console.log(err.message);
                }
            });
        }
    }

    public playSound(sound : string):void{

        if(sound === this.curSoundName){
            this.curSoundSource.play();
        }
        else{
            resources.load(sound, AudioClip, (err, audioClip)=>{
                if(!err){
                    this.curSoundSource.clip = audioClip;
                    this.curSoundSource.play();
                    this.curSoundName = sound;
                }
                else{
                    console.log(err.message);
                }
            });
        }
    
    }
}


