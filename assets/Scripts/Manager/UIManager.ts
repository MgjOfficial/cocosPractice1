import { _decorator, Component, director, error, instantiate, Node, path, Prefab, resources } from 'cc';
import Singleton from '../Common/Singleton';
import { UIBase } from '../UI/UIBase';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Singleton<UIManager> {
    uiMap : Map<string, UIBase>;

    uiRoot : Node;

    constructor(){
        super();
        this.init();
    }

    public init() : void{
        console.log("uiManager init");
        this.uiMap = new Map<string, UIBase>();
        this.uiRoot = director.getScene().getChildByName("Canvas");
    }

    //todo: ui管理器职能，加载ui，关闭ui，管理ui容器，提供获取某个ui的方法(通过name)

    //开启ui,当已经加载过ui的时候，直接提取出来，否则加载ui
    public openUI(name : string, callback : Function) : void{
        //todo: 设置ui层级参数

        console.log("open ui : " + name);

        if(this.uiMap.has(name)){
            //console.log("has ui");
            this.uiMap.get(name).node.active = true;
        }
        else{
            let path = `ui/${name}`;
            console.log(path);
            resources.load(path, Prefab, (err, uiPrefab)=>{
                if(err){
                    console.error("Failed to load UI Prefab: " + name);
                    return null;
                }
                let uiNode = instantiate(uiPrefab);
                let uiComponent = uiNode.getComponent(name);
                this.uiMap.set(name, uiComponent as UIBase);
                callback!(uiComponent);
            });

        }
    }

    //关闭ui
    public closeUI<T extends UIBase>(ui : T, shutdown : boolean) : void{
        if(shutdown){
            //彻底关闭
            this.uiMap.forEach((m_ui, key) => {
                if(m_ui == ui){
                    this.uiMap.delete(key);
                }
            });

            let node = ui.node;
            ui.destroy();
            node.destroy();
        }
        else{
            //暂时关闭
            ui.node.active = false;
        }
        
    }

    //获取ui
    public getUI<T extends UIBase>(name :string): T {
        return this.uiMap.has(name)? this.uiMap[name] as T : null;
    }

}


