const { regClass, property } = Laya;
import { ScriptSingleton } from "./../singleton/ScriptSingleton"
import { DateUtil } from "../utils/DateUtil";

@regClass()
export class XLog extends ScriptSingleton<XLog>() {
    private m_logLevel: boolean[] = [ false, false, false, false, false, false, false ];
    static ALL: number = 0; //所有
    static DEBUG: number = 1; //调试
    static INFO: number = 2; //一般信息
    static PROTO: number = 3; //协议
    static WARN: number = 4; //警告
    static ERROR: number = 5; //错误
    static VITAL: number = 6; //重要流程

    init() {
        this.initLogFile();
    }

    private initLogFile() {

    }

    canLog(level: number)
    {
        if (this.m_logLevel[XLog.ALL] || this.m_logLevel[level]) return true;
        else return false;
    }

    addLevel(level: number)
    {
        if (level < 0 || level >= this.m_logLevel.length) return;
        this.m_logLevel[level] = true;
    }

    clearLog()
    {
        for (var i = 0; i < this.m_logLevel.length; i++)
        {
            this.m_logLevel[i] = false;
        }
    }

    debug(log: string)
    {
        if (!this.canLog(XLog.DEBUG)) return;
        console.log(this.getCurTime() + "[DEBUG]\t" + log);
    }

    vital(log: string)
    {
        if (!this.canLog(XLog.VITAL)) return;
        console.log(this.getCurTime() + "[VITAL]\t" + log);
    }

    info(log: string)
    {
        if (!this.canLog(XLog.INFO)) return;
        console.log(this.getCurTime() + "[INFO]\t" + log);
    }

    proto(log: string)
    {
        if (!this.canLog(XLog.PROTO)) return;
        console.log(this.getCurTime() + "[PROTO]\t" + log);
    }

    warn(log: string)
    {
        if (!this.canLog(XLog.WARN)) return;
        console.warn(this.getCurTime() + "[WARN]\t" + log);
    }

    error(log: string)
    {
        if (!this.canLog(XLog.ERROR)) return;
        console.error(this.getCurTime() + "[ERROR]\t" + log);
    }

    private getCurTime(all: boolean = false): string
    {
        var fmt = all ? "[MM-dd HH:mm:ss xxx]" : "[HH:mm:ss xxx]";
        var rtime = DateUtil.dateFormat(fmt);
        return rtime;
    }
}