@[TOC] cocos-伤害计算

# 伤害计算的思路

记录自己使用cocos的学习历程

## 目标：实现一个伤害的计算方式


1. 统一计算接口，CalculationUtil类，提供了需要传入攻击者和防御者以及双方的回调函数的参数的攻击方法
2. 攻击者提供攻击参数，防御者提供防御参数，这些都定义在CalculationUtil脚本的Inferface中
3. 攻击者将自身参数和回调方法传递给防御者，防御者统一访问计算接口，然后通过回调方法返回伤害值给双方
4. 注意事项：参数中callback方法的第一个参数一般是this(回调者)，只传demage一个回去会导致demage成为回调者导致接收失败
```typescript
// 攻击者脚本中
e.getComponent(EnemyController).onHit(atkInfo, (dmg : number)=>{
    console.log(`deal damage [${dmg}] to ${e.name}`);
});
// ...

// 防御者脚本中
onHit(atkInfo : AttackerInfo, attackerCallBack : Function){
    // 测试用
    let defInfo : DefenderInfo = {
        def : this.enemyInfo.defend,
    }
    // 调用计算接口
    CalculationUtil.attackCauculation(atkInfo, defInfo, attackerCallBack, (damage : number) => {
        console.log(`get demage ${damage}`)
    });
}


// 计算接口
@ccclass('CalculationUtil')
export class CalculationUtil{
    static attackCauculation(atkInfo : AttackerInfo, defInfo : DefenderInfo,attackerCallBack : Function, defenderCallBack : Function){
        let damage = atkInfo.atk - defInfo.def;
        attackerCallBack.call(null, damage); // 回传第一个参数应该是this(回调者)，这里传递空值
        defenderCallBack.call(null, damage);
    }
    
}


```
