
export class HotfixMod {
    static init() {
        // 热修复
    }

    // private static evalFn(str: string, ...params: any[])
    // {
    //     if (str == null && str.length == 0) return;
    //     let fn = eval('(' + str + ')'); // eval()
    //     if (typeof fn != 'function') return;
    //     if (fn != null) fn(params);
    // }

    private static functionFn(str: string, ...params: any[])
    {
        if (str == null && str.length == 0) return;
        let fn = new Function('return ' + str);
        if (fn != null) fn()(params);
    }

    // 功能很强大
    static hotfixFunction(str: string, ...params: any[])
    {
        // this.evalFn(str, params);
        this.functionFn(str, params);
    }

    // 不能使用局部变量， 比eval性能好
    static hotfixFunction2(str: string, ...params: any[])
    {
        this.functionFn(str, params);
    }
}