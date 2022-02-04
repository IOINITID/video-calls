"use strict";(globalThis.webpackChunkvideo_calls=globalThis.webpackChunkvideo_calls||[]).push([[298],{238:(r,a,o)=>{o.d(a,{Z:()=>e});var t=o(7462),n=o(8442);function e(r,a={},o){return(0,n.Z)(r)?a:(0,t.Z)({},a,{ownerState:(0,t.Z)({},a.ownerState,o)})}},7109:(r,a,o)=>{o.d(a,{Z:()=>Z});var t=o(3366),n=o(7462),e=o(7294),i=o(6010),l=o(7192),s=o(9602),c=o(6122),g=o(5949),h=o(5893);const d=(0,g.Z)((0,h.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var v=o(8979);function u(r){return(0,v.Z)("MuiAvatar",r)}(0,o(6087).Z)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);const m=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],f=(0,s.ZP)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(r,a)=>{const{ownerState:o}=r;return[a.root,a[o.variant],o.colorDefault&&a.colorDefault]}})((({theme:r,ownerState:a})=>(0,n.Z)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:r.typography.fontFamily,fontSize:r.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===a.variant&&{borderRadius:r.shape.borderRadius},"square"===a.variant&&{borderRadius:0},a.colorDefault&&{color:r.palette.background.default,backgroundColor:"light"===r.palette.mode?r.palette.grey[400]:r.palette.grey[600]}))),p=(0,s.ZP)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(r,a)=>a.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),b=(0,s.ZP)(d,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(r,a)=>a.fallback})({width:"75%",height:"75%"}),Z=e.forwardRef((function(r,a){const o=(0,c.Z)({props:r,name:"MuiAvatar"}),{alt:s,children:g,className:d,component:v="div",imgProps:Z,sizes:O,src:R,srcSet:x,variant:w="circular"}=o,S=(0,t.Z)(o,m);let y=null;const z=function({crossOrigin:r,referrerPolicy:a,src:o,srcSet:t}){const[n,i]=e.useState(!1);return e.useEffect((()=>{if(!o&&!t)return;i(!1);let n=!0;const e=new Image;return e.onload=()=>{n&&i("loaded")},e.onerror=()=>{n&&i("error")},e.crossOrigin=r,e.referrerPolicy=a,e.src=o,t&&(e.srcset=t),()=>{n=!1}}),[r,a,o,t]),n}((0,n.Z)({},Z,{src:R,srcSet:x})),C=R||x,$=C&&"error"!==z,B=(0,n.Z)({},o,{colorDefault:!$,component:v,variant:w}),P=(r=>{const{classes:a,variant:o,colorDefault:t}=r,n={root:["root",o,t&&"colorDefault"],img:["img"],fallback:["fallback"]};return(0,l.Z)(n,u,a)})(B);return y=$?(0,h.jsx)(p,(0,n.Z)({alt:s,src:R,srcSet:x,sizes:O,ownerState:B,className:P.img},Z)):null!=g?g:C&&s?s[0]:(0,h.jsx)(b,{className:P.fallback}),(0,h.jsx)(f,(0,n.Z)({as:v,ownerState:B,className:(0,i.Z)(P.root,d),ref:a},S,{children:y}))}))},1196:(r,a,o)=>{o.d(a,{Z:()=>C});var t=o(3366),n=o(7462),e=o(7294),i=o(6010);const l=r=>{const a=e.useRef({});return e.useEffect((()=>{a.current=r})),a.current};var s=o(6087),c=o(8979);function g(r){return(0,c.Z)("MuiBadge",r)}const h=(0,s.Z)("MuiBadge",["root","badge","dot","standard","anchorOriginTopLeft","anchorOriginTopRight","anchorOriginBottomLeft","anchorOriginBottomRight","invisible"]);var d=o(8320),v=o(7192),u=o(238),m=o(5893);const f=["anchorOrigin","classes","badgeContent","component","children","className","components","componentsProps","invisible","max","showZero","variant"],p=e.forwardRef((function(r,a){const{anchorOrigin:o={vertical:"top",horizontal:"right"},classes:e,component:s,children:c,className:h,components:p={},componentsProps:b={},max:Z=99,showZero:O=!1,variant:R="standard"}=r,x=(0,t.Z)(r,f),{anchorOrigin:w,badgeContent:S,max:y,variant:z,displayValue:C,invisible:$}=function(r){const{anchorOrigin:a={vertical:"top",horizontal:"right"},badgeContent:o,invisible:t,max:n=99,showZero:e=!1,variant:i="standard"}=r,s=l({anchorOrigin:a,badgeContent:o,max:n,variant:i});let c=t;null==t&&(0===o&&!e||null==o&&"dot"!==i)&&(c=!0);const{anchorOrigin:g=a,badgeContent:h,max:d=n,variant:v=i}=c?s:r;let u="";return"dot"!==v&&(u=h&&Number(h)>d?`${d}+`:h),{anchorOrigin:g,badgeContent:h,invisible:c,max:d,variant:v,displayValue:u}}((0,n.Z)({},r,{anchorOrigin:o,max:Z,variant:R})),B=(0,n.Z)({},r,{anchorOrigin:w,badgeContent:S,classes:e,invisible:$,max:y,variant:z,showZero:O}),P=(r=>{const{variant:a,anchorOrigin:o,invisible:t,classes:n}=r,e={root:["root"],badge:["badge",a,`anchorOrigin${(0,d.Z)(o.vertical)}${(0,d.Z)(o.horizontal)}`,t&&"invisible"]};return(0,v.Z)(e,g,n)})(B),k=s||p.Root||"span",M=(0,u.Z)(k,(0,n.Z)({},x,b.root),B),A=p.Badge||"span",N=(0,u.Z)(A,b.badge,B);return(0,m.jsxs)(k,(0,n.Z)({},M,{ref:a},x,{className:(0,i.Z)(P.root,M.className,h),children:[c,(0,m.jsx)(A,(0,n.Z)({},N,{className:(0,i.Z)(P.badge,N.className),children:C}))]}))}));var b=o(9602),Z=o(6122),O=o(8442);const R=r=>!r||!(0,O.Z)(r);var x=o(8216);const w=["anchorOrigin","component","components","componentsProps","overlap","color","invisible","badgeContent","showZero","variant"],S=(0,n.Z)({},h,(0,s.Z)("MuiBadge",["colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","overlapRectangular","overlapCircular","anchorOriginTopLeftCircular","anchorOriginTopLeftRectangular","anchorOriginTopRightCircular","anchorOriginTopRightRectangular","anchorOriginBottomLeftCircular","anchorOriginBottomLeftRectangular","anchorOriginBottomRightCircular","anchorOriginBottomRightRectangular"])),y=(0,b.ZP)("span",{name:"MuiBadge",slot:"Root",overridesResolver:(r,a)=>a.root})({position:"relative",display:"inline-flex",verticalAlign:"middle",flexShrink:0}),z=(0,b.ZP)("span",{name:"MuiBadge",slot:"Badge",overridesResolver:(r,a)=>{const{ownerState:o}=r;return[a.badge,a[o.variant],a[`anchorOrigin${(0,x.Z)(o.anchorOrigin.vertical)}${(0,x.Z)(o.anchorOrigin.horizontal)}${(0,x.Z)(o.overlap)}`],"default"!==o.color&&a[`color${(0,x.Z)(o.color)}`],o.invisible&&a.invisible]}})((({theme:r,ownerState:a})=>(0,n.Z)({display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignContent:"center",alignItems:"center",position:"absolute",boxSizing:"border-box",fontFamily:r.typography.fontFamily,fontWeight:r.typography.fontWeightMedium,fontSize:r.typography.pxToRem(12),minWidth:20,lineHeight:1,padding:"0 6px",height:20,borderRadius:10,zIndex:1,transition:r.transitions.create("transform",{easing:r.transitions.easing.easeInOut,duration:r.transitions.duration.enteringScreen})},"default"!==a.color&&{backgroundColor:r.palette[a.color].main,color:r.palette[a.color].contrastText},"dot"===a.variant&&{borderRadius:4,height:8,minWidth:8,padding:0},"top"===a.anchorOrigin.vertical&&"right"===a.anchorOrigin.horizontal&&"rectangular"===a.overlap&&{top:0,right:0,transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${S.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}},"bottom"===a.anchorOrigin.vertical&&"right"===a.anchorOrigin.horizontal&&"rectangular"===a.overlap&&{bottom:0,right:0,transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${S.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}},"top"===a.anchorOrigin.vertical&&"left"===a.anchorOrigin.horizontal&&"rectangular"===a.overlap&&{top:0,left:0,transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${S.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}},"bottom"===a.anchorOrigin.vertical&&"left"===a.anchorOrigin.horizontal&&"rectangular"===a.overlap&&{bottom:0,left:0,transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${S.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}},"top"===a.anchorOrigin.vertical&&"right"===a.anchorOrigin.horizontal&&"circular"===a.overlap&&{top:"14%",right:"14%",transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${S.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}},"bottom"===a.anchorOrigin.vertical&&"right"===a.anchorOrigin.horizontal&&"circular"===a.overlap&&{bottom:"14%",right:"14%",transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${S.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}},"top"===a.anchorOrigin.vertical&&"left"===a.anchorOrigin.horizontal&&"circular"===a.overlap&&{top:"14%",left:"14%",transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${S.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}},"bottom"===a.anchorOrigin.vertical&&"left"===a.anchorOrigin.horizontal&&"circular"===a.overlap&&{bottom:"14%",left:"14%",transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${S.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}},a.invisible&&{transition:r.transitions.create("transform",{easing:r.transitions.easing.easeInOut,duration:r.transitions.duration.leavingScreen})}))),C=e.forwardRef((function(r,a){var o,e;const s=(0,Z.Z)({props:r,name:"MuiBadge"}),{anchorOrigin:c={vertical:"top",horizontal:"right"},component:h="span",components:d={},componentsProps:v={},overlap:u="rectangular",color:f="default",invisible:b,badgeContent:O,showZero:S=!1,variant:C="standard"}=s,$=(0,t.Z)(s,w),B=l({anchorOrigin:c,color:f,overlap:u});let P=b;null==b&&(0===O&&!S||null==O&&"dot"!==C)&&(P=!0);const{color:k=f,overlap:M=u,anchorOrigin:A=c}=P?B:s,N=(r=>{const{color:a,anchorOrigin:o,overlap:t,classes:e={}}=r;return(0,n.Z)({},e,{badge:(0,i.Z)(e.badge,g(`anchorOrigin${(0,x.Z)(o.vertical)}${(0,x.Z)(o.horizontal)}${(0,x.Z)(t)}`),g(`overlap${(0,x.Z)(t)}`),"default"!==a&&[g(`color${(0,x.Z)(a)}`),e[`color${(0,x.Z)(a)}`]])})})((0,n.Z)({},s,{anchorOrigin:A,invisible:P,color:k,overlap:M}));return(0,m.jsx)(p,(0,n.Z)({anchorOrigin:A,invisible:b,badgeContent:O,showZero:S,variant:C},$,{components:(0,n.Z)({Root:y,Badge:z},d),componentsProps:{root:(0,n.Z)({},v.root,R(d.Root)&&{as:h,ownerState:(0,n.Z)({},null==(o=v.root)?void 0:o.ownerState,{color:k,overlap:M})}),badge:(0,n.Z)({},v.badge,R(d.Badge)&&{ownerState:(0,n.Z)({},null==(e=v.badge)?void 0:e.ownerState,{color:k,overlap:M})})},classes:N,ref:a}))}))},720:(r,a,o)=>{o.d(a,{Z:()=>t});const t={50:"#ede7f6",100:"#d1c4e9",200:"#b39ddb",300:"#9575cd",400:"#7e57c2",500:"#673ab7",600:"#5e35b1",700:"#512da8",800:"#4527a0",900:"#311b92",A100:"#b388ff",A200:"#7c4dff",A400:"#651fff",A700:"#6200ea"}}}]);
//# sourceMappingURL=298.ddf702d97e09601fa7f6.js.map