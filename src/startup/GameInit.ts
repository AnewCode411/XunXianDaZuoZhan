const { regClass, property } = Laya;
import { ScriptSingleton } from "./../common/singleton/ScriptSingleton"

@regClass()
export class GameInit extends ScriptSingleton {
    onStart() {
        console.log("Game start");
    }
}