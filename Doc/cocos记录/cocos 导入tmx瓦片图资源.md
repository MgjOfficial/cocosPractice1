@[TOC] cocos-导入tmx瓦片图资源

# cocos-导入tmx瓦片图资源

cocos creator 3.0以上需要使用1.3, 1.2版本的Taild

我的版本为cocos creator版本为3.8.3，使用1.3.2版本的Taild

## 建立地图存放目录
在cocos的asset中存放一个TiledMap目录用于专门处理地形编辑

亲测以下结构能顺利运行，tmx要和tsx放在一起，不然会报奇奇怪怪的错误

目录结构：
TiledMap
├── img(存放原始资源图片)
├── map(tmx和tsx资源)


## 地形遮挡

https://blog.csdn.net/vanreimu/article/details/144730038

