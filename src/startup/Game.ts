const { regClass, property } = Laya;
import { Singleton } from "../common/singleton/Singleton"
import { GameData } from "../common/GameData"
import { Print } from "../common/log/Print";

@regClass()
export class Game extends Singleton {
    init() {
        Print.init(0);
        GameData.getInstance().init();
    }

    update() {

    }

    lateUpdate() {

    }
}