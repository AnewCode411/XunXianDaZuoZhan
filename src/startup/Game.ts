const { regClass, property } = Laya;
import { Singleton } from "../common/singleton/Singleton"
import { GameData } from "../common/GameData"
import { Print } from "../common/log/Print";
import { ApkMod } from "../common/apk/ApkMod";
import { DebugGM } from "../debug/DebugGM"; // 脚本屏蔽

@regClass()
export class Game extends Singleton {
    init() {
        let apk = ApkMod.getInstance();
        apk.init();
        Print.init(0);
        GameData.getInstance().init();

        if (apk.isDeug()) {
            Print.print("isDebug");
            DebugGM.init(); // 脚本屏蔽
        }
    }

    update() {

    }

    lateUpdate() {

    }
}