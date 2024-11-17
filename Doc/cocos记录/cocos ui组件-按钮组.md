@[TOC] cocos-按钮组

# 关于cocos中的UI组件-按钮组

## 目标:制作一个单选按钮组

记录自己使用cocos的学习历程


都绑上自己编写的脚本，蛮简单的一个思路，只要脚本不接触太多独特的东西就行，直接上代码

ButtonList_Root.ts
```typescript

@ccclass('ButtonList_Root')
export class ButtonList_Root extends Component {
    btnList : ButtonList_Button[] = [];


    protected onLoad(): void {
        this.btnList = this.node.getComponentsInChildren(ButtonList_Button);
        this.btnList.forEach(btn => {
            btn.root = this;
        });
    }


    public onClick(tarBtn : ButtonList_Button) : void{
        this.btnList.forEach(btn => {
            btn.setActive(tarBtn == btn);
        });
    }
}
```

ButtonList_Button.ts
```typescript
@ccclass('ButtonList_Button')
export class ButtonList_Button extends Component {
    
    @property(Node)
    highLight : Node;

    public root : ButtonList_Root;

    //代表角色的序号
    @property({
        type:Number,
    })
    public char : number;


    protected onLoad(): void {
        if(this.highLight == null){
            this.highLight = this.node.getChildByName("HighLight");
        }
        this.node.on(Node.EventType.TOUCH_START,this.onClick, this);
    }

    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_START,this.onClick, this);
    }

    onClick() : void{
        if(this.root == null){
            console.error("Cant find button list root.");
            return;
        }

        this.root.onClick(this);
    }

    setActive(b : boolean) : void{
        this.highLight.active = b;
    }
}


```