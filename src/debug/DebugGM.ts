import { Print } from "../common/log/Print";
import { GmMod } from "./gm/GmMod";
import { TestMod } from "./test/TestMod";

export class DebugGM {
    static init() {
        Print.print("DebugGM init");
        //调用性能统计面板方法，(0,0)为面板位置坐标
        Laya.Stat.show(0,0);
        TestMod.init();
        GmMod.init();
    }
}