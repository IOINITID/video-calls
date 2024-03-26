/*! For license information please see index.3129fd35.js.LICENSE.txt */
(function(){var e,t,r,s,i={7984:function(e,t,r){"use strict";r.r(t),r.d(t,{App:function(){return n}});var s=r("5893"),i=r("8092");let n=()=>(0,s.jsx)(i.PublicRoutes,{})},5950:function(e,t,r){"use strict";r.r(t),r.d(t,{Button:function(){return n}});var s=r("5893"),i=r("7133");let n=({children:e,...t})=>(0,s.jsx)("button",{className:(0,i.css)`
        padding: 8px 16px;
      `,...t,children:e})},4451:function(e,t,r){"use strict";r.r(t),r.d(t,{Root:function(){return o}});var s=r("5893"),i=r("9711"),n=r("7984");let o=()=>(0,s.jsx)(i.HashRouter,{children:(0,s.jsx)(n.App,{})})},7014:function(e,t,r){"use strict";r.r(t),r.d(t,{API_URL:function(){return s}});let s="https://ioinitid-video-calls-server.herokuapp.com"},8092:function(e,t,r){"use strict";r.r(t),r.d(t,{PublicRoutes:function(){return s.PublicRoutes}});var s=r("7942");r("6814")},6814:function(e,t,r){"use strict";r.r(t),r("5893")},7942:function(e,t,r){"use strict";r.r(t),r.d(t,{PublicRoutes:function(){return o}});var s=r("5893"),i=r("9711"),n=r("7929");let o=()=>(0,s.jsxs)(i.Routes,{children:[(0,s.jsx)(i.Route,{path:"/",element:(0,s.jsx)(n.MediaSettings,{})}),(0,s.jsx)(i.Route,{path:"*",element:(0,s.jsx)(i.Navigate,{to:"/"})})]})},5557:function(e,t,r){"use strict";r.r(t),r.d(t,{DevicesService:function(){return s}});class s{}},1141:function(e,t,r){"use strict";r.r(t),r.d(t,{MediaService:function(){return s.MediaService}});var s=r("7037")},7037:function(e,t,r){"use strict";r.r(t),r.d(t,{MediaService:function(){return n}});var s=r("5557"),i=r("9326");class n{constructor(){this.stream=new i.StreamService,this.devices=new s.DevicesService}}},5744:function(e,t,r){"use strict";r.r(t),r.d(t,{SocketService:function(){return n}});var s=r("7014"),i=r("2618");class n{constructor(){this.instance=(0,i.io)(s.API_URL,{transports:["websocket"],reconnection:!1})}ping(e){this.instance.emit("server:base:ping",Date.now()),this.instance.once("client:base:ping",t=>{e(t)})}}},981:function(e,t,r){"use strict";r.r(t),r.d(t,{AudioService:function(){return i}});var s=r("5768");class i extends s.BaseService{constructor(){super({type:"audio"})}async get(){super.get({audio:!0})}}},5768:function(e,t,r){"use strict";r.r(t),r.d(t,{BaseService:function(){return s}}),r("5581"),r("4514"),r("2490");class s{constructor({type:e}){this.instance=new CustomEvent("stream",{detail:{params:{type:e,stream:null,status:"default",error:null}}}),this.stream=null,this.status="default",this.error=null,this.type=e}dispatch(){this.instance.detail.params={...this.instance.detail.params,type:this.type,stream:this.stream,status:this.status,error:this.error},window.dispatchEvent(this.instance)}async get(e){if(!this.stream)try{this.status="loading",this.dispatch(),this.stream=await navigator.mediaDevices.getUserMedia(e),this.status="active",this.dispatch()}catch(e){this.status="error",e instanceof Error&&(this.error=e,this.dispatch())}}close(){this.stream&&(this.stream.getTracks().forEach(e=>e.stop()),this.stream=null,this.status="inactive",this.dispatch())}}},9326:function(e,t,r){"use strict";r.r(t),r.d(t,{StreamService:function(){return n}});var s=r("981"),i=r("96");class n{constructor(){this.audio=new s.AudioService,this.video=new i.VideoService}}},96:function(e,t,r){"use strict";r.r(t),r.d(t,{VideoService:function(){return i}});var s=r("5768");class i extends s.BaseService{constructor(){super({type:"video"})}async get(){super.get({video:!0})}}},9506:function(e,t,r){"use strict";r.r(t);var s=r("5893"),i=r("7294"),n=r.n(i),o=r("745"),c=r("4451");o.createRoot(document.getElementById("root")).render((0,s.jsx)(n().Fragment,{children:(0,s.jsx)(c.Root,{})}))},7929:function(e,t,r){"use strict";r.r(t),r.d(t,{MediaSettings:function(){return u}}),r("7640"),r("9924");var s=r("5893"),i=r("7294"),n=r("7133"),o=r("5950"),c=r("1141"),a=r("5744");let u=()=>{let e=new a.SocketService,t=new c.MediaService,[r,u]=(0,i.useState)([]),d=(0,i.useRef)(null),l=(0,i.useRef)(null);return(0,i.useEffect)(()=>{e.ping(e=>{console.log(`Ping is ${e}ms`)}),e.instance.on("connect",()=>{console.log("Connect")}),e.instance.on("disconnect",()=>{console.log("Disconnect")}),window.addEventListener("stream",e=>{console.log(e.detail.params),"audio"===e.detail.params.type&&d.current&&(d.current.srcObject=e.detail.params.stream),"video"===e.detail.params.type&&l.current&&(l.current.srcObject=e.detail.params.stream)})},[]),(0,s.jsx)("div",{className:(0,n.css)`
        display: grid;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      `,children:(0,s.jsxs)("div",{className:(0,n.css)`
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        `,children:[(0,s.jsx)(o.Button,{onClick:()=>{t.stream.audio.get(),t.stream.video.get()},children:"\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u0438\u0434\u0435\u043E \u0438 \u0430\u0443\u0434\u0438\u043E \u043F\u043E\u0442\u043E\u043A"}),(0,s.jsx)(o.Button,{onClick:()=>{t.stream.audio.close(),t.stream.video.close()},children:"\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u0438\u0434\u0435\u043E \u0438 \u0430\u0443\u0434\u0438\u043E \u043F\u043E\u0442\u043E\u043A"}),(0,s.jsx)(o.Button,{onClick:()=>{t.stream.audio.get()},children:"\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0430\u0443\u0434\u0438\u043E \u043F\u043E\u0442\u043E\u043A"}),(0,s.jsx)(o.Button,{onClick:()=>{t.stream.audio.close()},children:"\u0412\u044B\u043B\u044E\u0447\u0438\u0442\u044C \u0430\u0443\u0434\u0438\u043E \u043F\u043E\u0442\u043E\u043A"}),(0,s.jsx)(o.Button,{onClick:()=>{t.stream.video.get()},children:"\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u0438\u0434\u0435\u043E \u043F\u043E\u0442\u043E\u043A"}),(0,s.jsx)(o.Button,{onClick:()=>{t.stream.video.close()},children:"\u0412\u044B\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u0438\u0434\u0435\u043E \u043F\u043E\u0442\u043E\u043A"}),(0,s.jsxs)("div",{className:(0,n.css)`
            display: grid;
            grid-column: 1/-1;
            row-gap: 4px;
            padding: 8px;
            background-color: #ffffff;
          `,children:[(0,s.jsx)("div",{className:(0,n.css)`
              padding: 8px;
              background-color: #ffffff;
              border: 1px solid #000000;
              border-radius: 8px;
            `,children:(0,s.jsx)("div",{className:(0,n.css)`
                padding-bottom: 8px;
              `,children:"\u0421\u043F\u0438\u0441\u043E\u043A \u0430\u0443\u0434\u0438\u043E\u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 \u0432\u0432\u043E\u0434\u0430:"})}),(0,s.jsx)("div",{className:(0,n.css)`
              padding: 8px;
              background-color: #ffffff;
              border: 1px solid #000000;
              border-radius: 8px;
            `,children:(0,s.jsx)("div",{className:(0,n.css)`
                padding-bottom: 8px;
              `,children:"\u0421\u043F\u0438\u0441\u043E\u043A \u0430\u0443\u0434\u0438\u043E\u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 \u0432\u044B\u0432\u043E\u0434\u0430:"})}),(0,s.jsx)("div",{className:(0,n.css)`
              padding: 8px;
              background-color: #ffffff;
              border: 1px solid #000000;
              border-radius: 8px;
            `,children:(0,s.jsx)("div",{className:(0,n.css)`
                padding-bottom: 8px;
              `,children:"\u0421\u043F\u0438\u0441\u043E\u043A \u0432\u0438\u0434\u0435\u043E\u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 \u0432\u0432\u043E\u0434\u0430:"})}),(0,s.jsxs)("div",{className:(0,n.css)`
              display: grid;
              grid-auto-flow: row;
              margin: 8px 0;
              padding: 8px;
              overflow: hidden;
              border: 1px solid #000000;
              border-radius: 8px;
            `,children:[(0,s.jsx)("div",{className:(0,n.css)`
                display: grid;
                grid-auto-flow: column;
                width: 100%;
                height: 50px;
                transform: rotateX(-180deg);
              `,children:r.map((e,t)=>(0,s.jsx)("div",{style:{width:"2px",height:e+"px",maxHeight:"50px",backgroundColor:e>50?"#fb742d":"#47464d"}},t))}),(0,s.jsx)("div",{className:(0,n.css)`
                display: grid;
                grid-auto-flow: column;
                width: 100%;
                height: 50px;
              `,children:r.map((e,t)=>(0,s.jsx)("div",{style:{width:"2px",height:e+"px",maxHeight:"50px",backgroundColor:e>50?"#fb742d":"#47464d"}},t))})]}),(0,s.jsx)("video",{className:(0,n.css)`
              width: 100%;
              height: 225px;
              background-color: #ffffff;
              object-fit: contain;
              border: 1px solid #000000;
              border-radius: 8px;
            `,ref:l,autoPlay:!0}),(0,s.jsx)("audio",{ref:d,autoPlay:!0})]})]})})}}},n={};function o(e){var t=n[e];if(void 0!==t)return t.exports;var r=n[e]={exports:{}};return i[e].call(r.exports,r,r.exports,o),r.exports}o.m=i,o.es=function(e,t){return Object.keys(e).forEach(function(r){"default"!==r&&!Object.prototype.hasOwnProperty.call(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),e},e=[],o.O=function(t,r,s,i){if(r){i=i||0;for(var n=e.length;n>0&&e[n-1][2]>i;n--)e[n]=e[n-1];e[n]=[r,s,i];return}for(var c=1/0,n=0;n<e.length;n++){for(var r=e[n][0],s=e[n][1],i=e[n][2],a=!0,u=0;u<r.length;u++)c>=i&&Object.keys(o.O).every(function(e){return o.O[e](r[u])})?r.splice(u--,1):(a=!1,i<c&&(c=i));if(a){e.splice(n--,1);var d=s();void 0!==d&&(t=d)}}return t},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.d=function(e,t){for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t={980:0},o.O.j=function(e){return 0===t[e]},r=function(e,r){var s=r[0],i=r[1],n=r[2],c,a,u=0;if(s.some(function(e){return 0!==t[e]})){for(c in i)o.o(i,c)&&(o.m[c]=i[c]);if(n)var d=n(o)}for(e&&e(r);u<s.length;u++)a=s[u],o.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return o.O(d)},(s=globalThis.webpackChunkvideo_calls=globalThis.webpackChunkvideo_calls||[]).forEach(r.bind(null,0)),s.push=r.bind(null,s.push.bind(s));var c=o.O(void 0,["126","361","118","297"],function(){return o("9506")});o.O(c)})();