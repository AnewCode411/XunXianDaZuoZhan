import { Singleton } from "../singleton/Singleton";

export class TimeInfo extends Singleton {
    private m_timeZone: number = 0;
    FrameTime: number = 0;
    ServerMinusClientTime: number = 0;
    protected init(): void {
    }

    get TimeZone(): number { return this.m_timeZone; }
    set TimeZone(value: number) { 
        this.m_timeZone = value;
    }

    clientNow(): number {
        return Date.now();
    }

    clientFrameTime() {
        return this.FrameTime;
    }

    serverNow()
    {
        return this.clientNow() + this.ServerMinusClientTime;
    }

    serverFrameTime() {
        return this.FrameTime + this.ServerMinusClientTime;
    }

    update()
    {
        this.FrameTime = Laya.stage.getFrameTm();   // 每帧开始的时间
    }

    dispose(): void {

    }

}