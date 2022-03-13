var c=Object.defineProperty;var v=(l,s,i)=>s in l?c(l,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):l[s]=i;var f=(l,s,i)=>(v(l,typeof s!="symbol"?s+"":s,i),i);(function(l,s){typeof exports=="object"&&typeof module!="undefined"?module.exports=s():typeof define=="function"&&define.amd?define(s):(l=typeof globalThis!="undefined"?globalThis:l||self,l["tiny-store"]=s())})(this,function(){"use strict";const l={set:function(r){if(r.name=r.name||!1,r.value=r.value||"",r.exdays=r.exdays||!1,r.path=r.path||"/",r.domain=r.domain||!1,r.name){var t=r.domain?"domain="+r.domain+";":"",n="path="+r.path,e="";if(r.exdays){var a=new Date;a.setTime(a.getTime()+r.exdays*24*60*60*1e3),e="expires="+a.toUTCString()}return document.cookie=r.name+"="+r.value+";"+t+n+";"+e,!0}return!1},get:function(r){for(var t=r+"=",n=document.cookie.split(";"),e=null,a=null,u=0;u<n.length;u++){for(e=n[u];e.charAt(0)===" ";)e=e.substring(1);if(e.indexOf(t)===0)return a=e.substring(t.length,e.length),a.split("&").length>1?s(a):a}return!1},del:function(r){r=r||!1;var t=l.set({name:r,value:null,exdays:-1,path:null,domain:null});return t}};function s(r){for(var t=r.split("&"),n={},e=null,a=0;a<t.length;a++)e=t[a].split("="),e.length>1&&(n[e[0]]=e[1]);return n}const i=l;class o{constructor(t){f(this,"_prefix","");f(this,"eventsCenter",{});this._prefix=t||"tinyStorage_"}setItem(t,n,e){if(localStorage){const u={data:n};if(e){var a=new Date;a.setTime(a.getTime()+e*24*60*60*1e3),u.expires=a.toUTCString()}localStorage.setItem(this._prefix+t,JSON.stringify(u))}else{const u={data:n};i.set({name:t,value:JSON.stringify(u),exdays:e,path:"/"})}this._emit(t,n)}_emit(t,n){const e=this.eventsCenter[t];e?e.forEach(a=>{a(n)}):console.log("unexcepted events listener")}on(t,n){if(this.eventsCenter[t]){const e=this.eventsCenter[t];e.push(n),this.eventsCenter[t]=e}else{const e=[];e.push(n),this.eventsCenter[t]=e}}getItem(t){if(localStorage){let n=localStorage.getItem(this._prefix+t);if(n){const e=JSON.parse(n);return e.expires&&new Date(e.expires)<new Date?(this.removeItem(t),null):e.data}else return null}return null}removeItem(t){localStorage?localStorage.removeItem(this._prefix+t):i.del(t)}clearAll(){localStorage.clear()}}return o});
