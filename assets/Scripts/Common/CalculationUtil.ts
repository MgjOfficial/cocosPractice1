import { _decorator, Component, Node } from 'cc';
import Singleton from './Singleton';
const { ccclass, property } = _decorator;


export interface AttackerInfo{
    atk : number;
    //todo:暴击率，暴伤，攻击类型，攻击频率
}

export interface DefenderInfo{
    def : number;
    //todo:其他防御类型
}

@ccclass('CalculationUtil')
export class CalculationUtil{
    static attackCauculation(atkInfo : AttackerInfo, defInfo : DefenderInfo,attackerCallBack : Function, defenderCallBack : Function){
        let damage = atkInfo.atk - defInfo.def;
        attackerCallBack.call(null, damage); // 回传第一个参数应该是this(回调者)，这里传递空值
        defenderCallBack.call(null, damage);
    }
    
}


