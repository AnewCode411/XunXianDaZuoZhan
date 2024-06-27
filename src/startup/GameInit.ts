const { regClass, property } = Laya;
import { ScriptSingleton } from "./../common/singleton/ScriptSingleton"
import { Game } from "./Game"
import { GameConfig } from "./GameConfig";

@regClass()
export class GameInit extends ScriptSingleton<GameInit>() {
    private m_game : Game;

    // 通用设置:
    @property({type: "boolean"})
    RunScene: boolean = false;

    // 
    @property({type: "number"})
    ApkType: number = 1;
    @property({type: "string"})
    Lang: string = "zh";

    @property({type: "any"})
    Config: GameConfig = new GameConfig();


    onStart() {
        if (this.m_game == null) this.m_game = Game.getInstance();
        // this.m_game.init();
    }

    onUpdate(): void {
        this.m_game.update();
    }

    onLateUpdate(): void {
        this.m_game.lateUpdate();
    }
}