import { StringUtil } from "../utils/StringUtil";
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
    
    private static getFileNameAndLine(err: Error): string{
        if (err == null) return "";
        let stack = err.stack;
        let stackArr = stack.split('\n');
        let str = "";
        if (stackArr.length > 2)
        {
            let path = stackArr[3];
            if (!StringUtil.isNullOrEmpty(path))
            {
                //let val = path.match(".+/([^/]*)%.%w+$")
                let vv = path.split(' ')
                let len = 5;
                if (vv.length >= len)
                {
                    let xx = vv[vv.length - 1].split(':');
                    str = StringUtil.formatString("[{0}:{1}] ", vv[len], xx[xx.length - 1]);
                }
            }
        }
        return str;
    }

    private static format(bStack: boolean, ...param: any[]): string
    {
        let err = Error();
        let str = this.getFileNameAndLine(err) + param.join(" ");
        if (bStack)
        {
            str += err.stack;
        }
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
            xlog.debug(this.format(false, ...param));
    }
    static printBeginTime(...param: any[])
    {
        let xlog = this.getXlog();
        if (xlog && xlog.canLog(XLog.DEBUG))
            console.time(this.format(false, ...param));
    }
    static printEndTime(...param: any[])
    {
        let xlog = this.getXlog();
        if (xlog && xlog.canLog(XLog.DEBUG))
            console.timeEnd(this.format(false, ...param));
    }
    static printWarn(...param: any[])
    {
        let xlog = this.getXlog();
        if (xlog && xlog.canLog(XLog.WARN))
            xlog.warn(this.format(false, ...param));
    }
    static printError(...param: any[])
    {
        let xlog = this.getXlog();
        if (xlog && xlog.canLog(XLog.ERROR))
            xlog.error(this.format(false, ...param));
    }
    static printTrace(...param: any[])
    {
        let xlog = this.getXlog();
        if (xlog && xlog.canLog(XLog.DEBUG))
        {
            xlog.debug(this.format(true, ...param));
        }
    }
    static printTraceError(...param: any[])
    {
        let xlog = this.getXlog();
        if (xlog && xlog.canLog(XLog.ERROR))
        {
            xlog.error(this.format(true, ...param));
        }
    }
    static printTable(param: any, ...param2: any[])
    {
        let xlog = this.getXlog();
        if (xlog && xlog.canLog(XLog.DEBUG))
        {
            var jsonString = JSON.stringify(param);
            xlog.debug(this.format(false, param2, jsonString));
        }
    }
}