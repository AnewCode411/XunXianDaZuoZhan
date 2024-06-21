import { StringUtil } from "../utils/StringUtil";

export class PlayerStoreMod {
    private static _playerStoreJson: any = null;
    private static _playerStoreKey: string = null;
    private static _bNeedSave: boolean = false;
    static init() {
        this._load();
    }

    private static _load() {
        if (this._playerStoreJson == null)
        {
            this._playerStoreJson = Laya.LocalStorage.getJSON(this._playerStoreKey);
            if (this._playerStoreJson == null)
            {
                this._playerStoreJson = {};
            }
            this._bNeedSave = false;
        }
    }

    private static _getKey(key: string, account?: number): string {
        if (account == null) return key;
        return StringUtil.formatString("{0}_{1}", account, key);
    }

    static save() {
        if (!this._bNeedSave) return;
        if (this._playerStoreJson != null)
        {
            Laya.LocalStorage.setJSON(this._playerStoreKey, this._playerStoreJson);
        }
        this._bNeedSave = false;
    }
    
    static setNumber(key: string, value: number, account?: number) {
        this._playerStoreJson[this._getKey(key, account)] = value;
        this._bNeedSave = true;
    }

    static getNumber(key: string, account?: number): number | null {
        return this._playerStoreJson[this._getKey(key, account)];
    }

    static getNumberDefault(key: string, defv: number, account?: number): number {
        let ret = this.getNumber(key, account);
        if (ret == null) return defv;
        return ret;
    }

    static setString(key: string, value: string, account?: number) {
        this._playerStoreJson[this._getKey(key, account)] = value;
        this._bNeedSave = true;
    }

    static getString(key: string, account?: number): string | null {
        return this._playerStoreJson[this._getKey(key, account)];
    }

    static clearAll()
    {
        this._bNeedSave = true;
        this._playerStoreJson = {};
        this.save()
    }
}