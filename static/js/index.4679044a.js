/*! For license information please see index.4679044a.js.LICENSE.txt */
(function(){var t,e,s,r,i={7984:function(t,e,s){"use strict";s.r(e),s.d(e,{App:function(){return n}});var r=s("5893"),i=s("8092");let n=()=>(0,r.jsx)(i.PublicRoutes,{})},5950:function(t,e,s){"use strict";s.r(e),s.d(e,{Button:function(){return n}});var r=s("5893"),i=s("7133");let n=({children:t,...e})=>(0,r.jsx)("button",{className:(0,i.css)`
        padding: 8px 16px;
      `,...e,children:t})},4451:function(t,e,s){"use strict";s.r(e),s.d(e,{Root:function(){return a}});var r=s("5893"),i=s("9711"),n=s("7984");let a=()=>(0,r.jsx)(i.HashRouter,{children:(0,r.jsx)(n.App,{})})},8092:function(t,e,s){"use strict";s.r(e),s.d(e,{PublicRoutes:function(){return r.PublicRoutes}});var r=s("7942");s("6814")},6814:function(t,e,s){"use strict";s.r(e),s("5893")},7942:function(t,e,s){"use strict";s.r(e),s.d(e,{PublicRoutes:function(){return a}});var r=s("5893"),i=s("9711"),n=s("7929");let a=()=>(0,r.jsxs)(i.Routes,{children:[(0,r.jsx)(i.Route,{path:"/",element:(0,r.jsx)(n.MediaSettings,{})}),(0,r.jsx)(i.Route,{path:"*",element:(0,r.jsx)(i.Navigate,{to:"/"})})]})},5557:function(t,e,s){"use strict";s.r(e),s.d(e,{Devices:function(){return r}});class r{}},1141:function(t,e,s){"use strict";s.r(e),s.d(e,{Media:function(){return r.Media}});var r=s("7037");s("9326")},7037:function(t,e,s){"use strict";s.r(e),s.d(e,{Media:function(){return n}});var r=s("5557"),i=s("9326");class n{constructor(){this.stream=new i.Stream,this.devices=new r.Devices}}},9326:function(t,e,s){"use strict";s.r(e),s.d(e,{Stream:function(){return r}}),s("2801"),s("5581"),s("4514"),s("2490");class r{constructor(){this.instance=new CustomEvent("stream",{detail:{params:{stream:null,status:"default",error:null}}}),this.stream=null,this.status="default"}dispatch(t={}){this.instance.detail.params={...this.instance.detail.params,stream:this.stream,status:this.status,...t},window.dispatchEvent(this.instance)}async get(t={audio:!0,video:!0}){if("default"===this.status||"inactive"===this.status){this.status="loading",this.dispatch();try{this.stream=await navigator.mediaDevices.getUserMedia(t),this.status="active",this.dispatch()}catch(t){this.status="error",t instanceof DOMException&&this.dispatch({error:{name:t.name,message:t.message}}),t instanceof Error&&this.dispatch({error:{name:t.name,message:t.message}})}}}close(){try{this.stream&&(this.stream.getTracks().forEach(t=>t.stop()),this.stream=null,this.status="inactive",this.dispatch())}catch(t){this.status="error",t instanceof DOMException&&this.dispatch({error:{name:t.name,message:t.message}}),t instanceof Error&&this.dispatch({error:{name:t.name,message:t.message}})}}}},9506:function(t,e,s){"use strict";s.r(e);var r=s("5893"),i=s("7294"),n=s.n(i),a=s("745"),o=s("4451");a.createRoot(document.getElementById("root")).render((0,r.jsx)(n().Fragment,{children:(0,r.jsx)(o.Root,{})}))},7929:function(t,e,s){"use strict";s.r(e),s.d(e,{MediaSettings:function(){return c}}),s("7640"),s("9924");var r=s("5893"),i=s("7294"),n=s("7133"),a=s("5950"),o=s("1141");let c=()=>{let[t,e]=(0,i.useState)([]),s=(0,i.useRef)(null),c=new o.Media;return(0,i.useEffect)(()=>{window.addEventListener("stream",t=>{console.log(t.detail.params),s.current&&(s.current.srcObject=t.detail.params.stream)})},[]),(0,r.jsx)("div",{className:(0,n.css)`
        display: grid;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      `,children:(0,r.jsxs)("div",{className:(0,n.css)`
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        `,children:[(0,r.jsx)(a.Button,{onClick:()=>{c.stream.get()},children:"\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u0438\u0434\u0435\u043E \u0438 \u0430\u0443\u0434\u0438\u043E \u043F\u043E\u0442\u043E\u043A"}),(0,r.jsx)(a.Button,{onClick:()=>{c.stream.close()},children:"\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u0438\u0434\u0435\u043E \u0438 \u0430\u0443\u0434\u0438\u043E \u043F\u043E\u0442\u043E\u043A"}),(0,r.jsx)(a.Button,{onClick:()=>{},children:"\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0430\u0443\u0434\u0438\u043E \u043F\u043E\u0442\u043E\u043A"}),(0,r.jsx)(a.Button,{onClick:()=>{},children:"\u0412\u044B\u043B\u044E\u0447\u0438\u0442\u044C \u0430\u0443\u0434\u0438\u043E \u043F\u043E\u0442\u043E\u043A"}),(0,r.jsx)(a.Button,{onClick:()=>{},children:"\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u0438\u0434\u0435\u043E \u043F\u043E\u0442\u043E\u043A"}),(0,r.jsx)(a.Button,{onClick:()=>{},children:"\u0412\u044B\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u0438\u0434\u0435\u043E \u043F\u043E\u0442\u043E\u043A"}),(0,r.jsxs)("div",{className:(0,n.css)`
            display: grid;
            grid-column: 1/-1;
            row-gap: 4px;
            padding: 8px;
            background-color: #ffffff;
          `,children:[(0,r.jsx)("div",{className:(0,n.css)`
              padding: 8px;
              background-color: #ffffff;
              border: 1px solid #000000;
              border-radius: 8px;
            `,children:(0,r.jsx)("div",{className:(0,n.css)`
                padding-bottom: 8px;
              `,children:"\u0421\u043F\u0438\u0441\u043E\u043A \u0430\u0443\u0434\u0438\u043E\u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 \u0432\u0432\u043E\u0434\u0430:"})}),(0,r.jsx)("div",{className:(0,n.css)`
              padding: 8px;
              background-color: #ffffff;
              border: 1px solid #000000;
              border-radius: 8px;
            `,children:(0,r.jsx)("div",{className:(0,n.css)`
                padding-bottom: 8px;
              `,children:"\u0421\u043F\u0438\u0441\u043E\u043A \u0430\u0443\u0434\u0438\u043E\u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 \u0432\u044B\u0432\u043E\u0434\u0430:"})}),(0,r.jsx)("div",{className:(0,n.css)`
              padding: 8px;
              background-color: #ffffff;
              border: 1px solid #000000;
              border-radius: 8px;
            `,children:(0,r.jsx)("div",{className:(0,n.css)`
                padding-bottom: 8px;
              `,children:"\u0421\u043F\u0438\u0441\u043E\u043A \u0432\u0438\u0434\u0435\u043E\u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 \u0432\u0432\u043E\u0434\u0430:"})}),(0,r.jsxs)("div",{className:(0,n.css)`
              display: grid;
              grid-auto-flow: row;
              margin: 8px 0;
              padding: 8px;
              overflow: hidden;
              border: 1px solid #000000;
              border-radius: 8px;
            `,children:[(0,r.jsx)("div",{className:(0,n.css)`
                display: grid;
                grid-auto-flow: column;
                width: 100%;
                height: 50px;
                transform: rotateX(-180deg);
              `,children:t.map((t,e)=>(0,r.jsx)("div",{style:{width:"2px",height:t+"px",maxHeight:"50px",backgroundColor:t>50?"#fb742d":"#47464d"}},e))}),(0,r.jsx)("div",{className:(0,n.css)`
                display: grid;
                grid-auto-flow: column;
                width: 100%;
                height: 50px;
              `,children:t.map((t,e)=>(0,r.jsx)("div",{style:{width:"2px",height:t+"px",maxHeight:"50px",backgroundColor:t>50?"#fb742d":"#47464d"}},e))})]}),(0,r.jsx)("video",{className:(0,n.css)`
              width: 100%;
              height: 225px;
              background-color: #ffffff;
              object-fit: contain;
              border: 1px solid #000000;
              border-radius: 8px;
            `,ref:s,autoPlay:!0})]})]})})}}},n={};function a(t){var e=n[t];if(void 0!==e)return e.exports;var s=n[t]={exports:{}};return i[t].call(s.exports,s,s.exports,a),s.exports}a.m=i,a.es=function(t,e){return Object.keys(t).forEach(function(s){"default"!==s&&!Object.prototype.hasOwnProperty.call(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:function(){return t[s]}})}),t},t=[],a.O=function(e,s,r,i){if(s){i=i||0;for(var n=t.length;n>0&&t[n-1][2]>i;n--)t[n]=t[n-1];t[n]=[s,r,i];return}for(var o=1/0,n=0;n<t.length;n++){for(var s=t[n][0],r=t[n][1],i=t[n][2],c=!0,d=0;d<s.length;d++)o>=i&&Object.keys(a.O).every(function(t){return a.O[t](s[d])})?s.splice(d--,1):(c=!1,i<o&&(o=i));if(c){t.splice(n--,1);var u=r();void 0!==u&&(e=u)}}return e},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(t){if("object"==typeof window)return window}}(),a.d=function(t,e){for(var s in e)a.o(e,s)&&!a.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,{a:e}),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e={980:0},a.O.j=function(t){return 0===e[t]},s=function(t,s){var r=s[0],i=s[1],n=s[2],o,c,d=0;if(r.some(function(t){return 0!==e[t]})){for(o in i)a.o(i,o)&&(a.m[o]=i[o]);if(n)var u=n(a)}for(t&&t(s);d<r.length;d++)c=r[d],a.o(e,c)&&e[c]&&e[c][0](),e[c]=0;return a.O(u)},(r=globalThis.webpackChunkvideo_calls=globalThis.webpackChunkvideo_calls||[]).forEach(s.bind(null,0)),r.push=s.bind(null,r.push.bind(r));var o=a.O(void 0,["126","361","118","633"],function(){return a("9506")});a.O(o)})();