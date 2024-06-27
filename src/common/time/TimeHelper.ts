import { TimeInfo } from "./TimeInfo";


export class TimeHelper {
    static OneDay: number = 86400000;
    static Hour: number = 3600000;
    static Minute: number = 60000;
    /// <summary>
    /// 客户端时间
    /// </summary>
    /// <returns></returns>
    static clientNow(): number
    {
        return TimeInfo.getInstance().clientNow();
    }

    static clientNowSeconds(): number
    {
        return this.clientNow() / 1000;
    }

    static serverNow(): number
    {
        return TimeInfo.getInstance().serverNow();
    }

    static clientFrameTime()
    {
        return TimeInfo.getInstance().clientFrameTime();
    }
    
    static serverFrameTime()
    {
        return TimeInfo.getInstance().serverFrameTime();
    }
}