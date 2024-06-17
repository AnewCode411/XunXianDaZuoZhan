const { regClass, property } = Laya;
import { Singleton } from "./../singleton/Singleton"

@regClass()
export class LoaderMod extends Singleton {
    VERSION: string = "version";
    PATCH: string = "patch";
    EXTRA: string = "extra";
    USERDATA: string = "userdata";
    USEROTHER: string = "userother";
    patchDataPath: string;
    extraDataPath: string;
    userDataPath: string;
    userOtherPath: string;
    init()
    {

    }
}