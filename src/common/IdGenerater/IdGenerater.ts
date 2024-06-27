import { GameInit } from "../../startup/GameInit";
import { Print } from "../log/Print";
import { Singleton } from "../singleton/Singleton";
import { TimeInfo } from "../time/TimeInfo";
import { StringUtil } from "../utils/StringUtil";

class IdStruct {
    Time: number;    // 30bit
    Process: number;  // 18bit
    Value: number; // 16bit

    toLong(): number
    {
        let result = 0;
        result |= this.Value;
        result |= this.Process << 16;
        result |= this.Time << 34;
        return result;
    }

    setValueTPV(time: number, process: number, value: number)
    {
        this.Process = process;
        this.Time = time;
        this.Value = value;
    }

    setValueID(id: number)
    {
        let result = id; 
        this.Value = (result & UshortMaxValue);
        result >>= 16;
        this.Process = (result & Mask18bit);
        result >>= 18;
        this.Time = result;
    }

    reset() {
        this.Time = 0;
        this.Process = 0;
        this.Value = 0;
    }

    toString(): string
    {
        return StringUtil.formatString("process: {0}, value: {1}, thime: {2}", this.Process, this.Value, this.Time);
    }
}

class InstanceIdStruct {
    Time: number;   // 当年开始的tick 28bit
    Process: number; // 18bit
    Value: number;  // 18bit

    toLong(): number {
        let result = 0;
        result |= this.Value;
        result |= this.Process << 18;
        result |= this.Time << 36;
        return result;
    }

    constructor() {}

    setValueID(id: number) {
        let result = id;
        this.Value = (result & Mask18bit);
        result >>= 18;
        this.Process = (result & Mask18bit);
        result >>= 18;
        this.Time = result;
    }

    setValueTPV(time: number, process: number, value: number) {
        this.Time = time;
        this.Process = process;
        this.Value = value;
    }
    
    // 给SceneId使用
    setValuePV(process: number, value: number)
    {
        this.Time = 0;
        this.Process = process;
        this.Value = value;
    }

    reset() {
        this.Time = 0;
        this.Process = 0;
        this.Value = 0;
    }

    toString(): string
    {
        return StringUtil.formatString("process: {0}, value: {1}, thime: {2}", this.Process, this.Value, this.Time);
    }
}

class UnitIdStruct {
    Time: number;        // 30bit 34年
    Zone: number;      // 10bit 1024个区
    ProcessMode: number; // 8bit  Process % 256  一个区最多256个进程
    Value: number;     // 16bit 每秒每个进程最大16K个Unit

    toLong(): number
    {
        let result = 0;
        result |= this.Value;
        result |= this.ProcessMode << 16;
        result |= this.Zone << 24;
        result |= this.Time << 34;
        return result;
    }

    setValueZPTV(zone: number, process: number, time: number, value: number)
    {
        this.Time = time;
        this.ProcessMode = (process % 256);
        this.Value = value;
        this.Zone = zone;
    }
    
    setValueID(id: number)
    {
        let result = id;
        this.Value = (result & UshortMaxValue);
        result >>= 16;
        this.ProcessMode = (result & ByteMaxValue);
        result >>= 8;
        this.Zone = (result & 0x03ff);
        result >>= 10;
        this.Time = result;
    }

    reset() {
        this.Time = 0;
        this.ProcessMode = 0;
        this.Value = 0;
        this.Zone = 0;
    }
                    
    toString(): string
    {
        return StringUtil.formatString("ProcessMode: {0}, value: {1}, thime: {2}", this.ProcessMode, this.Value, this.Time);
    }
    
