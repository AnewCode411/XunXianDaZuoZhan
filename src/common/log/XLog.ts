const { regClass, property } = Laya;
import { ScriptSingleton } from "./../singleton/ScriptSingleton"
import { DateUtil } from "../util/DateUtil";

@regClass()
export class XLog extends ScriptSingleton<XLog>() {
    private m_logLevel: boolean[] = [ false, false, false, false, false, false, false ];
    private ALL: number = 0; //所有
    private DEBUG: number = 1; //调试
    private INFO: number = 2; //一般信息
    private PROTO: number = 3; //协议
    private WARN: number = 4; //警告
    private ERROR: number = 5; //错误
    private VITAL: number = 6; //重要流程

    init() {
        this.initLogFile();
    }

    private initLogFile() {

    }

    canLog(level: number)
    {
        if (this.m_logLevel[this.ALL] || this.m_logLevel[level]) return true;
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
        if (!this.canLog(this.DEBUG)) return;
        console.log(this.getCurTime() + "[DEBUG]\t" + log);
    }

    vital(log: string)
    {
        if (!this.canLog(this.VITAL)) return;
        console.log(this.getCurTime() + "[VITAL]\t" + log);
    }

    info(log: string)
    {
        if (!this.canLog(this.INFO)) return;
        console.log(this.getCurTime() + "[INFO]\t" + log);
    }

    proto(log: string)
    {
        if (!this.canLog(this.PROTO)) return;
        console.log(this.getCurTime() + "[PROTO]\t" + log);
    }

    warn(log: string)
    {
        if (!this.canLog(this.WARN)) return;
        console.warn(this.getCurTime() + "[WARN]\t" + log);
    }

    error(log: string)
    {
        if (!this.canLog(this.ERROR)) return;
        console.error(this.getCurTime() + "[ERROR]\t" + log);
    }

    private getCurTime(all: boolean = false): string
    {
        var fmt = all ? "[MM-dd HH:mm:ss xxx]" : "[HH:mm:ss xxx]";
        var rtime = DateUtil.dateFormat(fmt);
        return rtime;
    }
}