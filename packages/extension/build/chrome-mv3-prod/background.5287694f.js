(()=>{function e(e){return e&&e.__esModule?e.default:e}var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},a=s.parcelRequiree48a;null==a&&((a=function(e){if(e in r)return r[e].exports;if(e in t){var s=t[e];delete t[e];var a={id:e,exports:{}};return r[e]=a,s.call(a.exports,a,a.exports),a.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,s){t[e]=s},s.parcelRequiree48a=a),a.register("93kaT",(function(e,s){var r;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=function(e){"use strict";if(!globalThis.chrome?.runtime?.id)throw new Error("This script should only be loaded in a browser extension.");if(void 0===globalThis.browser||Object.getPrototypeOf(globalThis.browser)!==Object.prototype){const s="The message port closed before a response was received.",r=e=>{const r={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(0===Object.keys(r).length)throw new Error("api-metadata.json has not been included in browser-polyfill");class t extends WeakMap{constructor(e,s){super(s),this.createItem=e}get(e){return this.has(e)||this.set(e,this.createItem(e)),super.get(e)}}const a=(s,r)=>(...t)=>{e.runtime.lastError?s.reject(new Error(e.runtime.lastError.message)):r.singleCallbackArg||t.length<=1&&!1!==r.singleCallbackArg?s.resolve(t[0]):s.resolve(t)},n=e=>1==e?"argument":"arguments",g=(e,s,r)=>new Proxy(s,{apply:(s,t,a)=>r.call(t,e,...a)});let i=Function.call.bind(Object.prototype.hasOwnProperty);const m=(e,s={},r={})=>{let t=Object.create(null),o={has:(s,r)=>r in e||r in t,get(o,A,l){if(A in t)return t[A];if(!(A in e))return;let c=e[A];if("function"==typeof c)if("function"==typeof s[A])c=g(e,e[A],s[A]);else if(i(r,A)){let s=((e,s)=>function(r,...t){if(t.length<s.minArgs)throw new Error(`Expected at least ${s.minArgs} ${n(s.minArgs)} for ${e}(), got ${t.length}`);if(t.length>s.maxArgs)throw new Error(`Expected at most ${s.maxArgs} ${n(s.maxArgs)} for ${e}(), got ${t.length}`);return new Promise(((n,g)=>{if(s.fallbackToNoCallback)try{r[e](...t,a({resolve:n,reject:g},s))}catch(a){console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,a),r[e](...t),s.fallbackToNoCallback=!1,s.noCallback=!0,n()}else s.noCallback?(r[e](...t),n()):r[e](...t,a({resolve:n,reject:g},s))}))})(A,r[A]);c=g(e,e[A],s)}else c=c.bind(e);else if("object"==typeof c&&null!==c&&(i(s,A)||i(r,A)))c=m(c,s[A],r[A]);else{if(!i(r,"*"))return Object.defineProperty(t,A,{configurable:!0,enumerable:!0,get:()=>e[A],set(s){e[A]=s}}),c;c=m(c,s[A],r["*"])}return t[A]=c,c},set:(s,r,a,n)=>(r in t?t[r]=a:e[r]=a,!0),defineProperty:(e,s,r)=>Reflect.defineProperty(t,s,r),deleteProperty:(e,s)=>Reflect.deleteProperty(t,s)},A=Object.create(e);return new Proxy(A,o)},o=e=>({addListener(s,r,...t){s.addListener(e.get(r),...t)},hasListener:(s,r)=>s.hasListener(e.get(r)),removeListener(s,r){s.removeListener(e.get(r))}}),A=new t((e=>"function"!=typeof e?e:function(s){const r=m(s,{},{getContent:{minArgs:0,maxArgs:0}});e(r)})),l=new t((e=>"function"!=typeof e?e:function(s,r,t){let a,n,g=!1,i=new Promise((e=>{a=function(s){g=!0,e(s)}}));try{n=e(s,r,a)}catch(e){n=Promise.reject(e)}const m=!0!==n&&(o=n)&&"object"==typeof o&&"function"==typeof o.then;var o;if(!0!==n&&!m&&!g)return!1;const A=e=>{e.then((e=>{t(e)}),(e=>{let s;s=e&&(e instanceof Error||"string"==typeof e.message)?e.message:"An unexpected error occurred",t({__mozWebExtensionPolyfillReject__:!0,message:s})})).catch((e=>{console.error("Failed to send onMessage rejected reply",e)}))};return A(m?n:i),!0})),c=({reject:r,resolve:t},a)=>{e.runtime.lastError?e.runtime.lastError.message===s?t():r(new Error(e.runtime.lastError.message)):a&&a.__mozWebExtensionPolyfillReject__?r(new Error(a.message)):t(a)},x=(e,s,r,...t)=>{if(t.length<s.minArgs)throw new Error(`Expected at least ${s.minArgs} ${n(s.minArgs)} for ${e}(), got ${t.length}`);if(t.length>s.maxArgs)throw new Error(`Expected at most ${s.maxArgs} ${n(s.maxArgs)} for ${e}(), got ${t.length}`);return new Promise(((e,s)=>{const a=c.bind(null,{resolve:e,reject:s});t.push(a),r.sendMessage(...t)}))},h={devtools:{network:{onRequestFinished:o(A)}},runtime:{onMessage:o(l),onMessageExternal:o(l),sendMessage:x.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:x.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},d={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return r.privacy={network:{"*":d},services:{"*":d},websites:{"*":d}},m(e,h,r)};e.exports=r(chrome)}else e.exports=globalThis.browser},"function"==typeof define&&define.amd?define("webextension-polyfill",["module"],r):r(e)}));var n=a("93kaT");var g=typeof window<"u";const i={user:null,active:null,proxies:[]};let m;var o;(o=m||(m={})).CONNECT="CONNECT",o.DISCONNECT="DISCONNECT",o.FETCH="FETCH";const A=new class{#e;#s;#r=g?window.localStorage:null;#t;#a=!1;#n=new Map;#g;#i=!1;hasExtensionAPI=!1;constructor({area:s="sync",secretKeyList:r=[],allSecret:t=!1,unlimited:a=!1}={}){this.updateSecret(r),this.#t=s,this.#a=a,this.#i=t,e(n).storage&&(this.#e=e(n).storage,this.#s=this.#e[this.#t],this.hasExtensionAPI=!0)}updateSecret(e){this.#g=new Set(e)}sync=async e=>{if(this.#g.has(e)||this.#i||!this.hasExtensionAPI)return!1;let s=this.#r?.getItem(e),r=(await this.#s.get(e))[e];return this.#r?.setItem(e,r),r!==s};get=async e=>{if(this.hasExtensionAPI){let s=await this.#s.get(e);return this.#m(s[e])}{let s=this.#r?.getItem(e);return this.#m(s)}};set=async(e,s)=>{let r=JSON.stringify(s);if(!this.#g.has(e)&&!this.#i&&this.#r?.setItem(e,r),!this.hasExtensionAPI)return;let t=this.#a?"":await(async(e,s,r,t)=>{let a="";e:if("managed"!==e){if(!chrome?.storage?.[e].getBytesInUse)break e;let n=s[e],g=n.QUOTA_BYTES||102400,i=function(e){let s=e.length;for(var r=e.length-1;r>=0;r--){let t=e.charCodeAt(r);t>127&&t<=2047?s++:t>2047&&t<=65535&&(s+=2),t>=56320&&t<=57343&&r--}return s}(t),[m,o]=await Promise.all([n.getBytesInUse(),n.getBytesInUse(r)]),A=m+i-o,l=A/g;if(l>.8&&(a=`Storage quota is almost full. ${A}/${g}, ${100*l}%`),l>1)throw new Error("ABORTED - New value would exceed storage quota.")}return a})(this.#t,this.#e,e,r);return await this.#s.set({[e]:r}),t};remove=async e=>{!this.#g.has(e)&&!this.#i&&this.#r?.removeItem(e),this.hasExtensionAPI&&await this.#s.remove(e)};watch=e=>!!this.isWatchingSupported()&&(this.#o(e),!0);isWatchingSupported=()=>this.hasExtensionAPI;#o=e=>{Object.entries(e).forEach((([s,r])=>{let t=this.#n.get(s)?.callbackSet||new Set;if(t.add(r),t.size>1)return;let a=(s,r)=>{if(r!==this.#t)return;let t=new Set(Object.keys(e)),a=Object.keys(s).filter((e=>t.has(e)));if(0!==a.length)for(let e of a)this.#n.get(e)?.callbackSet?.forEach((t=>{t({newValue:this.#m(s[e].newValue),oldValue:this.#m(s[e].oldValue)},r)}))};this.#e.onChanged.addListener(a),this.#n.set(s,{callbackSet:t,listener:a})}))};unwatch=e=>!!this.isWatchingSupported()&&(this.#A(e),!0);#A(e){Object.entries(e).filter((([e])=>this.#n.has(e))).forEach((([e,s])=>{let r=this.#n.get(e);r.callbackSet.delete(s),0===r.callbackSet.size&&(this.#n.delete(e),this.#e.onChanged.removeListener(r.listener))}))}unwatchAll=()=>this.#l();#l(){this.#n.forEach((({listener:e})=>this.#e.onChanged.removeListener(e))),this.#n.clear()}#m(e){try{if(void 0!==e)return JSON.parse(e)}catch(e){console.error(e)}}}({unlimited:!0});!async function(){await A.get("")||(console.log("Init Storage"),await A.set("",i))}(),chrome.webRequest.onAuthRequired.addListener(((e,s)=>{A.get("").then((e=>{if(e){const[r,t]=e.active.auth.split(":");console.log([r,t]),s({authCredentials:{username:r,password:t}})}}))}),{urls:["<all_urls>"]},["asyncBlocking"])})();