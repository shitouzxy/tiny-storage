
type storageData = {
    data: any,
    expires?: number
}

export default class Storage {
    protected _prefix: string = '';
    constructor(prefix?: string) {
        this._prefix = prefix || '';
    }
    /**
     * @description 设置缓存
     */
    setItem(key:string, data: any, expired?: number) {
        // To Do 增加过期时间设置 - 存储方法跟cookie 原生设置方法一致
        if(localStorage) {
            const storageData:storageData = { data };
            localStorage.setItem(this._prefix + key, JSON.stringify(storageData));
            // this.emit(key, data);
        }
    }
    /**
     *
     * @param key {string}
     * @param data {any}
     * @returns {void}
     */
    emit(key:string, data: any) {
    }

    on(key:string, callback: Function) {

    }
    /**
     * @description 获取缓存
     */
    getItem(key:string) {
        if(localStorage) {
            let data:string|null = localStorage.getItem(this._prefix + key);
            if(data) {
                const result: storageData = JSON.parse(data);
                return result.data;
            } else {
                return null;
            }
            // to do Check 过期

        }
        return null;
    }
    /**
     * @description 删除缓存
     */
    removeItem(key:string) {
        if(localStorage) {
            localStorage.removeItem(this._prefix + key);
        }
    }

    /**
     * @description 清空缓存
     */
    clearAll() {
        localStorage.clear()
    }
}