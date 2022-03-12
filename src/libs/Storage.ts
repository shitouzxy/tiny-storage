
// const jscookie = require('jscookie');
import * as jscookie from 'jscookie'

type storageData = {
    data: any,
    expires?: string
}

type eventsCenter = {
    [key:string]: Array<Function> | []
}

export default class Storage {
    protected _prefix: string = '';
    protected eventsCenter: eventsCenter = {};
    constructor(prefix?: string) {
        this._prefix = prefix || 'tinyStorage_';
    }
    /**
     * @description 设置缓存
     */
    setItem(key:string, data: any, exdays?: number) {
        if (localStorage) {
            const storageData:storageData = { data };
            if(exdays) {
                var d = new Date();
				d.setTime( d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                storageData.expires = d.toUTCString();
            }
            localStorage.setItem(this._prefix + key, JSON.stringify(storageData));
            // this.emit(key, data);
        } else {
            const storageData:storageData = { data };
            jscookie.set({
                name: key,
                value: JSON.stringify(storageData),
                exdays,
                path: '/' // 全局路径
            })
        }

        // 派发事件 - 当前存储值已更新
        this._emit(key, data);
    }
    /**
     *
     * @param key {string}
     * @param data {any}
     * @returns {void}
     */
    private _emit(key:string, data: any) {
        const events:Array<Function> = this.eventsCenter[key];
        if(events) {
            events.forEach((callback: Function) => {
                callback(data);
            })
        } else {
            console.log('unexcepted events listener');
        }
    }

    on(key:string, callback: Function) {
        //
        if(this.eventsCenter[key]) {
            const events:Array<Function> = this.eventsCenter[key];
            events.push(callback);
            this.eventsCenter[key] = events;
        } else {
            const events:Array<Function> = [];
            events.push(callback);
            this.eventsCenter[key] = events;
        }
    }
    /**
     * @description 获取缓存
     */
    getItem(key:string) {
        if(localStorage) {
            let data:string|null = localStorage.getItem(this._prefix + key);
            if(data) {
                const result: storageData = JSON.parse(data);
                // check expires
                if(result.expires) {
                    const expires = new Date(result.expires);
                    // 如果已经过期了， 那直接删除
                    if(expires < new Date()) {
                        this.removeItem(key);
                        return null;
                    } else {
                        return result.data;
                    }
                }
                return result.data;
            } else {
                return null;
            }
        }
        return null;
    }
    /**
     * @description 删除缓存
     */
    removeItem(key:string) {
        if(localStorage) {
            localStorage.removeItem(this._prefix + key);
        } else {
            jscookie.remove(key);
        }
    }

    /**
     * @description 清空缓存
     */
    clearAll() {
        localStorage.clear();
    }
}