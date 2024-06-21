const { regClass, property } = Laya;
import { Singleton } from "../common/singleton/Singleton"
import { Print } from "../common/log/Print";
import { ApkMod } from "../common/apk/ApkMod";
import { DebugGM } from "../debug/DebugGM"; // 脚本屏蔽
import { LoaderMod } from "../common/loader/LoaderMod";
import { CfgMod } from "../common/CfgMod";
import { HotfixMod } from "../hotfix/HotfixMod";
import { PlayerStoreMod } from "../common/store/PlayerStoreMod";

@regClass()
export class Game extends Singleton {
    init() {
        HotfixMod.init();   // 位置不改
        let _apk = ApkMod.getInstance();
        _apk.init();
        Print.init(0);
        PlayerStoreMod.init();
        
        LoaderMod.getInstance().init();
        CfgMod.getInstance().init();
        if (_apk.isDeug()) {
            DebugGM.init(); // 脚本屏蔽
        }
    }

    update() {

    }

    lateUpdate() {

    }
}