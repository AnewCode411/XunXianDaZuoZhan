import { TestHotfixMod } from "./testLogic/TestHotfixMod";
import { TestLoaderMod } from "./testLogic/TestLoaderMod";
import { TestOtherMod } from "./testLogic/TestOtherMod";

export class TestMod {
    static init() {
        // TestLoaderMod.init();
        // TestHotfixMod.init();
        TestOtherMod.init();
    }
}