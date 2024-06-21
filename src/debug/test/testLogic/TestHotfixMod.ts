import { HotfixMod } from "../../../hotfix/HotfixMod";

export class TestHotfixMod {
    static init() {

        // 字符串转函数 一  不建议使用
        let a = 666;
        let str = "function (a){var b = a; Laya._G.print(Laya._G.CfgMod.getInstance().getDataByKey('cfgName'), b);}";
        HotfixMod.hotfixFunction(str, a); 

        // let str2 = "function () {let _cfgMod = CfgMod.getInstance();_cfgMod.getDataByKey('cfgName', ()=>{Print.printTable(_cfgMod.getDataByKey('cfgName'), 6, 1);})}";
        // HotfixMod.hotfixFunction(str2); 

        // // 字符串转函数 二  不能访问局部变量
        // let a3 = 1123;
        // let str3 = "function (a){var b = a; console.log(b);}"
        // HotfixMod.hotfixFunction2(str3, a3);  

        // let str4 = "function() {let fn = eval('(" + str2 + ")'); fn();}";
        // HotfixMod.hotfixFunction2(str4, 1);
    }

}