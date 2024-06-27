const { regClass, property } = Laya;
import { GameInit } from "../../startup/GameInit";
import { Singleton } from "./../singleton/Singleton"

@regClass()
export class ApkMod extends Singleton {
    //private m_systemLanguage: string;
    private m_isDebug: boolean;
    private m_isRelease: boolean;
    private m_isOnline: boolean;
    private m_isPCPlatform: boolean;
    private m_isAndroidPlatform: boolean;
    private m_isIOSPlatform: boolean;
    private m_isOnMiniGame: boolean;        //  微信小游戏
    protected init()
    {
        let apkType = GameInit.getInstance().ApkType;
        this.m_isDebug = apkType < 2000
        this.m_isRelease = apkType >= 2000 && apkType < 3000
        this.m_isOnline = apkType >= 3000

        let browser = Laya.Browser;
        this.m_isOnMiniGame = browser.onMiniGame;
        this.m_isPCPlatform = (browser.platform === browser.PLATFORM_PC);
        this.m_isAndroidPlatform = (browser.platform === browser.PLATFORM_ANDROID);
        this.m_isIOSPlatform = (browser.platform === browser.PLATFORM_IOS);
    }
    isDeug(): boolean { return this.m_isDebug }
    isRelease(): boolean { return this.m_isRelease }
    isOnline(): boolean { return this.m_isOnline }
    isOnMiniGame(): boolean { return this.m_isOnMiniGame }
    isPCPlatform(): boolean { return this.m_isPCPlatform }
    isAndroidPlatform(): boolean { return this.m_isAndroidPlatform }
    isIOSPlatform(): boolean { return this.m_isIOSPlatform }
    dispose(): void {
        
    }
}