@[TOC] cocos-resources目录加载资源

# 关于cocos中通过resources目录加载资源

记录自己使用cocos的学习历程

## 目标：加载音频文件

每次都拖动资源到component下比较麻烦，不适合框架化，想在unity一样通过加载文件名来执行加载资源

但由于cocos的debug我实在有点不太适应

加载代码

'''
onPlayMusic() : void{

    console.log("click play music");
    resources.load("audio/music/06 Dancing Falsehood", AudioClip,(err, audioClip)=>{
        if(!err){
            console.log("play music");
            AudioManager.instance().playMusic(audioClip);
        }
        else{
            console.log(err.message);
        }
        
    });

}

'''
向管理器传入clip后播放

### 遇到问题

在debug的过程中, 无法正常使用resouces.load

### debug

虽然网上资料不少，目前先试了vscode中调试

debugger for chrome已经失效了，安装JavaScript Debugger插件,在cocos编辑器菜单中打开开发者->Visual Studio Code工作流->添加 Chorme debug 配置,应该是这里会在根目录下.vscode目录生成launch.json文件

vscode中就可以下好断点，左边选择运行与调试（虫子）进入调试


