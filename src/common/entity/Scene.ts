const { regClass, property } = Laya;
import { Print } from "../log/Print";
import { StringUtil } from "../utils/StringUtil";
import { Entity } from "./Entity";
import { SceneType } from "../const/SceneType";

@regClass()
export class Scene extends Entity {
    private m_zone: number;
    get Zone(): number { return this.m_zone; }

    private m_sceneType: number;
    get SceneType(): number { return this.m_sceneType; }

    private m_name: string;
    get Name(): string { return this.m_name; }

    
    constructor (instanceId: number, zone: number, sceneType: number, name: string, parent: Entity, id?: number) {
        super();
        this.m_id = instanceId;
        if (id != null) { this.m_id = id; }
        this.m_instanceId = instanceId;
        this.m_zone = zone;
        this.m_sceneType = sceneType;
        this.m_name = name;
        this.isCreated = true;
        this.isNew = true;
        this.Parent = parent;
        this.Domain = this;
        this.isRegister = true;
        Print.print(StringUtil.formatString("Scene create: {0} {1} {2} {3} {4}", this.m_sceneType, this.m_name, this.m_id, this.m_instanceId, this.m_zone));
    }

    dispose(): void {
        super.dispose();
    }

    get Domain(): Entity { return this.m_domain; }
    set Domain(value: Entity) { this.m_domain = value; }

    get Parent(): Entity { return this.m_parent; }
    set Parent(value: Entity) {
        if (value == null) { return; }
        this.m_parent = value; 
        this.m_parent.addToChildren(this);
    }
    
    protected get ViewName(): string {
        return StringUtil.formatString("{0} ({1})", this.constructor.name, this.SceneType);
    }
}