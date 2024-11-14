import { _decorator, Animation, animation, Camera, Component, debug, director, EventKeyboard, EventMouse, Input, input, KeyCode, math, Node, PostSettingsInfo, Prefab, Quat, Screen, v3, Vec2, Vec3 } from 'cc';
import FireManager from '../Manager/FireManager';
import { MCharacter } from '../Model/MPlayer';
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

    

    //动画控制器
    anim : Animation;

    protected onLoad(): void {
        this.anim = this.node.getComponentInChildren(Animation);
        
    }

    protected onDestroy(): void {
        
    }

    start() {
        this.curDirection = new Vec3(0,0,0);
        this.isMoving = false;
    }


    update(deltaTime: number) {
        this.moveUpdate(deltaTime);
    }


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

    /**
     * 移动操作输入调用
     * @param direction 方向
     * @param magnification 移动速度倍率
     */
    public setMove(direction : Vec3, magnification : number):void{
        if(Math.abs(this.curDirection.x) < Math.abs(this.curDirection.y)){

            this.lastDirForAnim = (this.curDirection.y < 0)? 1 : 4;
        }
        else{
            this.lastDirForAnim = (this.curDirection.x < 0)? 2 : 3;
        }
        

        this.curDirection = direction;
        this.isMoving = true;
    }

    /**
     * 停止移动，但是方向(朝向)保留
     */

    public stopMove():void{

        this.isMoving = false;
    }


}


