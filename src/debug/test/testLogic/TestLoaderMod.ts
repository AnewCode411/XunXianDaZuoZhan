import { CfgMod } from "../../../common/CfgMod";
import { Print } from "../../../common/log/Print";

export class TestLoaderMod {
    static init() {
        let _cfgMod = CfgMod.getInstance();
        Print.printTable(_cfgMod.getDataByKey("cfgName"));
        _cfgMod.getDataByKey("cfgName", ()=>{
            Print.printTable(_cfgMod.getDataByKey("cfgName"), 1);
        })
        _cfgMod.getDataByKey("cfgName", ()=>{
            Print.printTable(_cfgMod.getDataByKey("cfgName"), 2);
        })
        _cfgMod.getDataByKey("cfgName", ()=>{
            Print.printTable(_cfgMod.getDataByKey("cfgName"), 3);
        })
        _cfgMod.getDataByKey("cfgName2", ()=>{
            Print.printTable(_cfgMod.getDataByKey("cfgName2"), 6);
        })
        _cfgMod.getDataByKey("cfgName3", ()=>{
            Print.printTable(_cfgMod.getDataByKey("cfgName3"), 6, 1);
        })
        _cfgMod.getDataByKey("cfgName4", ()=>{
            Print.printTable(_cfgMod.getDataByKey("cfgName4"), 6, 2);
        })
        _cfgMod.getDataByKey("cfgName2", ()=>{
            Print.printTable(_cfgMod.getDataByKey("cfgName2"), 7);
            //Print.printTable(_cfgMod.m_cfg);
        })
        _cfgMod.getDataByKey("cfgName", TestLoaderMod.loadDataxx)
    }

    static loadDataxx(data: any)
    {
        Print.printTable(data, "xxx");
    }
}