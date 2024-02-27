/*! For license information please see lib-router.51f36663.js.LICENSE.txt */
(globalThis.webpackChunkvideo_calls=globalThis.webpackChunkvideo_calls||[]).push([["118"],{55648:function(t,e,n){"use strict";n.r(e),n.d(e,{Action:function(){return r},createHashHistory:function(){return i},createPath:function(){return s},parsePath:function(){return f}});var r,a=n("16019");(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(r||(r={}));var u=function(t){return t},o="beforeunload";function i(t){void 0===t&&(t={});var e=t.window,n=void 0===e?document.defaultView:e,i=n.history;function h(){var t=f(n.location.hash.substr(1)),e=t.pathname,r=t.search,a=t.hash,o=i.state||{};return[o.idx,u({pathname:void 0===e?"/":e,search:void 0===r?"":r,hash:void 0===a?"":a,state:o.usr||null,key:o.key||"default"})]}var p=null;function v(){if(p)P.call(p),p=null;else{var t=r.Pop,e=h(),n=e[0],a=e[1];if(P.length){if(null!=n){var u=g-n;u&&(p={action:t,location:a,retry:function(){S(-1*u)}},S(u))}}else O(t)}}n.addEventListener("popstate",v),n.addEventListener("hashchange",function(){s(h()[1])!==s(y)&&v()});var d=r.Pop,m=h(),g=m[0],y=m[1],b=l(),P=l();null==g&&(g=0,i.replaceState((0,a.default)({},i.state,{idx:g}),""));function C(t){return function(){var t=document.querySelector("base"),e="";if(t&&t.getAttribute("href")){var r=n.location.href,a=r.indexOf("#");e=-1===a?r:r.slice(0,a)}return e}()+"#"+("string"==typeof t?t:s(t))}function x(t,e){return void 0===e&&(e=null),u((0,a.default)({pathname:y.pathname,hash:"",search:""},"string"==typeof t?f(t):t,{state:e,key:function(){return Math.random().toString(36).substr(2,8)}()}))}function E(t,e){return[{usr:t.state,key:t.key,idx:e},C(t)]}function k(t,e,n){return!P.length||(P.call({action:t,location:e,retry:n}),!1)}function O(t){d=t;var e=h();g=e[0],y=e[1],b.call({action:d,location:y})}function S(t){i.go(t)}return{get action(){return d},get location(){return y},createHref:C,push:function t(e,a){var u=r.Push,o=x(e,a);if(k(u,o,function(){t(e,a)})){var c=E(o,g+1),l=c[0],s=c[1];try{i.pushState(l,"",s)}catch(t){n.location.assign(s)}O(u)}},replace:function t(e,n){var a=r.Replace,u=x(e,n);if(k(a,u,function(){t(e,n)})){var o=E(u,g),c=o[0],l=o[1];i.replaceState(c,"",l),O(a)}},go:S,back:function(){S(-1)},forward:function(){S(1)},listen:function(t){return b.push(t)},block:function(t){var e=P.push(t);return 1===P.length&&n.addEventListener(o,c),function(){e(),!P.length&&n.removeEventListener(o,c)}}}}function c(t){t.preventDefault(),t.returnValue=""}function l(){var t=[];return{get length(){return t.length},push:function(e){return t.push(e),function(){t=t.filter(function(t){return t!==e})}},call:function(e){t.forEach(function(t){return t&&t(e)})}}}function s(t){var e=t.pathname,n=void 0===e?"/":e,r=t.search,a=void 0===r?"":r,u=t.hash,o=void 0===u?"":u;return a&&"?"!==a&&(n+="?"===a.charAt(0)?a:"?"+a),o&&"#"!==o&&(n+="#"===o.charAt(0)?o:"#"+o),n}function f(t){var e={};if(t){var n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));var r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}},39711:function(t,e,n){"use strict";n.r(e),n.d(e,{HashRouter:function(){return c}});var r=n("67294"),a=n("55648"),u=n("96974");function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}let i=["onClick","reloadDocument","replace","state","target","to"];function c(t){let{basename:e,children:n,window:o}=t,i=(0,r.useRef)();null==i.current&&(i.current=(0,a.createHashHistory)({window:o}));let c=i.current,[l,s]=(0,r.useState)({action:c.action,location:c.location});return(0,r.useLayoutEffect)(()=>c.listen(s),[c]),(0,r.createElement)(u.Router,{basename:e,children:n,location:l.location,navigationType:l.action,navigator:c})}},96974:function(t,e,n){"use strict";n.r(e),n.d(e,{Router:function(){return l},useHref:function(){return s},useLocation:function(){return h},useNavigate:function(){return p},useResolvedPath:function(){return v}});var r=n("67294"),a=n("55648");function u(t,e){if(!t)throw Error(e)}let o=(0,r.createContext)(null),i=(0,r.createContext)(null),c=(0,r.createContext)({outlet:null,matches:[]});function l(t){let{basename:e="/",children:n=null,location:c,navigationType:l=a.Action.Pop,navigator:s,static:h=!1}=t;f()&&u(!1);let p=g(e),v=(0,r.useMemo)(()=>({basename:p,navigator:s,static:h}),[p,s,h]);"string"==typeof c&&(c=(0,a.parsePath)(c));let{pathname:d="/",search:m="",hash:y="",state:b=null,key:P="default"}=c,C=(0,r.useMemo)(()=>{let t=function(t,e){if("/"===e)return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=t.charAt(e.length);return n&&"/"!==n?null:t.slice(e.length)||"/"}(d,p);return null==t?null:{pathname:t,search:m,hash:y,state:b,key:P}},[p,d,m,y,b,P]);return null==C?null:(0,r.createElement)(o.Provider,{value:v},(0,r.createElement)(i.Provider,{children:n,value:{location:C,navigationType:l}}))}function s(t){f()||u(!1);let{basename:e,navigator:n}=(0,r.useContext)(o),{hash:i,pathname:c,search:l}=v(t),s=c;if("/"!==e){let n=function(t){return""===t||""===t.pathname?"/":"string"==typeof t?(0,a.parsePath)(t).pathname:t.pathname}(t),r=null!=n&&n.endsWith("/");s="/"===c?e+(r?"/":""):m([e,c])}return n.createHref({pathname:s,search:l,hash:i})}function f(){return null!=(0,r.useContext)(i)}function h(){return f()||u(!1),(0,r.useContext)(i).location}function p(){f()||u(!1);let{basename:t,navigator:e}=(0,r.useContext)(o),{matches:n}=(0,r.useContext)(c),{pathname:a}=h(),i=JSON.stringify(n.map(t=>t.pathnameBase)),l=(0,r.useRef)(!1);return(0,r.useEffect)(()=>{l.current=!0}),(0,r.useCallback)(function(n,r){if(void 0===r&&(r={}),!l.current)return;if("number"==typeof n){e.go(n);return}let u=d(n,JSON.parse(i),a);"/"!==t&&(u.pathname=m([t,u.pathname])),(r.replace?e.replace:e.push)(u,r.state)},[t,e,i,a])}function v(t){let{matches:e}=(0,r.useContext)(c),{pathname:n}=h(),a=JSON.stringify(e.map(t=>t.pathnameBase));return(0,r.useMemo)(()=>d(t,JSON.parse(a),n),[t,a,n])}function d(t,e,n){let r,u="string"==typeof t?(0,a.parsePath)(t):t,o=""===t||""===u.pathname?"/":u.pathname;if(null==o)r=n;else{let t=e.length-1;if(o.startsWith("..")){let e=o.split("/");for(;".."===e[0];)e.shift(),t-=1;u.pathname=e.join("/")}r=t>=0?e[t]:"/"}let i=function(t,e){void 0===e&&(e="/");let{pathname:n,search:r="",hash:u=""}="string"==typeof t?(0,a.parsePath)(t):t;return{pathname:n?n.startsWith("/")?n:function(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(t=>{".."===t?n.length>1&&n.pop():"."!==t&&n.push(t)}),n.length>1?n.join("/"):"/"}(n,e):e,search:y(r),hash:b(u)}}(u,r);return o&&"/"!==o&&o.endsWith("/")&&!i.pathname.endsWith("/")&&(i.pathname+="/"),i}let m=t=>t.join("/").replace(/\/\/+/g,"/"),g=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),y=t=>t&&"?"!==t?t.startsWith("?")?t:"?"+t:"",b=t=>t&&"#"!==t?t.startsWith("#")?t:"#"+t:""}}]);