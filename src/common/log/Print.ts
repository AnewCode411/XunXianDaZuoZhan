import { XLog } from "./XLog";

const { regClass, property } = Laya;

@regClass()
export class Print {
    private static _xlog: XLog = null;
    private static getXlog(): XLog
    {
        if (this._xlog == null) this._xlog = XLog.getInstance();
        return this._xlog;
    }
    private static format(...param: any[]): string
    {
        let str = param.join(" ");
        return str;
    }
    static init(level: number)
    {
        if (this._xlog == null)
        {
            this._xlog = XLog.getInstance();
            this._xlog.addLevel(level);
        }
    }
    static print(...param: any[])
    {
        let xlog = this.getXlog();
        if (xlog && xlog.canLog(XLog.DEBUG))
            xlog.debug(this.format(...param));
    }
    static printWarn(...param: any[])
    {
        let xlog = this.getXlog();
        if (xlog && xlog.canLog(XLog.WARN))
            xlog.warn(this.format(...param));
    }
    static printError(...param: any[])
    {
        let xlog = this.getXlog();
        if (xlog && xlog.canLog(XLog.ERROR))
            xlog.error(this.format(...param));
    }
    static printTrace(...param: any[])
    {
        let xlog = this.getXlog();
        if (xlog && xlog.canLog(XLog.DEBUG))
        {
            let error = new Error();
            xlog.debug(this.format(...param) + "\n" + error.stack);
        }
    }

    static printTraceError(...param: any[])
    {
        let xlog = this.getXlog();
        if (xlog && xlog.canLog(XLog.ERROR))
        {
            let error = new Error();
            xlog.error(this.format(...param) + "\n" + error.stack);
        }
    }

    static printTable(param: any, ...param2: any[])
    {
        let xlog = this.getXlog();
        if (xlog && xlog.canLog(XLog.DEBUG))
        {
            var jsonString = JSON.stringify(param);
            xlog.debug(this.format(param2, jsonString));
        }
    }
}