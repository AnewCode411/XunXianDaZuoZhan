
export class GameUpdateListerner {
    private m_eventList: any = {};
    addEvent(modName: string, fnEvent: any) {
        if (modName === null || modName.length <= 0) return;
        if (typeof fnEvent != "function") return;
        this.m_eventList[modName] = fnEvent;
    }
    hasEvent(modName: string) {
        return this.m_eventList[modName] != null;
    }
    removeEvent(modName: string) {
        this.m_eventList[modName] = null;
    }
    clearEvent() {
        this.m_eventList = {};
    }
    update(deltaTime: number) {
        for (let modName in this.m_eventList) {
            let fnEvent = this.m_eventList[modName];
            if (fnEvent != null) {
                fnEvent(deltaTime);
            }
        }
    }
}