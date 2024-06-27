const { regClass, property } = Laya;
import { Singleton } from "./../common/singleton/Singleton"
import { LoaderMod } from "./loader/LoaderMod";
import { Print } from "./log/Print";

@regClass()
export class CfgMod extends Singleton {
    m_cfg: any = null; // 全局数据
    private m_loaderMod: LoaderMod = null;
    private m_cfgInfoCB: Array<Function> = null;
    private m_cfgOtherCB: any = null;
    protected init()
    {
        this.m_loaderMod = LoaderMod.getInstance();
        if (this.m_cfg == null)
        {
            this.m_cfg = {};
            this.m_loaderMod.loaderJson("cfg/cfgInfo.json").then((_cfg) => {
                this.setDataByKey("cfgInfo", _cfg);
                //Print.printTable(this.getDataByKey("cfgInfo"));
                if (this.m_cfgInfoCB != null)
                {
                    this.m_cfgInfoCB.forEach((fn, idx, array) => {
                        if (fn != null) fn();
                    });
                    this.m_cfgInfoCB = null;
                }
            });
        }
    }

    private loadDataCfg(name: string, cb?: Function)
    {
        let data = this.m_cfg[name];
        if (data == null) {
            let info = this.m_cfg.cfgInfo;
            if (info == null) {
                if (this.m_cfgInfoCB == null)
                {
                    this.m_cfgInfoCB = [];
                }
                this.m_cfgInfoCB.push(() => {
                    this.loadDataCfg(name, cb);
                });
                return;
            }
            if (info.fileList == null){
                Print.printWarn("cfgInfo.json file loader error: cfgInfo");
                return;
            };
            let url = info.fileList[name];
            if (url == null) {
                Print.printWarn("json file not found: " + name);
                return;
            }
            if (this.m_cfgOtherCB == null) this.m_cfgOtherCB = {};
            let bLoader = true;
            if (this.m_cfgOtherCB[name] == null) {
                this.m_cfgOtherCB[name] = [];
                bLoader = false;
            }
            if (cb != null) this.m_cfgOtherCB[name].push(cb);
            if (bLoader) return;
            this.m_loaderMod.loaderJson(url).then((_cfg) => {
                this.setDataByKey(name, _cfg);
                if (this.m_cfgOtherCB && this.m_cfgOtherCB[name])
                {
                    let arr: any[] = this.m_cfgOtherCB[name];
                    arr.forEach((fn, idx, array) => {
                        if (fn != null) fn(_cfg);
                    });
                    this.m_cfgOtherCB[name] = null;
                }
            });
        }
        else {
            if (cb != null) cb(data);
        }
    }

    private setDataByKey(name: string, data: any){
        this.m_cfg[name] = data;
    }

    getDataByKey(name: string, cb?: Function): any {
        if (cb != null)
        {
            this.loadDataCfg(name, cb);
        }
        return this.m_cfg[name];
    }

    dispose(): void {
        
    }
}