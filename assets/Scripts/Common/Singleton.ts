import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Singleton')
export default class Singleton<T extends Singleton<T>> {
    private static instances: { [key: string]: Singleton<Singleton<any>> } = {};

    public static instance<T extends Singleton<T>>(this: new() => T):T{
        const className = this.name;
        if(!Singleton.instances[className]){
            Singleton.instances[className] = new this();
        }
        return Singleton.instances[className] as T;
    }

    constructor(){

    }
}


