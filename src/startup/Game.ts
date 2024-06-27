const { regClass, property } = Laya;
import { Singleton } from "../common/singleton/Singleton"
import { Print } from "../common/log/Print";
import { ApkMod } from "../common/apk/ApkMod";
import { DebugGM } from "../debug/DebugGM"; // 脚本屏蔽
import { LoaderMod } from "../common/loader/LoaderMod";
import { CfgMod } from "../common/CfgMod";
import { HotfixMod } from "../hotfix/HotfixMod";
import { PlayerStoreMod } from "../common/store/PlayerStoreMod";
import { GameMain } from "../core/GameMain";

@regClass()
export class Game extends Singleton {
    private m_timer: Laya.Timer;
    protected init() {
        this._init();
    }

    update() {
        let delta = this.m_timer.delta;
        this._update(delta);
    }

    lateUpdate() {
        let delta = this.m_timer.delta;
        this._lateUpdate(delta);
    }

    private _init() {
        this.m_timer = Laya.timer;
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

        GameMain.init();
    }

    private _update(deltaTime: number) {
        GameMain.update(deltaTime);
    }

    private _lateUpdate(deltaTime: number) {
        GameMain.lateUpdate(deltaTime);
    }

    dispose(): void {
        
    }
}