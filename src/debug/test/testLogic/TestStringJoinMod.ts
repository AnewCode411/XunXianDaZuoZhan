import { Print } from "../../../common/log/Print"

export class TestStringJionMod {
    static init() {
        //const a = 'a';
        //const b = 'b';
        const str1 = (a: string, b: string) => a + b;
        const str2 = (a: string, b: string) => a.concat(b);
        const str3 = (a: string, b: string) => [a, b].join();
        const str4 = (a: string, b: string) => `${a}${b}`;
        let timeOut = function (times: number, name: string, func: any) {
            //console.time(name);
            let start = Date.now();
            let i = 0;
            let str = '';
            while (i < times) {
              func(str, i.toString());
              i++;
            }
            Print.print(`${name} 耗时：${Date.now() - start}ms`);
            //console.timeEnd(name);
        }

        const fn = (times: number) => {
            Print.print(`------- ${times} -------`);
            timeOut(times, 'string + 连接', str1);
            timeOut(times, 'string concat 方法', str2);
            timeOut(times, 'array join 连接', str3);
            timeOut(times, '模板字符串', str4);
        }
          
        //fn(1);
        //fn(100);
        //fn(10000);
        fn(1000000);
        fn(100000000);
    }
}
