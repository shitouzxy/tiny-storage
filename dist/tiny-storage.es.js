var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const cookie = {
  set: function(options) {
    options.name = options.name || false;
    options.value = options.value || "";
    options.exdays = options.exdays || false;
    options.path = options.path || "/";
    options.domain = options.domain || false;
    if (options.name) {
      var domain = options.domain ? "domain=" + options.domain + ";" : "";
      var path = "path=" + options.path;
      var expires = "";
      if (options.exdays) {
        var d = new Date();
        d.setTime(d.getTime() + options.exdays * 24 * 60 * 60 * 1e3);
        expires = "expires=" + d.toUTCString();
      }
      document.cookie = options.name + "=" + options.value + ";" + domain + path + ";" + expires;
      return true;
    }
    return false;
  },
  get: function(cname) {
    var name = cname + "=";
    var arrCookie = document.cookie.split(";");
    var strCookie = null;
    var string = null;
    for (var i = 0; i < arrCookie.length; i++) {
      strCookie = arrCookie[i];
      while (strCookie.charAt(0) === " ") {
        strCookie = strCookie.substring(1);
      }
      if (strCookie.indexOf(name) === 0) {
        string = strCookie.substring(name.length, strCookie.length);
        if (string.split("&").length > 1) {
          return _stringToObject(string);
        }
        return string;
      }
    }
    return false;
  },
  del: function(name) {
    name = name || false;
    var isDeleted = cookie.set({
      name,
      value: null,
      exdays: -1,
      path: null,
      domain: null
    });
    return isDeleted;
  }
};
function _stringToObject(string) {
  var strArray = string.split("&");
  var stringObj = {};
  var propValArray = null;
  for (var i = 0; i < strArray.length; i++) {
    propValArray = strArray[i].split("=");
    if (propValArray.length > 1) {
      stringObj[propValArray[0]] = propValArray[1];
    }
  }
  return stringObj;
}
const jscookie = cookie;
class Storage {
  constructor(prefix) {
    __publicField(this, "_prefix", "");
    __publicField(this, "eventsCenter", {});
    this._prefix = prefix || "tinyStorage_";
  }
  setItem(key, data, exdays) {
    if (localStorage) {
      const storageData = { data };
      if (exdays) {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
        storageData.expires = d.toUTCString();
      }
      localStorage.setItem(this._prefix + key, JSON.stringify(storageData));
    } else {
      const storageData = { data };
      jscookie.set({
        name: key,
        value: JSON.stringify(storageData),
        exdays,
        path: "/"
      });
    }
    this._emit(key, data);
  }
  _emit(key, data) {
    const events = this.eventsCenter[key];
    if (events) {
      events.forEach((callback) => {
        callback(data);
      });
    } else {
      console.log("unexcepted events listener");
    }
  }
  on(key, callback) {
    if (this.eventsCenter[key]) {
      const events = this.eventsCenter[key];
      events.push(callback);
      this.eventsCenter[key] = events;
    } else {
      const events = [];
      events.push(callback);
      this.eventsCenter[key] = events;
    }
  }
  getItem(key) {
    if (localStorage) {
      let data = localStorage.getItem(this._prefix + key);
      if (data) {
        const result = JSON.parse(data);
        if (result.expires) {
          const expires = new Date(result.expires);
          if (expires < new Date()) {
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
  removeItem(key) {
    if (localStorage) {
      localStorage.removeItem(this._prefix + key);
    } else {
      jscookie.del(key);
    }
  }
  clearAll() {
    localStorage.clear();
  }
}
export { Storage as default };
