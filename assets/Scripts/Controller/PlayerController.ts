import { _decorator, Camera, Component, debug, director, EventKeyboard, EventMouse, Input, input, KeyCode, math, Node, PostSettingsInfo, Prefab, Quat, Screen, v3, Vec2, Vec3 } from 'cc';
import FireManager from '../Manager/FireManager';
import { MPlayer } from '../Model/MPlayer';
import { WeaponTest } from '../Model/Weapon/WeaponTest';
import AudioManager from '../Manager/AudioManager';
import EventManager from '../Manager/EventManager';
import { UIManager } from '../Manager/UIManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    @property
    private moveSpeed : number = 100;
    private curDirection : Vec3;
    private isMoving : boolean;


    protected onLoad(): void {
        
    }

    protected onDestroy(): void {
        
    }

    start() {
        this.curDirection = new Vec3(0,0,0);
        this.isMoving = false;
    }


    update(deltaTime: number) {
        if(this.isMoving){
            console.log("curdir" +this.curDirection);
            let newPos = new Vec3();
            let step = new Vec3();
            Vec3.multiplyScalar(step, this.curDirection, this.moveSpeed * deltaTime);
            Vec3.add(newPos,this.node.position, step);
            this.node.setPosition(newPos);
        }
    }

    /**
     * 移动操作输入调用
     * @param direction 方向
     * @param magnification 移动速度倍率
     */
    move(direction : Vec3, magnification : number):void{
        
        this.curDirection = direction;
        this.isMoving = true;
    }

    /**
     * 停止移动，但是方向(朝向)保留
     */

    stopMove():void{

        this.isMoving = false;
    }


}


