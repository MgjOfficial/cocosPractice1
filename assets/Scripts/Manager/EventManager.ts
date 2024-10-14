import { _decorator, Component, Node } from 'cc';
import Singleton from '../Common/Singleton';
const { ccclass, property } = _decorator;

interface IEvent {
    func: Function,
    ctx: unknown
}


@ccclass('EventManager')
export default class EventManager extends Singleton<EventManager> {

    private eventMap : Map<string, Array<IEvent>> = new Map<string, Array<IEvent>>;

    constructor(){
        super();
        this.eventMap.clear();
    }

    subscribe(eventName : string, func : Function, ctx : unknown){
        if(this.eventMap.has(eventName)){
            this.eventMap.get(eventName).push({func,ctx});
        }
        else{
            this.eventMap.set(eventName, [{func,ctx}]);
        }
    }

    unsubscribe(eventName : string, func: Function, ctx : unknown){
        if(this.eventMap.has(eventName)){
            //获取要取消的事件名对应的方法列表
            let events = this.eventMap.get(eventName);
            //比对事件方法和参数
            let index = events.findIndex(i => i.func === func && i.ctx === ctx);
            //删除
            index > -1 && events.splice(index, 1);
            if(events.length == 0){
                this.eventMap.delete(eventName);
            }

        }
        else{
            console.warn(`解绑事件失败:事件名(${eventName})不存在`);
        }
    }

    //调用事件
    call(eventName :string, detail?:any){
        if(this.eventMap.has(eventName)){
            this.eventMap.get(eventName).forEach(
                ({func, ctx}) =>{
                    typeof detail === "undefined" ? func.call(ctx) : func.call(ctx, detail);
                }
            )
        }
    }



    clear(){
        this.eventMap.clear();
        this
    }
}


