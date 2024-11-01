import { _decorator, Button, Component, director, Node, Prefab, Scene } from 'cc';
import { UIBase } from '../UIBase';
import { UIMapSelect } from './UIMapSelect';
import { UIBuildSelect } from './UIBuildSelect';
import { GameManager } from '../../Manager/GameManager';

const { ccclass, property } = _decorator;

@ccclass('UIPrepare')
export class UIPrepare extends UIBase {
    @property(Button)
    btnClose : Button;

    @property(UIMapSelect)
    mapSelect : UIMapSelect;

    @property(UIBuildSelect)
    buildSelect : UIBuildSelect;

    protected onLoad(): void {
        this.mapSelect.root = this;
        this.buildSelect.root = this;
        
        this.btnClose.node?.on(Button.EventType.CLICK, this.onHidden, this);
    }

    protected onDestroy(): void {
        this.btnClose.node?.off(Button.EventType.CLICK, this.onHidden, this);
    }

    protected onClose(): void {
        super.onClose();
    }

    protected onHidden(): void {
        super.onHidden();
    }

    public enterGame(mapIdx : number){
        let charId = this.buildSelect.getSelectedChar();
        if(charId === -1){return;}

        //console.log(`select map ${mapIdx}`);

        //默认武器1测试
        GameManager.instance().initPlayerInfo(charId);

        director.loadScene("GameScene");
    }
}


