import { IdGenerater } from "../IdGenerater/IdGenerater";
import { PoolName } from "../const/PoolName";
import { Print } from "../log/Print";
import { DisposeObject } from "../object/DisposeObject";
import { PoolUtil } from "../utils/PoolUtil";
import { StringUtil } from "../utils/StringUtil";
import { Root } from "./Root";

const EntityStatus = {
    None: 0,
    IsFromPool: 1,
    IsRegister: 1 << 1,
    IsComponent: 1 << 2,
    IsCreated: 1 << 3,
    IsNew: 1 << 4,
}

export class Entity extends DisposeObject {

    // 实例化 id
    protected m_instanceId: number = 0;
    get instanceId(): number { return this.m_instanceId; }
    set instanceId(value: number) { this.m_instanceId = value; }

    // 实体 id
    protected m_id: number = 0;
    get id(): number { return this.m_id; }
    set id(value: number) { this.m_id = value; }

    private m_status: number = EntityStatus.None;

    protected m_parent: Entity;
    protected m_domain: Entity;
    private m_children: any;    // <id, Entity>
    private m_childrenCount: number = 0;

    private m_components: any;   // <class any, Entity>
    private m_componentsCount: number = 0;

    // 是否从池中实例化过
    get isFromPool(): boolean { return (this.m_status & EntityStatus.IsFromPool) === EntityStatus.IsFromPool;}
    set isFromPool(value: boolean) {
        if (value) {
            this.m_status |= EntityStatus.IsFromPool;
        }
        else {
            this.m_status &= ~EntityStatus.IsFromPool;
        }
    }

    // 是否注册过
    get isRegister(): boolean { return (this.m_status & EntityStatus.IsRegister) === EntityStatus.IsRegister;}
    set isRegister(value: boolean) {
        if (this.isRegister == value) {
            return;
        }
        if (value) {
            this.m_status |= EntityStatus.IsRegister;
            Root.getInstance().add(this);
        }
        else {
            this.m_status &= ~EntityStatus.IsRegister;
            Root.getInstance().Remove(this.instanceId);
        }
    }

    // 是否组件
    get isComponent(): boolean { return (this.m_status & EntityStatus.IsComponent) === EntityStatus.IsComponent;}
    set isComponent(value: boolean) {
        if (value) {
            this.m_status |= EntityStatus.IsComponent;
        }
        else {
            this.m_status &= ~EntityStatus.IsComponent;
        }
    }

    // 是否创建过
    get isCreated(): boolean { return (this.m_status & EntityStatus.IsCreated) === EntityStatus.IsCreated;}
    set isCreated(value: boolean) {
        if (value) {
            this.m_status |= EntityStatus.IsCreated;
        }
        else {
            this.m_status &= ~EntityStatus.IsCreated;
        }
    }

    // 是否新建
    get isNew(): boolean { return (this.m_status & EntityStatus.IsNew) === EntityStatus.IsNew;}
    set isNew(value: boolean) {
        if (value) {
            this.m_status |= EntityStatus.IsNew;
        }
        else {
            this.m_status &= ~EntityStatus.IsNew;
        }
    }

    // 是否销毁
    isDisposed(): boolean { return this.m_instanceId == 0; }

    // 父实体  可以改变 Parent， 但是不能为null
    get Parent(): Entity { return this.m_parent; }
    private set Parent(value: Entity) {
        if (value == null) {
            Print.printError(StringUtil.formatString("cant set parent null: {0}", this.constructor.name));
            return;
        }
        if (value == this){
            Print.printError(StringUtil.formatString("cant set parent self: {0}", this.constructor.name));
            return;
        }
        // 严格限制parent必须要有domain,也就是说parent必须在数据树上面
        if (value.Domain == null)
        {
            Print.printError(StringUtil.formatString("cant set parent because parent domain is null: {0} {1}", this.constructor.name, value.constructor.name));
            return;
        }
        if (this.m_parent != null) // 之前有parent
        {
            // parent相同，不设置
            if (this.m_parent == value)
            {
                Print.printError(StringUtil.formatString("重复设置 Parent: {0}  parent: {1}", this.constructor.name, this.m_parent.constructor.name));
                return;
            }
            this.m_parent.removeFromChildren(this);
        }
        this.m_parent = value;
        this.isComponent = false;
        this.m_parent.addToChildren(this);
        this.Domain = this.m_parent.m_domain;
    }

    // 该方法只能在AddComponent中调用，其他人不允许调用
    private set componentParent(value: Entity) {
        if (value == null) {
            Print.printError(StringUtil.formatString("cant set parent null: {0}", this.constructor.name));
            return;
        }
        if (value == this){
            Print.printError(StringUtil.formatString("cant set parent self: {0}", this.constructor.name));
            return;
        }
        // 严格限制parent必须要有domain,也就是说parent必须在数据树上面
        if (value.Domain == null)
        {
            Print.printError(StringUtil.formatString("cant set parent because parent domain is null: {0} {1}", this.constructor.name, value.constructor.name));
            return;
        }
        if (this.m_parent != null) // 之前有parent
        {
            // parent相同，不设置
            if (this.m_parent == value)
            {
                Print.printError(StringUtil.formatString("重复设置 Parent: {0}  parent: {1}", this.constructor.name, this.m_parent.constructor.name));
                return;
            }
            this.m_parent.removeFromComponents(this);
        }
        this.m_parent = value;
        this.isComponent = true;
        this.m_parent.addToComponents(this);
        this.Domain = this.m_parent.m_domain;
    }

