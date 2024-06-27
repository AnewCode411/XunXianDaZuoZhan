const { regClass, property } = Laya;
import { Print } from "../log/Print";
import { Singleton } from "./../singleton/Singleton"

@regClass()
export class LoaderMod extends Singleton {
    VERSION: string = "version";
    PATCH: string = "patch";
    EXTRA: string = "extra";
    USERDATA: string = "userdata";
    USEROTHER: string = "userother";
    patchDataPath: string;
    extraDataPath: string;
    userDataPath: string;
    userOtherPath: string;

    private m_loader: Laya.Loader;
    private m_defaultData: any = null;
    protected init()
    {
        this.m_loader = Laya.loader;
    }

    // 加载JSON文件
    async loaderJson(url: string): Promise<any> {
        let _cfg = await this.m_loader.load({url: url, type: Laya.Loader.JSON, cache: false});
        //Print.print(url);
        if (_cfg == null) {
            if (this.m_defaultData == null) this.m_defaultData = {_bLoader: true}; 
            return this.m_defaultData;
        }
        return _cfg.data;
    }

    // async loaderJsonArray(url: Array<string>): Promise<any> {
    //     let _cfg = await this.m_loader.load({url: url, type: Laya.Loader.JSON, cache: false});
    //     return _cfg.data;
    // }
    dispose(): void {
        
    }
}