    getUnitZone(unitId: number): number
    {
        let v = ((unitId >> 24) & 0x03ff); // 取出10bit
        return v;
    }
}
const ByteMaxValue = 255;
const UshortMaxValue = 65535;
const Mask18bit = 0x03ffff;
const MaxZone = 1024;
const Epoch2024MS = 1704038400000; // 2024-01-01 00:00:00 ms
export class IdGenerater extends Singleton {
    value: number = 0;
    lastIdTime: number = 0;
    epochThisYear: number = 0;
    instanceIdValue: number = 0;
    lastInstanceIdTime: number = 0;
    unitIdValue: number = 0;
    lastUnitIdTime: number = 0;
    private m_instanceIdStruct: InstanceIdStruct;
    private m_unitIdStruct: UnitIdStruct;
    private m_idStruct: IdStruct;
    protected init(): void {
        let date = new Date();
        let epoch1970tick = date.getTime();
        let near = date.getUTCFullYear();
        let curDate = new Date(near, 1, 1);
        this.epochThisYear = curDate.getTime();

        this.lastInstanceIdTime = this.timeSinceThisYear();
        if (this.lastInstanceIdTime <= 0) {
            Print.printWarn(StringUtil.formatString("lastInstanceIdTime less than 0: {0}", this.lastInstanceIdTime));
            this.lastInstanceIdTime = 1;
        }
        this.lastIdTime = this.timeSince2024();
        if (this.lastIdTime <= 0) {
            Print.printWarn(StringUtil.formatString("lastIdTime less than 0: {0}", this.lastIdTime));
            this.lastIdTime = 1;
        }
        this.lastUnitIdTime = this.timeSince2024();
        if (this.lastUnitIdTime <= 0)
        {
            Print.printWarn(StringUtil.formatString("lastUnitIdTime less than 0: {0}", this.lastUnitIdTime));
            this.lastUnitIdTime = 1;
        }
    }

    timeSinceThisYear(): number {
        return (TimeInfo.getInstance().FrameTime - this.epochThisYear) / 10000;
    }

    timeSince2024(): number {
        return (TimeInfo.getInstance().FrameTime - Epoch2024MS) / 1000;
    }

    generateInstanceId(): number {
        let time = this.timeSinceThisYear();
        if (time > this.lastInstanceIdTime) {
            this.lastInstanceIdTime = time;
            this.instanceIdValue = 0;
        }
        else {
            ++this.instanceIdValue;
            if (this.instanceIdValue > Mask18bit - 1) // 18bit
            {
                ++this.lastInstanceIdTime; // 借用下一秒
                this.instanceIdValue = 0;
                Print.printError(StringUtil.formatString("instanceid count per sec overflow: {0} {1}", time, this.lastInstanceIdTime));
            }
        }
        if (this.m_instanceIdStruct == null) this.m_instanceIdStruct = new InstanceIdStruct();
        this.m_instanceIdStruct.reset();
        this.m_instanceIdStruct.setValueTPV(this.lastInstanceIdTime, GameInit.getInstance().Config.Process, this.instanceIdValue);
        return this.m_instanceIdStruct.toLong();
    }

    generateId(): number {
        let time = this.timeSince2024();
        if (time > this.lastIdTime) {
            this.lastIdTime = time;
            this.value = 0;
        }
        else {
            ++this.value;
            
            if (this.value > UshortMaxValue - 1)
            {
                this.value = 0;
                ++this.lastIdTime; // 借用下一秒
                Print.printError(StringUtil.formatString("id count per sec overflow: {0} {1}", time, this.lastIdTime));
            }
        }
        if (this.m_idStruct == null) this.m_idStruct = new IdStruct();
        this.m_idStruct.reset();
        this.m_idStruct.setValueTPV(this.lastIdTime, GameInit.getInstance().Config.Process, this.value);
        return this.m_idStruct.toLong();
    }

    generateUnitId(zone: number): number
    {
        if (zone > MaxZone) {
            Print.printError(StringUtil.formatString("zone > MaxZone: {0}", zone));
            return 0;
        }
        let time = this.timeSince2024();
        if (time > this.lastUnitIdTime){
            this.lastUnitIdTime = time;
            this.unitIdValue = 0;
        }
        else {
            ++this.unitIdValue;
            if (this.unitIdValue > UshortMaxValue - 1)
            {
                this.unitIdValue = 0;
                ++this.lastUnitIdTime; // 借用下一秒
                Print.printError(StringUtil.formatString("unitid count per sec overflow: {0} {1}", time, this.lastUnitIdTime));
            }
        }
        if (this.m_unitIdStruct == null) this.m_unitIdStruct = new UnitIdStruct();
        this.m_unitIdStruct.reset();
        this.m_unitIdStruct.setValueZPTV(zone, GameInit.getInstance().Config.Process, this.lastUnitIdTime, this.unitIdValue);
        return this.m_unitIdStruct.toLong();
    }

    dispose(): void {
        
    }
}


