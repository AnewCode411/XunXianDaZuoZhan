import { SceneType } from "../const/SceneType";
import { Singleton } from "../singleton/Singleton";
import { Entity } from "./Entity";
import { EntitySceneFactory } from "./EntitySceneFactory";
import { Scene } from "./Scene";

// 管理场景
export class Root extends Singleton {
    //  管理实体
    private m_allEntities: Map<number, Entity> = new Map();
    private m_scene: Scene;
    protected init() {
        this.m_scene = EntitySceneFactory.createSceneZSNP(0, SceneType.Process, "Process");
    }

    add(entity: Entity)
    {
        this.m_allEntities.set(entity.instanceId, entity);
    }
    
    remove(instanceId: number)
    {
        this.m_allEntities.delete(instanceId);
    }

    get(instanceId: number): Entity
    {
        if (this.m_allEntities.has(instanceId)) { return this.m_allEntities.get(instanceId); }
        return null;
    }

    toString(): string {
        let noParent = new Set<string>();
        let typeCount = new Map<string, number>();
        let noDomain = new Set<string>();
        this.m_allEntities.forEach((entity, key) => {
            let typeName = entity.constructor.name;
            if (entity.Parent == null) {
                noParent.add(typeName);
            }
            if (entity.Domain == null) { 
                noDomain.add(typeName);
            }
            if (typeCount.has(typeName)) {
                typeCount.set(typeName, typeCount.get(typeName) + 1);
            } else {
                typeCount.set(typeName, 1);
            }
        })
        let str = "";
        str += "not set parent type: ";
        noParent.forEach(typeName => {
            str += `\t${typeName} `;
        });
        str += "not set domain type: ";
        noDomain.forEach(typeName => {
            str += `\t${typeName} `;
        });
        str += "Entity Count: ";
        typeCount.forEach((value, key) => {
            if (value > 1) {
                str += `\t${key} : ${value} `;
            }
        });
        return str;
    }

    dispose() {
        this.m_scene.dispose();
    }
}