import { _decorator, Collider2D, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletBase')
export abstract class BulletBase extends Component {
    protected coll : Collider2D;
}


