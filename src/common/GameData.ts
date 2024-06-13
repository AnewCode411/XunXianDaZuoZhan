const { regClass, property } = Laya;
import { Singleton } from "./../common/singleton/Singleton"

@regClass()
export class GameData extends Singleton {
    private _G: any = null; // 全局数据
    init()
    {
        if (this._G == null)
        {
            this._G = {};
            this._G._cfg = {};  // 配置数据
        }
    }
    getDataByKey(name: string): any {
        return this._G[name];
    }
}