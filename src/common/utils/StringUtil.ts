
export class StringUtil {

    static formatString(str: string, ...args: any[]): string {
        return str.replace(/\{(\d+)\}/g, (match, index) => {
            return typeof args[index] !== "undefined" ? args[index] : match;
        });
    }

    static isNullOrEmpty(str: string): boolean {
        return str === null || str.length == 0;
    }

    static append(str: string, ...args: any[]): string {
        if (args.length <= 0) { return str;}
        for (let i = 0; i < args.length; i++) {
            str += args[i];
        }
        return str;
    }
}