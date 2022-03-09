var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Storage {
  constructor(prefix) {
    __publicField(this, "_prefix", "");
    this._prefix = prefix || "";
  }
  setItem(key, data, expired) {
    if (localStorage) {
      const storageData = { data };
      localStorage.setItem(this._prefix + key, JSON.stringify(storageData));
    }
  }
  emit(key, data) {
  }
  on(key, callback) {
  }
  getItem(key) {
    if (localStorage) {
      let data = localStorage.getItem(this._prefix + key);
      if (data) {
        const result = JSON.parse(data);
        return result.data;
      } else {
        return null;
      }
    }
    return null;
  }
  removeItem(key) {
    if (localStorage) {
      localStorage.removeItem(this._prefix + key);
    }
  }
  clearAll() {
    localStorage.clear();
  }
}
export { Storage as default };
