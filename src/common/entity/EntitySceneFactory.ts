import { IdGenerater } from "../IdGenerater/IdGenerater";
import { Entity } from "./Entity";
import { Scene } from "./Scene";

export class EntitySceneFactory {
    static createScene(id: number, instanceId: number, zone: number, sceneType: number, name: string, parent: Entity = null)
    {
        let scene = new Scene(instanceId, zone, sceneType, name, parent, id);
        return scene;
    }

    static createSceneZSNP(zone: number, sceneType: number, name: string, parent: Entity = null)
    {
        let instanceId = IdGenerater.getInstance().generateInstanceId();
        let scene = new Scene(instanceId, zone, sceneType, name, parent, zone);
        return scene;
    }
}