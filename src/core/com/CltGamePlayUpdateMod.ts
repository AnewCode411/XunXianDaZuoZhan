import { Singleton } from "../../common/singleton/Singleton";
import { GameUpdateListerner } from "../../common/utils/GameUpdateListener";

export class CltGamePlayUpdateMod extends Singleton {
    private m_oEveryFrameUpdateEvent: GameUpdateListerner;
    private m_o30FpsUpdateEvent: GameUpdateListerner;
    private m_o15FpsUpdateEvent: GameUpdateListerner;
    private m_oEveryFrameLateUpdateEvent: GameUpdateListerner;
    private m_o30FpsLateUpdateEvent: GameUpdateListerner;
    private m_o15FpsLateUpdateEvent: GameUpdateListerner;
    private m_updateSecondEvent: GameUpdateListerner;

    init() {
        this.m_oEveryFrameUpdateEvent = new GameUpdateListerner();
        this.m_o30FpsUpdateEvent = new GameUpdateListerner();
        this.m_o15FpsUpdateEvent = new GameUpdateListerner();
        this.m_oEveryFrameLateUpdateEvent = new GameUpdateListerner();
        this.m_o30FpsLateUpdateEvent = new GameUpdateListerner();
        this.m_o15FpsLateUpdateEvent = new GameUpdateListerner();
        this.m_updateSecondEvent = new GameUpdateListerner();
    }

    /// EveryFrame update
    updateEveryFrame(deltaTime: number) {
        this.m_oEveryFrameUpdateEvent.update(deltaTime);
    }
    
    addEveryFrameUpdateEvent(modName: string, fnEvent: any) {
        this.m_oEveryFrameUpdateEvent.addEvent(modName, fnEvent);
    }

    hasEveryFrameUpdateEvent(modName: string): boolean {
        return this.m_oEveryFrameUpdateEvent.hasEvent(modName);
    }

    removeEveryFrameUpdateEvent(modName: string) {
        this.m_oEveryFrameUpdateEvent.removeEvent(modName);
    }

    /// 30 fps udate
    update(deltaTime: number) {
        this.m_o30FpsUpdateEvent.update(deltaTime);
    }

    addUpdateEvent(modName: string, fnEvent: any) {
        this.m_o30FpsUpdateEvent.addEvent(modName, fnEvent);
    }

    hasUpdateEvent(modName: string): boolean {
        return this.m_o30FpsUpdateEvent.hasEvent(modName);
    }

    removeUpdateEvent(modName: string) {
        this.m_o30FpsUpdateEvent.removeEvent(modName);
    }

    /// 15 fps udate
    update15fps(deltaTime: number) {
        this.m_o15FpsUpdateEvent.update(deltaTime);
    }

    add15FpsUpdateEvent(modName: string, fnEvent: any) {
        this.m_o15FpsUpdateEvent.addEvent(modName, fnEvent);
    }

    has15FpsUpdateEvent(modName: string): boolean {
        return this.m_o30FpsUpdateEvent.hasEvent(modName);
    }

    remove15FpsUpdateEvent(modName: string) {
        this.m_o30FpsUpdateEvent.removeEvent(modName);
    }

    /// EveryFrame late update
    lateUpdateEveryFrame(deltaTime: number) {
        this.m_oEveryFrameLateUpdateEvent.update(deltaTime);
    }

    addEveryFrameLateUpdateEvent(modName: string, fnEvent: any) {
        this.m_oEveryFrameLateUpdateEvent.addEvent(modName, fnEvent);
    }

    hasEveryFrameLateUpdateEvent(modName: string): boolean {
        return this.m_oEveryFrameLateUpdateEvent.hasEvent(modName);
    }

    removeEveryFrameLateUpdateEvent(modName: string) {
        this.m_oEveryFrameLateUpdateEvent.removeEvent(modName);
    }

    /// 30 fps late update
    lateUpdate(deltaTime: number) {
        this.m_o30FpsLateUpdateEvent.update(deltaTime);
    }

    addLateUpdateEvent(modName: string, fnEvent: any) {
        this.m_o30FpsLateUpdateEvent.addEvent(modName, fnEvent);
    }

    hasLateUpdateEvent(modName: string): boolean {
        return this.m_o30FpsLateUpdateEvent.hasEvent(modName);
    }

    removeLateUpdateEvent(modName: string) {
        this.m_o30FpsLateUpdateEvent.removeEvent(modName);
    }

    /// 15 fps late update
    lateUpdate15fps(deltaTime: number) {
        this.m_o15FpsLateUpdateEvent.update(deltaTime);
    }

    add15FpsLateUpdateEvent(modName: string, fnEvent: any) {
        this.m_o15FpsLateUpdateEvent.addEvent(modName, fnEvent);
    }

    has15FpsLateUpdateEvent(modName: string): boolean {
        return this.m_o30FpsLateUpdateEvent.hasEvent(modName);
    }

    remove15FpsLateUpdateEvent(modName: string) {
        this.m_o30FpsLateUpdateEvent.removeEvent(modName);
    }

    clearAllEvent() {
        this.m_oEveryFrameUpdateEvent.clearEvent();
        this.m_o30FpsUpdateEvent.clearEvent();
        this.m_o15FpsUpdateEvent.clearEvent();
        this.m_oEveryFrameLateUpdateEvent.clearEvent();
        this.m_o30FpsLateUpdateEvent.clearEvent();
        this.m_o15FpsLateUpdateEvent.clearEvent();
        this.m_updateSecondEvent.clearEvent();
    }

    /// second udate
    updateSecond(deltaTime: number) {
        this.m_updateSecondEvent.update(deltaTime);
    }

    addUpdateSecondEvent(modName: string, fnEvent: any) {
        this.m_updateSecondEvent.addEvent(modName, fnEvent);
    }

    hasUpdateSecondEvent(modName: string): boolean {
        return this.m_updateSecondEvent.hasEvent(modName);
    }

    removeUpdateSecondEvent(modName: string) {
        this.m_updateSecondEvent.removeEvent(modName);
    }
}