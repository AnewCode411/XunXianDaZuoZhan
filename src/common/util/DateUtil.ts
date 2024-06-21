
export class DateUtil {
    /*
    timestamp: 13位时间戳 | new Date() | Date()
    console.log(dateFormat(1714528800000, 'YY-MM-DD HH:mm:ss'))
    format => YY：年，M：月，D：日，H：时，m：分钟，s：秒，SSS：毫秒
    */
    static dateFormat(M: string, Time: Date | null | string | number = null): string {
        let date: Date = Time ? new Date(Time) : new Date();
        let pattern: RegExp = /(Y{2,4}|M{1,2}|D{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|C{1,2}|W{1,2})/g;
        let tmp: any = (S: string | number) => (Number(S) < 10 ? "0" + S : S);
        let res: string = M.replace(pattern, ($0: string) => {
            switch ($0) {
                case "YY":
                    return date.getFullYear().toString().slice(-2);
                case "YYYY":
                    return date.getFullYear();
                case "M":
                    return date.getMonth() + 1;
                case "MM":
                    return tmp(date.getMonth() + 1);
                case "D":
                    return date.getDate();
                case "DD":
                    return tmp(date.getDate());
                case "W":
                    return date.getDay();
                case "WW":
                    return ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];
                case "H":
                    return date.getHours();
                case "HH":
                    return tmp(date.getHours());
                case "m":
                    return date.getMinutes();
                case "mm":
                    return tmp(date.getMinutes());
                case "s":
                    return date.getSeconds();
                case "ss":
                    return tmp(date.getSeconds());
                case "C":
                    return Math.trunc(date.getTime() / 1000);
                case "CC":
                    return date.getTime();
                default:
                    return $0;
            }
        });
        return res;
    };
}