    // 域
    get Domain(): Entity { return this.m_domain; }
    set Domain(value: Entity) { 
        if (value == null) {
            Print.printError(StringUtil.formatString("domain cant set null: {0}", this.constructor.name));
            return;
        }
        if (this.m_domain == value) {
            return;
        }
        let preDomain = this.m_domain;
        this.m_domain = value;
        if (preDomain == null) {
            this.m_instanceId = IdGenerater.getInstance().generateInstanceId();
            this.isRegister = true;
        }
        // 递归设置孩子的Domain
        if (this.m_children != null) {
            for (let key in this.m_children)
            {
                let entity = this.m_children[key];
                entity.Domain = this.m_domain;
            }
        }
        if (this.m_components != null) {
            for (let key in this.m_components)
            {
                let component = this.m_components[key];
                component.Domain = this.m_domain;
            }
        }
    }

    removeFromChildren(entity: Entity) {
        if (this.m_children == null) {
            return;
        }
        if (this.m_children[entity.id] != null) {
            this.m_children[entity.id] = null;
            this.m_childrenCount--;
        }
        if (this.m_childrenCount == 0)
        {
            PoolUtil.recover(PoolName.NotDataAny, this.m_children);
            this.m_children = null;
        }
    }

    addToChildren(entity: Entity) {
        if (this.m_children == null) {
            this.m_children = PoolUtil.getItemByCreateFun(PoolName.NotDataAny, function(){ return {}; });
        }
        if (this.m_children[entity.id] == null) {
            this.m_children[entity.id] = entity;
            this.m_childrenCount++;
        }
    }

    removeFromComponents(entity: Entity) {
        if (this.m_components == null) {
            return;
        }
        let name = entity.constructor.name;
        if (this.m_components[name] != null) {
            this.m_components[name] = null;
            this.m_componentsCount--;
        }
        if (this.m_componentsCount == 0)
        {
            PoolUtil.recover(PoolName.NotDataAny, this.m_components);
            this.m_components = null;
        }
    }

    addToComponents(entity: Entity) {
        if (this.m_components == null) {
            this.m_components = PoolUtil.getItemByCreateFun(PoolName.NotDataAny, function(){ return {}; });
        }
        let name = entity.constructor.name;
        if (this.m_components[name] == null) {
            this.m_components[name] = entity;
            this.m_componentsCount++;
        }
    }

    dispose(): void {
        if (this.isDisposed) {
            return;
        }
        this.isRegister = false;
        this.instanceId = 0;
        // 清理Children
        if (this.m_children != null) {
            for (let key in this.m_children)
            {
                let child = this.m_children[key];
                if (child != null && child instanceof Entity) {
                    child.dispose();
                    this.m_children[key] = null;
                }
            }
            PoolUtil.recover(PoolName.NotDataAny, this.m_children);
            this.m_children = null;
        }
        // 清理Component
        if (this.m_components != null) {
            for (let key in this.m_components)
            {
                let child = this.m_components[key];
                if (child != null && child instanceof Entity) {
                    child.dispose();
                    this.m_components[key] = null;
                }
            }
            PoolUtil.recover(PoolName.NotDataAny, this.m_components);
            this.m_components = null;
        }
        this.m_domain = null;
        if (this.m_parent != null && !this.m_parent.isDisposed) {
            if (this.isComponent) {
                this.m_parent.removeComponent(this);
            }
            else {
                this.m_parent.removeFromChildren(this);
            }
        }
        this.m_parent = null;
        super.dispose();
        if (this.isFromPool)
        {
            PoolUtil.recover(this.constructor.name, this);
        }
        this.m_status = EntityStatus.None;
    }

    removeComponent(typeName: string) : void;
    removeComponent(component: Entity) : void;
    removeComponent(value: string | Entity) {
        if (this.isDisposed){
            return;
        }
        if (this.m_components == null) {
            return;
        }
        let typeName;
        let component;
        if (typeof value === "string") {
            typeName = value;
        } else {
            component = value as Entity;
            typeName = value.constructor.name;
        }
        let c = this.getComponent(typeName);
        if (c == null) {
            return;
        }
        if (component != null && (c.instanceId != component.instanceId)) {
            return;
        }
        this.removeFromComponents(c);
        c.dispose();
    }

    getComponent(typeName: string): Entity
    {
        if (this.m_components == null) {
            return null;
        }
        let component = this.m_components[typeName];
        if (component == null) {
            return null;
        }
        return component;
    }

    getChild<K extends Entity>(id: number): K
    {
        if (this.m_children == null) {
            return null;
        }
        return this.m_children[id] as K;
    }

    removeChild(id: number) {
        if (this.m_children == null) {
            return;
        }
        let child = this.m_children[id];
        if (child == null) { return; }
        this.m_children[id] = null;
        this.m_childrenCount--;
        child.Dispose();
    }

    create<T>(typeName: string, cls: new () => T, isFromPool: boolean) : T
    {
        let component;
        if (isFromPool) {
            component = PoolUtil.getItemByClass(typeName, cls) as Entity;
        }
        else {
            component = new cls() as Entity;
        }
        component.isFromPool = isFromPool;
        component.isCreated = true;
        component.isNew = true;
        component.id = 0;
        return <T>component;
    }

    addComponent(component: Entity): Entity
    {
        let typeName = component.constructor.name;
        if (this.m_components != null && this.m_components[typeName] != null) {
            Print.printError(StringUtil.formatString("entity already has component: {0}", typeName));
            return null;
        }
        component.componentParent = this;
        return component;
    }

    addComponentC<T extends Entity>(typeName: string, cls: new () => T, isFromPool: boolean = false): T
    {
        if (this.m_components != null && this.m_components[typeName] != null) {
            Print.printError(StringUtil.formatString("entity already has component: {0}", typeName));
            return null;
        }
        let component = this.create(typeName, cls, isFromPool);
        component.id = this.id;
        component.componentParent = this;
        return component;
    }
}