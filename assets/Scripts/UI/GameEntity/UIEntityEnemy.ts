import { _decorator, Component, Node, Sprite } from 'cc';
import { MEnemy } from '../../Model/MEnemy';
const { ccclass, property } = _decorator;

@ccclass('UIEntityEnemy')
export class UIEntityEnemy extends Component {

    private _model : MEnemy;
    
    @property(Sprite)
    hpBarFill : Sprite;

    init(model : MEnemy){
        this._model = model;
        this._model.onHpChange.on('uiUpdate', this._onHpChange, this);
    }

    protected onDestroy(): void {
        this._model.onHpChange.off('uiUpdate', this._onHpChange, this);
    }

    _onHpChange(data){
        console.log(`curHp : ${data.curHp}, maxHp : ${data.maxHp}`);
        this.hpBarFill.fillRange = data.curHp / data.maxHp;
    }
}


