
export class StringUtil {

    static formatString(str: string, ...args: any[]): string {
        return str.replace(/\{(\d+)\}/g, (match, index) => {
            return typeof args[index] !== "undefined" ? args[index] : match;
        });
    }

    static isNullOrEmpty(str: string): boolean {
        return str === null || str.length == 0;
    }
}