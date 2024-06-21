import { CltGamePlayUpdateMod } from "./com/CltGamePlayUpdateMod";
import { InputMod } from "./input/InputMod";


let n30FpsCheckDt: number = 0.022  // 帧率精度问题，定为0.022
let n15FpsCheckDt: number = 0.057  // 帧率精度问题，定为0.057
let CGPUM_UpdateMod: CltGamePlayUpdateMod;
let IM_InputMod: InputMod;

export class GameMain {
    private static m_n30fpsDt: number = 0;
    private static m_nUpdateSec: number = 0;
    private static m_b30FpsCanUpdate: boolean = false;
    static init() {
        CGPUM_UpdateMod = CltGamePlayUpdateMod.getInstance();
        CGPUM_UpdateMod.init();
        IM_InputMod = InputMod.getInstance();
        IM_InputMod.init();
    }

    static update(deltaTime: number) {
        this.m_n30fpsDt += deltaTime;
        IM_InputMod.update(deltaTime);
        this.m_b30FpsCanUpdate = this.m_n30fpsDt >= n30FpsCheckDt;
        if (this.m_b30FpsCanUpdate) {
            // network event
            // event
        }
        CGPUM_UpdateMod.updateEveryFrame(deltaTime);
        if (this.m_b30FpsCanUpdate) {
            // 
            // 每帧更新， 30帧更新， 15帧更新  // 区分不重要的刷新频率 ， UI也可以做这样的刷新(具体得看逻辑)
            CGPUM_UpdateMod.update(this.m_n30fpsDt);
            this.m_nUpdateSec += this.m_n30fpsDt;
            if (this.m_nUpdateSec >= 1) {
                CGPUM_UpdateMod.updateSecond(this.m_nUpdateSec);
                this.m_nUpdateSec = 0;
            }
        } else {

        }
    }

    static lateUpdate(deltaTime: number) {
        IM_InputMod.lateUpdate(deltaTime);
        CGPUM_UpdateMod.lateUpdateEveryFrame(deltaTime);
        if (this.m_b30FpsCanUpdate) {
            CGPUM_UpdateMod.lateUpdate(this.m_n30fpsDt);
            this.m_n30fpsDt = 0;
        }
    }
}