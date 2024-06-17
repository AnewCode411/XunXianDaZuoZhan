const { regClass, property } = Laya;
import { GameInit } from "../../startup/GameInit";
import { Singleton } from "./../singleton/Singleton"

@regClass()
export class ApkMod extends Singleton {
    private m_systemLanguage: string;
    private m_isDebug: boolean;
    private m_isRelease: boolean;
    private m_isOnline: boolean;
    private m_isPCVersion: boolean;
    private m_isMobileVersion: boolean;
    init()
    {
        let apkType = GameInit.getInstance().ApkType;
        this.m_isDebug = apkType < 2000
        this.m_isRelease = apkType >= 2000 && apkType < 3000
        this.m_isOnline = apkType >= 3000
    }
    isDeug(): boolean { return this.m_isDebug }
    isRelease(): boolean { return this.m_isRelease }
    isOnline(): boolean { return this.m_isOnline }
    isPCVersion(): boolean { return this.m_isPCVersion }
    isMobileVersion(): boolean { return this.m_isMobileVersion }
}