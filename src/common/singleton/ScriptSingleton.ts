export function ScriptSingleton<T>() {
    class ScriptSingletonT extends Laya.Script {
        private static _inst: ScriptSingletonT = null;
        onAwake(): void {
            ScriptSingletonT._inst = this;
        }
        public static getInstance(): T {
            if(ScriptSingletonT._inst == null) {
                let rootName = "Boot";
                let stage = Laya.stage;
                let root = stage.getChildByName(rootName);
                if (root == null) {
                    root = stage.addChild(new Laya.Sprite());
                    root.name = rootName;
                }
                ScriptSingletonT._inst = new this();
                let nodeName = ScriptSingletonT._inst.constructor.name;
                let node = root.addChild(new Laya.Sprite());
                node.name = nodeName;
                node.addComponentInstance(ScriptSingletonT._inst);
            }
            return ScriptSingletonT._inst as T;
        }
    }
    return ScriptSingletonT;
}

