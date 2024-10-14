import { _decorator, Component, Node } from 'cc';
import AudioManager from '../Manager/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('AudioSourceNode')
export class AudioSourceNode extends Component {

    protected onLoad(): void {
        AudioManager.instance().createNewSource(this.node);
    }
}


