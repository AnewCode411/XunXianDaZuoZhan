
export class Singleton {
    constructor() {}
    static getInstance(...param:any[]): any
    {
        let Class: any = this;
        if (Class.m_instance == null) Class.m_instance = new Class(...param);
        return Class.m_instance;
    }
}
