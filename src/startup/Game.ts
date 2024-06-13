const { regClass, property } = Laya;
import { Singleton } from "./../common/singleton/Singleton"
import { XLog } from "./../common/log/XLog"
import { GameData } from "./../common/GameData"

@regClass()
export class Game extends Singleton {
    init() {
        XLog.getInstance().init();
        XLog.getInstance().addLevel(0);
        GameData.getInstance().init();
        XLog.getInstance().debug("Game init");
        XLog.getInstance().info("Game init");
        XLog.getInstance().proto("Game init");
        XLog.getInstance().warn("Game init");
        XLog.getInstance().vital("Game init");
        XLog.getInstance().error("Game init");
    }

    update() {

    }

    lateUpdate() {

    }
}