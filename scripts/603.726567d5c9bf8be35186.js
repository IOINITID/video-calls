"use strict";(globalThis.webpackChunkvideo_calls=globalThis.webpackChunkvideo_calls||[]).push([[603],{5097:(e,t,r)=>{r.d(t,{V:()=>n,Z:()=>a});var o=r(8979);function n(e){return(0,o.Z)("MuiDivider",e)}const a=(0,r(6087).Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"])},1603:(e,t,r)=>{r.r(t),r.d(t,{AllFriends:()=>p,default:()=>p});var o=r(9704),n=r(1508),a=r(2658),i=r(8206),l=r(7294),s=r(9225),d=r(7248),c=r(7294);const p=(0,l.memo)((()=>{const e=(0,o.v9)(s.$R);return c.createElement(n.Z,{sx:{padding:"0 8px 0 16px",margin:"16px 8px 16px 0",display:"grid",alignContent:"start",rowGap:"8px",overflowY:"scroll","&::-webkit-scrollbar":{width:"4px"},"&::-webkit-scrollbar-track":{backgroundColor:"none"},"&::-webkit-scrollbar-thumb":{backgroundColor:i.r.palette.grey[300],border:`1px solid ${i.r.palette.grey[500]}`,borderRadius:"8px"}}},c.createElement(n.Z,{sx:{padding:"8px 12px"}},c.createElement(a.Z,{variant:"h6"},"Все друзья: ",e.length>0?e.length:0)),c.createElement(n.Z,{sx:{display:"grid",alignContent:"start",rowGap:"8px"}},e.map((e=>c.createElement(d.h,{key:e._id,id:e._id,name:e.name,status:e.status})))))}))},7248:(e,t,r)=>{r.d(t,{h:()=>j});var o=r(1508),n=r(1196),a=r(7109),i=r(2658),l=r(8334),s=r(3366),d=r(7462),c=r(7294),p=r(6010),u=r(7192),m=r(1796),g=r(9602),b=r(6122),x=r(9773),v=r(9327),h=r(8974),Z=r(1705),f=r(5097),y=r(6087);const C=(0,y.Z)("MuiListItemIcon",["root","alignItemsFlexStart"]),k=(0,y.Z)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);var E=r(8979);function w(e){return(0,E.Z)("MuiMenuItem",e)}const M=(0,y.Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var I=r(5893);const $=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],V=(0,g.ZP)(v.Z,{shouldForwardProp:e=>(0,g.FO)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.dense&&t.dense,r.divider&&t.divider,!r.disableGutters&&t.gutters]}})((({theme:e,ownerState:t})=>(0,d.Z)({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${e.palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${M.selected}`]:{backgroundColor:(0,m.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${M.focusVisible}`]:{backgroundColor:(0,m.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${M.selected}:hover`]:{backgroundColor:(0,m.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(0,m.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${M.focusVisible}`]:{backgroundColor:e.palette.action.focus},[`&.${M.disabled}`]:{opacity:e.palette.action.disabledOpacity},[`& + .${f.Z.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${f.Z.inset}`]:{marginLeft:52},[`& .${k.root}`]:{marginTop:0,marginBottom:0},[`& .${k.inset}`]:{paddingLeft:36},[`& .${C.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&(0,d.Z)({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${C.root} svg`]:{fontSize:"1.25rem"}})))),T=c.forwardRef((function(e,t){const r=(0,b.Z)({props:e,name:"MuiMenuItem"}),{autoFocus:o=!1,component:n="li",dense:a=!1,divider:i=!1,disableGutters:l=!1,focusVisibleClassName:m,role:g="menuitem",tabIndex:v}=r,f=(0,s.Z)(r,$),y=c.useContext(x.Z),C={dense:a||y.dense||!1,disableGutters:l},k=c.useRef(null);(0,h.Z)((()=>{o&&k.current&&k.current.focus()}),[o]);const E=(0,d.Z)({},r,{dense:C.dense,divider:i,disableGutters:l}),M=(e=>{const{disabled:t,dense:r,divider:o,disableGutters:n,selected:a,classes:i}=e,l={root:["root",r&&"dense",t&&"disabled",!n&&"gutters",o&&"divider",a&&"selected"]},s=(0,u.Z)(l,w,i);return(0,d.Z)({},i,s)})(r),T=(0,Z.Z)(k,t);let z;return r.disabled||(z=void 0!==v?v:-1),(0,I.jsx)(x.Z.Provider,{value:C,children:(0,I.jsx)(V,(0,d.Z)({ref:T,role:g,tabIndex:z,component:n,focusVisibleClassName:(0,p.Z)(M.focusVisible,m)},f,{ownerState:E,classes:M}))})}));var z=r(720),G=r(5949);const F=(0,G.Z)((0,I.jsx)("path",{d:"M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"}),"Chat"),B=(0,G.Z)((0,I.jsx)("path",{d:"M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"}),"Call"),O=(0,G.Z)((0,I.jsx)("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreVert");var R=r(8206),S=r(239),H=r(9482),L=r(7294);const j=(0,c.memo)((({id:e,name:t,status:r})=>{const[s,d]=(0,c.useState)(null);return L.createElement(o.Z,{sx:{display:"grid",gridTemplateColumns:"max-content 1fr",alignItems:"center"}},L.createElement(o.Z,{sx:{display:"grid",gridTemplateColumns:"max-content 1fr",columnGap:"8px",alignItems:"center",padding:"8px 12px",borderRadius:"8px",cursor:"pointer",".MuiBadge-badge":{border:`1px solid ${R.r.palette.common.white}`},".MuiBadge-colorSuccess":{backgroundColor:R.r.palette.success.light},".MuiBadge-colorError":{backgroundColor:R.r.palette.error.light}}},L.createElement(n.Z,{overlap:"circular",variant:"dot",anchorOrigin:{vertical:"bottom",horizontal:"right"},color:"online"===r?"success":"error"},L.createElement(a.Z,{sx:{backgroundColor:z.Z[500]}})),L.createElement(o.Z,{sx:{display:"grid",gridTemplateColumns:"max-content"}},L.createElement(i.Z,{variant:"body2"},t||""),L.createElement(i.Z,{variant:"caption"},"online"===r?"В сети":"Не в сети"))),L.createElement(o.Z,{sx:{display:"grid",gridTemplateColumns:"repeat(3, 24px)",columnGap:"24px",alignItems:"center",justifyContent:"end"}},L.createElement(o.Z,{sx:{cursor:"pointer"}},L.createElement(F,null)),L.createElement(o.Z,{sx:{cursor:"pointer"}},L.createElement(B,null)),L.createElement(o.Z,{sx:{cursor:"pointer"},onClick:e=>d(e.currentTarget)},L.createElement(O,null))),L.createElement(l.Z,{anchorEl:s,open:Boolean(s),onClose:()=>d(null),MenuListProps:{"aria-labelledby":"basic-button"}},L.createElement(T,{onClick:()=>d(null)},"Написать"),L.createElement(T,{onClick:()=>d(null)},"Позвонить"),L.createElement(T,{onClick:()=>{return void 0,null,t=function*(){d(null);const t=yield H.b.post("/remove-from-friends",{friendId:e});return S.W.emit("on-remove-from-friends",e),t.data},new Promise(((e,r)=>{var o=e=>{try{a(t.next(e))}catch(e){r(e)}},n=e=>{try{a(t.throw(e))}catch(e){r(e)}},a=t=>t.done?e(t.value):Promise.resolve(t.value).then(o,n);a((t=t.apply(undefined,null)).next())}));var t}},"Удалить из друзей")))}))}}]);
//# sourceMappingURL=603.726567d5c9bf8be35186.js.map