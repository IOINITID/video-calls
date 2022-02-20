(()=>{"use strict";var e,t={5134:(e,t,r)=>{var a=r(3935),n=r(9704),l=r(9711),o=r(5974),i=r(2287),s=r(6403),c=r(9084),d=r(9669),m=r.n(d);const p="https://ioinitid-video-calls-server.herokuapp.com",u={Authorization:"user/authorization",Refresh:`${p}/api/user/refresh`,Registration:"user/registration",Logout:"user/logout",User:"user/user"},g=e=>f.request({method:"POST",url:u.Authorization,data:e}),x=()=>m().request({method:"GET",url:u.Refresh,withCredentials:!0}),h=e=>f.request({method:"POST",url:u.Registration,data:e}),v=()=>f.request({method:"GET",url:u.Logout}),y=()=>f.request({method:"GET",url:u.User}),E=e=>f.request({method:"POST",url:"/user/users",data:e}),f=m().create({withCredentials:!0,baseURL:`${p}/api`});f.interceptors.request.use((e=>(e.headers&&(e.headers.Authorization=`Bearer ${localStorage.getItem("token")}`),e))),f.interceptors.response.use((e=>e),(e=>{return void 0,null,t=function*(){const t=e.config;if(401===e.response.status)try{const e=yield x();return localStorage.setItem("token",e.data.accessToken),f.request(t)}catch(e){console.log(e),yield v(),localStorage.removeItem("token")}throw e},new Promise(((e,r)=>{var a=e=>{try{l(t.next(e))}catch(e){r(e)}},n=e=>{try{l(t.throw(e))}catch(e){r(e)}},l=t=>t.done?e(t.value):Promise.resolve(t.value).then(a,n);l((t=t.apply(undefined,null)).next())}));var t}));const b=(0,s.hg)("user/addMessageToChannel",(e=>{return void 0,t=[e],r=function*({channel:e,message:t}){return(yield f.post("/add-message-to-channel",{channel:e,message:t})).data},new Promise(((e,a)=>{var n=e=>{try{o(r.next(e))}catch(e){a(e)}},l=e=>{try{o(r.throw(e))}catch(e){a(e)}},o=t=>t.done?e(t.value):Promise.resolve(t.value).then(n,l);o((r=r.apply(undefined,t)).next())}));var t,r})),Z=(0,s.hg)("user/getApprovals",(()=>{return void 0,null,e=function*(){return(yield f.get("/approvals")).data},new Promise(((t,r)=>{var a=t=>{try{l(e.next(t))}catch(e){r(e)}},n=t=>{try{l(e.throw(t))}catch(e){r(e)}},l=e=>e.done?t(e.value):Promise.resolve(e.value).then(a,n);l((e=e.apply(undefined,null)).next())}));var e})),C=(0,s.hg)("user/getChannelMessages",(e=>{return void 0,t=[e],r=function*({channel:e}){return(yield f.post("/get-channel-messages",{channel:e})).data},new Promise(((e,a)=>{var n=e=>{try{o(r.next(e))}catch(e){a(e)}},l=e=>{try{o(r.throw(e))}catch(e){a(e)}},o=t=>t.done?e(t.value):Promise.resolve(t.value).then(n,l);o((r=r.apply(undefined,t)).next())}));var t,r})),w=(0,s.hg)("user/getChannels",(()=>{return void 0,null,e=function*(){return(yield f.get("/get-channels")).data},new Promise(((t,r)=>{var a=t=>{try{l(e.next(t))}catch(e){r(e)}},n=t=>{try{l(e.throw(t))}catch(e){r(e)}},l=e=>e.done?t(e.value):Promise.resolve(e.value).then(a,n);l((e=e.apply(undefined,null)).next())}));var e})),k=(0,s.hg)("user/getInvites",(()=>{return void 0,null,e=function*(){return(yield f.get("/invites")).data},new Promise(((t,r)=>{var a=t=>{try{l(e.next(t))}catch(e){r(e)}},n=t=>{try{l(e.throw(t))}catch(e){r(e)}},l=e=>e.done?t(e.value):Promise.resolve(e.value).then(a,n);l((e=e.apply(undefined,null)).next())}));var e})),I=(0,s.hg)("user/getFriendsAction",(()=>{return void 0,null,e=function*(){return(yield f.get("/friends")).data},new Promise(((t,r)=>{var a=t=>{try{l(e.next(t))}catch(e){r(e)}},n=t=>{try{l(e.throw(t))}catch(e){r(e)}},l=e=>e.done?t(e.value):Promise.resolve(e.value).then(a,n);l((e=e.apply(undefined,null)).next())}));var e})),T=(0,s.oM)({name:"user",initialState:{isAuthorizated:!1,isLoading:!1,user:void 0,users:void 0,friends:[],invites:[],approvals:[],isCall:!1,isIncomingCall:!1,isCallAccepted:!1,isCallCanceled:!1,channels:[],channelMessages:[]},reducers:{setAuthorization:(e,{payload:t})=>{e.isAuthorizated=t},setIsLoading:(e,{payload:t})=>{e.isLoading=t},setUser:(e,{payload:t})=>{e.user=t},setUsers:(e,{payload:t})=>{e.users=t},setIsCall:(e,{payload:t})=>{e.isCall=t},setIsIncomingCall:(e,{payload:t})=>{e.isIncomingCall=t},setIsCallAccepted:(e,{payload:t})=>{e.isCallAccepted=t},setIsCallCanceled:(e,{payload:t})=>{e.isCallCanceled=t}},extraReducers:e=>{e.addCase(I.fulfilled,((e,{payload:t})=>{e.friends=t})),e.addCase(k.fulfilled,((e,{payload:t})=>{e.invites=t})),e.addCase(Z.fulfilled,((e,{payload:t})=>{e.approvals=t})),e.addCase(w.fulfilled,((e,{payload:t})=>{e.channels=t})),e.addCase(C.fulfilled,((e,{payload:t})=>{e.channelMessages=t})),e.addCase(b.fulfilled,((e,{payload:t})=>{e.channelMessages=[...e.channelMessages,t]}))}}),{setAuthorization:S,setIsLoading:P,setUser:A,setUsers:G,setIsCall:R,setIsIncomingCall:O,setIsCallAccepted:z,setIsCallCanceled:j}=T.actions,M=T.reducer;var $=r(4857);const B=(0,s.PH)("user/postAuthorizationAction"),W=(0,s.PH)("user/getRefreshAction"),_=(0,s.PH)("user/postRegistrationAction"),D=(0,s.PH)("user/postLogoutAction"),L=(0,s.PH)("user/getUserAction"),U=(0,s.PH)("user/getUsersAction");var q=r(2132);const H=function*({payload:e}){var t;try{yield(0,$.gz)(P(!0));const t=yield(0,$.RE)(g,e);yield(0,$.gz)(P(!1)),yield(0,$.gz)(S(!0)),localStorage.setItem("token",t.data.accessToken)}catch(e){if(console.error(e),yield(0,$.gz)(P(!1)),m().isAxiosError(e))return q.Am.error(null==(t=e.response)?void 0:t.data.message);q.Am.error("Ошибка авторизации. Проверьте логин и пароль.")}},Y=function*(){try{const e=yield(0,$.RE)(x);yield(0,$.gz)(S(!0)),localStorage.setItem("token",e.data.accessToken)}catch(e){console.error(e)}},F=function*({payload:e}){try{const t=yield(0,$.RE)(h,e);yield(0,$.gz)(S(!0)),localStorage.setItem("token",t.data.accessToken)}catch(e){console.error(e)}},N=function*(){try{yield(0,$.RE)(v),yield(0,$.gz)(S(!1)),localStorage.removeItem("token")}catch(e){console.error(e)}},V=function*(){try{const e=yield(0,$.RE)(y);yield(0,$.gz)(A(e.data))}catch(e){console.error(e)}},J=function*({payload:e}){try{const t=yield(0,$.RE)(E,e);yield(0,$.gz)(G(t.data))}catch(e){console.error(e)}},K=[function*(){yield(0,$.$6)([(0,$.ib)(B.type,H),(0,$.ib)(W.type,Y),(0,$.ib)(_.type,F),(0,$.ib)(D.type,N),(0,$.ib)(L.type,V),(0,$.ib)(U.type,J)])}],Q=(0,c.ZP)(),X=(0,s.xC)({reducer:{user:M},middleware:[Q]});Q.run((function*(){yield(0,$.$6)(K.map((e=>(0,$.rM)(e))))}));var ee=r(7294);const te=e=>e.user.isAuthorizated,re=e=>e.user.isLoading,ae=e=>e.user.user,ne=e=>e.user.users,le=e=>e.user.friends,oe=e=>e.user.invites,ie=e=>e.user.approvals,se=e=>e.user.channelMessages;var ce=r(6974),de=r(5251),me=r(7294),pe=Object.defineProperty,ue=Object.getOwnPropertySymbols,ge=Object.prototype.hasOwnProperty,xe=Object.prototype.propertyIsEnumerable,he=(e,t,r)=>t in e?pe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;const ve=(0,ee.memo)((e=>{var t=((e,t)=>{var r={};for(var a in e)ge.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&ue)for(var a of ue(e))t.indexOf(a)<0&&xe.call(e,a)&&(r[a]=e[a]);return r})(e,[]);return me.createElement(de.Z,((e,t)=>{for(var r in t||(t={}))ge.call(t,r)&&he(e,r,t[r]);if(ue)for(var r of ue(t))xe.call(t,r)&&he(e,r,t[r]);return e})({},t))}));var ye=r(1508),Ee=r(2658),fe=r(270),be=r(6867),Ze=r(6634),Ce=r(5697),we=r(2186),ke=r(4345),Ie=r(4128);const Te=(0,ke.Z)({palette:{primary:{light:Ie.Z.A400,main:Ie.Z[500],dark:Ie.Z[800]}}}),Se=r.p+"assets/images/authorization-image.6642b50856b9fc50fde3936da1774bf9.jpg";var Pe=r(7294);const Ae=(0,ee.memo)((({children:e})=>Pe.createElement(ye.Z,{sx:{display:"grid",alignItems:"center",justifyContent:"center",height:"100%"}},e)));var Ge=r(6236),Re=r(7294);const Oe=(0,ee.memo)((()=>{const e=(0,n.I0)(),t=(0,ce.s0)(),r=(0,n.v9)(re),[a,l]=(0,ee.useState)(""),[o,s]=(0,ee.useState)(""),[c,d]=(0,ee.useState)(!1);return Re.createElement(Ae,null,Re.createElement(ye.Z,{sx:{display:"grid",width:"920px",gridTemplateColumns:"448px 472px",borderRadius:"20px",border:`1px solid ${Te.palette.grey[300]}`,overflow:"hidden"}},Re.createElement(ye.Z,null,Re.createElement("img",{className:i.iv`
              width: 100%;
              height: 100%;
              object-fit: cover;
            `,src:Se,alt:"Илюстрация."})),Re.createElement(ye.Z,{sx:{padding:"48px 56px",backgroundColor:`${Te.palette.common.white}`}},Re.createElement(ye.Z,{sx:{display:"grid",rowGap:"16px"}},Re.createElement(ye.Z,{sx:{display:"grid",rowGap:"32px"}},Re.createElement(ye.Z,{sx:{display:"grid",rowGap:"32px"}},Re.createElement(Ee.Z,{variant:"h5"},"Войти в свой профиль"),Re.createElement(ye.Z,{sx:{display:"grid",rowGap:"24px"}},Re.createElement(ve,{type:"email",id:"email",name:"email",label:"Адрес электронной почты",value:a,onChange:e=>l(e.target.value),placeholder:"Введите ваш email",autoComplete:"off",fullWidth:!0}),Re.createElement(ve,{type:c?"text":"password",id:"password",name:"password",label:"Пароль",value:o,onChange:e=>s(e.target.value),placeholder:"Введите ваш пароль",autoComplete:"off",fullWidth:!0,InputProps:{endAdornment:Re.createElement(fe.Z,{position:"end"},Re.createElement(be.Z,{onClick:()=>d(!c)},c?Re.createElement(Ce.Z,null):Re.createElement(we.Z,null)))}}))),Re.createElement(Ge.Z,{variant:"contained",color:"primary",size:"large",loading:r,onClick:()=>{e(B({email:a,password:o}))}},"Войти")),Re.createElement(Ee.Z,{variant:"subtitle2"},"У Вас ещё нет профиля?"," ",Re.createElement(Ze.Z,{sx:{cursor:"pointer"},underline:"hover",onClick:e=>{e.preventDefault(),t("/registration")}},"Зарегистрироваться"))))))}));var ze=r(7294);const je=(0,ee.memo)((()=>{const e=(0,n.I0)(),t=(0,ce.s0)(),r=(0,n.v9)(re),[a,l]=(0,ee.useState)(""),[o,s]=(0,ee.useState)(""),[c,d]=(0,ee.useState)(""),[m,p]=(0,ee.useState)(!1);return ze.createElement(Ae,null,ze.createElement(ye.Z,{sx:{display:"grid",width:"920px",gridTemplateColumns:"448px 472px",borderRadius:"20px",border:`1px solid ${Te.palette.grey[300]}`,overflow:"hidden"}},ze.createElement(ye.Z,null,ze.createElement("img",{className:i.iv`
              width: 100%;
              height: 100%;
              object-fit: cover;
            `,src:Se,alt:"Илюстрация."})),ze.createElement(ye.Z,{sx:{padding:"48px 56px",backgroundColor:`${Te.palette.common.white}`}},ze.createElement(ye.Z,{sx:{display:"grid",rowGap:"16px"}},ze.createElement(ye.Z,{sx:{display:"grid",rowGap:"24px"}},ze.createElement(ye.Z,{sx:{display:"grid",rowGap:"32px"}},ze.createElement(Ee.Z,{variant:"h5"},"Создать учётную запись"),ze.createElement(ye.Z,{sx:{display:"grid",rowGap:"24px"}},ze.createElement(de.Z,{type:"email",id:"email",name:"email",label:"Адрес электронной почты",value:a,onChange:e=>l(e.target.value),placeholder:"Введите ваш email",autoComplete:"off",fullWidth:!0}),ze.createElement(de.Z,{type:"text",id:"name",name:"name",label:"Имя пользователя",value:o,onChange:e=>s(e.target.value),placeholder:"Введите ваше имя",autoComplete:"off",fullWidth:!0}),ze.createElement(de.Z,{type:m?"text":"password",id:"password",name:"password",label:"Пароль",value:c,onChange:e=>d(e.target.value),placeholder:"Введите ваш пароль",autoComplete:"off",fullWidth:!0,InputProps:{endAdornment:ze.createElement(fe.Z,{position:"end"},ze.createElement(be.Z,{onClick:()=>p(!m)},m?ze.createElement(Ce.Z,null):ze.createElement(we.Z,null)))}}))),ze.createElement(ye.Z,{sx:{display:"grid",rowGap:"32px"}},ze.createElement(Ee.Z,{variant:"caption",color:Te.palette.grey[500]},"Регистрируясь, Вы соглашаетесь с"," ",ze.createElement(Ze.Z,{sx:{cursor:"pointer"},underline:"hover"},"политикой обработки персональных данных")),ze.createElement(Ge.Z,{variant:"contained",color:"primary",size:"large",loading:r,onClick:()=>{e(_({email:a,name:o,password:c}))}},"Зарегистрироваться"))),ze.createElement(Ee.Z,{variant:"subtitle2"},ze.createElement(Ze.Z,{sx:{cursor:"pointer"},underline:"hover",onClick:e=>{e.preventDefault(),t("/authorization")}},"Уже зарегистрированы?"))))))}));var Me=r(7294);const $e=(0,ee.memo)((()=>Me.createElement(ce.Z5,null,Me.createElement(ce.AW,{path:"authorization",element:Me.createElement(Oe,null)}),Me.createElement(ce.AW,{path:"registration",element:Me.createElement(je,null)}),Me.createElement(ce.AW,{path:"*",element:Me.createElement(ce.Fg,{to:"authorization"})}))));var Be=r(6914),We=r(7294),_e=Object.defineProperty,De=Object.getOwnPropertySymbols,Le=Object.prototype.hasOwnProperty,Ue=Object.prototype.propertyIsEnumerable,qe=(e,t,r)=>t in e?_e(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;const He=(0,ee.memo)((e=>{var t=e,{children:r}=t,a=((e,t)=>{var r={};for(var a in e)Le.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&De)for(var a of De(e))t.indexOf(a)<0&&Ue.call(e,a)&&(r[a]=e[a]);return r})(t,["children"]);return We.createElement(Be.Z,((e,t)=>{for(var r in t||(t={}))Le.call(t,r)&&qe(e,r,t[r]);if(De)for(var r of De(t))Ue.call(t,r)&&qe(e,r,t[r]);return e})({disableElevation:!0},a),r)}));var Ye=r(2855),Fe=r(4433),Ne=r(5683),Ve=r(6454),Je=r(7720),Ke=r(7294);const Qe=(0,ee.memo)((()=>{const e=(0,ce.s0)();return Ke.createElement(ye.Z,{sx:{display:"grid",rowGap:"24px",height:"100%",alignContent:"start",padding:"25px 16px",justifyContent:"center"}},Ke.createElement(ye.Z,{sx:{display:"grid",rowGap:"16px"}},Ke.createElement(Ve.Z,{title:"Друзья",arrow:!0,placement:"right"},Ke.createElement(ye.Z,{sx:{display:"grid",padding:"8px",backgroundColor:Te.palette.grey[400],cursor:"pointer",borderRadius:"8px",justifyContent:"center",width:"40px"},onClick:()=>e("/friends")},Ke.createElement(Ye.Z,null))),Ke.createElement(Ve.Z,{title:"Каналы",arrow:!0,placement:"right"},Ke.createElement(ye.Z,{sx:{display:"grid",padding:"8px",backgroundColor:Te.palette.grey[400],cursor:"pointer",borderRadius:"8px",justifyContent:"center",width:"40px"},onClick:()=>e("/channels")},Ke.createElement(Fe.Z,null)))),Ke.createElement(Je.Z,null),Ke.createElement(Ve.Z,{title:"Профиль",arrow:!0,placement:"right"},Ke.createElement(ye.Z,{sx:{display:"grid",padding:"8px",backgroundColor:Te.palette.grey[400],cursor:"pointer",borderRadius:"8px",justifyContent:"center",width:"40px"},onClick:()=>e("/profile")},Ke.createElement(Ne.Z,null))))}));var Xe=r(1196),et=r(7109),tt=r(720),rt=r(251);const at=(0,r(3213).io)(p,{transports:["websocket"]});var nt=r(7294);const lt=(0,ee.memo)((({name:e,status:t,channelId:r})=>{const a=(0,n.v9)(ae),l=(0,ce.s0)();return nt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content 1fr max-content",columnGap:"8px",alignItems:"center",padding:"8px 12px",borderRadius:"8px",cursor:"pointer",":hover":{backgroundColor:Te.palette.grey[300],".delete-icon":{display:"grid"}},".MuiBadge-badge":{border:`1px solid ${Te.palette.common.white}`},".MuiBadge-colorSuccess":{backgroundColor:Te.palette.success.light},".MuiBadge-colorError":{backgroundColor:Te.palette.error.light}},onClick:()=>{at.emit("on-channel-join",r,null==a?void 0:a.id),l("/messages")}},nt.createElement(Xe.Z,{overlap:"circular",variant:"dot",anchorOrigin:{vertical:"bottom",horizontal:"right"},color:"online"===t?"success":"error"},nt.createElement(et.Z,{sx:{backgroundColor:tt.Z[500]}})),nt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content"}},nt.createElement(Ee.Z,{variant:"body2"},e||""),nt.createElement(Ee.Z,{variant:"caption"},"В сети")),nt.createElement(ye.Z,{className:"delete-icon",sx:{display:"none"}},nt.createElement(be.Z,null,nt.createElement(rt.Z,{sx:{color:Te.palette.grey[700]}}))))}));var ot=r(3996),it=r(5338),st=r(5838),ct=r(3847),dt=r(7294);const mt=(0,ee.memo)((()=>{const e=(0,n.v9)(ae),[t,r]=(0,ee.useState)(!1),[a,l]=(0,ee.useState)(!1);return dt.createElement(ye.Z,{sx:{display:"grid",alignItems:"center",backgroundColor:Te.palette.grey[300],padding:"12px 20px"}},dt.createElement(ye.Z,{sx:{display:"grid",columnGap:"8px",gridTemplateColumns:"40px 1fr 96px"}},dt.createElement(ye.Z,{sx:{".MuiBadge-badge":{border:`1px solid ${Te.palette.common.white}`},".MuiBadge-colorSuccess":{backgroundColor:Te.palette.success.light},".MuiBadge-colorError":{backgroundColor:Te.palette.error.light}}},dt.createElement(Xe.Z,{overlap:"circular",variant:"dot",anchorOrigin:{vertical:"bottom",horizontal:"right"},color:"online"===(null==e?void 0:e.status)?"success":"error"},dt.createElement(et.Z,{sx:{backgroundColor:tt.Z[500]}}))),dt.createElement(ye.Z,null,dt.createElement(Ee.Z,{variant:"body2"},null==e?void 0:e.name),dt.createElement(Ee.Z,{sx:{color:Te.palette.grey[500]},variant:"caption"},"#",null==e?void 0:e.id.slice(-4))),dt.createElement(ye.Z,{sx:{display:"grid",columnGap:"16px",gridTemplateColumns:"repeat(2, 40px)",alignItems:"center"}},dt.createElement(be.Z,{onClick:()=>r(!t)},t?dt.createElement(ot.Z,{sx:{color:Te.palette.grey[700]}}):dt.createElement(it.Z,{sx:{color:Te.palette.grey[700]}})),dt.createElement(be.Z,{onClick:()=>l(!a)},a?dt.createElement(st.Z,{sx:{color:Te.palette.grey[700]}}):dt.createElement(ct.Z,{sx:{color:Te.palette.grey[700]}})))))}));var pt=r(7294);const ut=(0,ee.memo)((()=>{const e=(0,ce.s0)(),{pathname:t}=(0,ce.TH)(),[r,a]=(0,ee.useState)();return(0,ee.useEffect)((()=>{}),[]),pt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"72px 376px 1fr",height:"100%",backgroundColor:Te.palette.common.white}},pt.createElement(ye.Z,{sx:{backgroundColor:Te.palette.grey[200]}},pt.createElement(Qe,null)),pt.createElement(ye.Z,{sx:{display:"grid",gridTemplateRows:"72px max-content 1fr 64px",backgroundColor:Te.palette.grey[400],overflow:"hidden"}},pt.createElement(ye.Z,{sx:{padding:"24px 20px",borderBottom:`1px solid ${Te.palette.grey[600]}`}},pt.createElement(Ee.Z,{variant:"h6"},"Личные сообщения")),pt.createElement(ye.Z,{sx:{padding:"16px"}},pt.createElement(He,{fullWidth:!0,variant:"contained",onClick:()=>e("/friends")},"Друзья")),pt.createElement(ye.Z,{sx:{margin:"28px 4px",overflowY:"scroll","&::-webkit-scrollbar":{width:"4px"},"&::-webkit-scrollbar-track":{backgroundColor:"none"},"&::-webkit-scrollbar-thumb":{backgroundColor:Te.palette.grey[300],border:`1px solid ${Te.palette.grey[500]}`,borderRadius:"8px"}}},pt.createElement(ye.Z,{sx:{display:"grid",rowGap:"12px",padding:"0 4px"}},null==r?void 0:r.map((e=>pt.createElement(lt,{key:e.userData._id,id:e.userData._id,name:e.userData.name,status:e.userData.status,email:e.userData.email,channelId:e.value._id}))))),pt.createElement(mt,null)),pt.createElement(ye.Z,{sx:{display:"grid",gridTemplateRows:"72px 1fr",backgroundColor:Te.palette.grey[500],overflow:"hidden"}},pt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"repeat(2, max-content)",columnGap:"24px",padding:"16px 24px",borderBottom:`1px solid ${Te.palette.grey[400]}`,alignItems:"center"}},pt.createElement(Ee.Z,{variant:"h6"},"Друзья"),pt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"repeat(5, max-content)",columnGap:"8px"}},pt.createElement(He,{variant:t.includes("all-friends")?"contained":"outlined",color:"primary",onClick:()=>e("all-friends")},"Все друзья"),pt.createElement(He,{variant:t.includes("friends-online")?"contained":"outlined",color:"primary",onClick:()=>e("friends-online")},"В сети"),pt.createElement(He,{variant:t.includes("friends-invites")?"contained":"outlined",color:"primary",onClick:()=>e("friends-invites")},"Заявки"),pt.createElement(He,{variant:t.includes("friends-approvals")?"contained":"outlined",color:"primary",onClick:()=>e("friends-approvals")},"Ожидание"),pt.createElement(He,{variant:t.includes("add-to-friends")?"contained":"outlined",color:"success",onClick:()=>e("add-to-friends")},"Добавить в друзья"))),pt.createElement(ce.j3,null)))}));var gt=r(7294);const xt=(0,ee.memo)((()=>{const e=(0,ce.s0)(),t=(0,n.v9)(ae),r=(0,n.I0)(),a=(0,n.v9)(se),[l,o]=(0,ee.useState)(),[i,s]=(0,ee.useState)(""),[c,d]=(0,ee.useState)("");return(0,ee.useEffect)((()=>{at.on("on-channel-join",((e,t)=>{console.log("Сообщение в канале:",e),d(t),t&&r(C({channel:t}))})),c&&r(C({channel:c})),at.on("on-message",(e=>{e&&r(C({channel:e}))}))}),[]),gt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"72px 376px 1fr",height:"100%",backgroundColor:Te.palette.common.white}},gt.createElement(ye.Z,{sx:{backgroundColor:Te.palette.grey[200]}},gt.createElement(Qe,null)),gt.createElement(ye.Z,{sx:{display:"grid",gridTemplateRows:"72px max-content 1fr 64px",backgroundColor:Te.palette.grey[400],overflow:"hidden"}},gt.createElement(ye.Z,{sx:{padding:"24px 20px",borderBottom:`1px solid ${Te.palette.grey[600]}`}},gt.createElement(Ee.Z,{variant:"h6"},"Личные сообщения")),gt.createElement(ye.Z,{sx:{padding:"16px"}},gt.createElement(He,{fullWidth:!0,variant:"contained",onClick:()=>e("/friends/all-friends")},"Друзья")),gt.createElement(ye.Z,{sx:{margin:"28px 4px",overflowY:"scroll","&::-webkit-scrollbar":{width:"4px"},"&::-webkit-scrollbar-track":{backgroundColor:"none"},"&::-webkit-scrollbar-thumb":{backgroundColor:Te.palette.grey[300],border:`1px solid ${Te.palette.grey[500]}`,borderRadius:"8px"}}},gt.createElement(ye.Z,{sx:{display:"grid",rowGap:"12px",padding:"0 4px"}},null==l?void 0:l.map((e=>gt.createElement(lt,{key:e.userData._id,id:e.userData._id,name:e.userData.name,status:e.userData.status,email:e.userData.email,channelId:e.value._id}))))),gt.createElement(mt,null)),gt.createElement(ye.Z,{sx:{display:"grid",gridTemplateRows:"1fr",backgroundColor:Te.palette.grey[500],overflow:"hidden"}},gt.createElement(ye.Z,{sx:{display:"grid",gridTemplateRows:"1fr max-content",rowGap:"16px",margin:"24px 16px",backgroundColor:Te.palette.common.white,borderRadius:"8px",padding:"16px",overflow:"hidden"}},gt.createElement(ye.Z,{sx:{display:"grid",padding:"8px",overflow:"hidden",gridTemplateRows:"max-content 1fr",rowGap:"16px"}},gt.createElement(Ee.Z,null,"Сообщения:"),gt.createElement(ye.Z,{sx:{display:"grid",overflow:"scroll",rowGap:"8px",alignContent:"start",height:"100%"}},null==a?void 0:a.map((e=>gt.createElement(ye.Z,{key:e._id,sx:{padding:"8px",border:"1px solid #000000",display:"grid",borderRadius:"8px"}},gt.createElement(lt,{id:e._id,name:e.author.name,status:e.author.status,email:e.author.email}),gt.createElement(Ee.Z,null,e.text)))))),gt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"1fr max-content",columnGap:"16px"}},gt.createElement(ve,{type:"text",id:"message",name:"message",label:"Сообщение",value:i,onChange:e=>s(e.target.value),placeholder:"Введите текст сообщения"}),gt.createElement(He,{variant:"contained",color:"primary",onClick:()=>{c&&i&&(at.emit("on-message",c,i,null==t?void 0:t.id),s(""))}},"Отправить сообщение"))),gt.createElement(ce.j3,null)))}));var ht=r(7294);const vt=(0,ee.memo)((()=>{const e=(0,ce.s0)(),t=(0,n.I0)(),r=(0,n.v9)(ae),[a,l]=(0,ee.useState)(""),[o,i]=(0,ee.useState)(""),[s,c]=(0,ee.useState)("");return ht.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content 1fr",height:"100%"}},ht.createElement(ye.Z,{sx:{backgroundColor:Te.palette.grey[200]}},ht.createElement(Qe,null)),ht.createElement(ye.Z,null,ht.createElement(Ee.Z,{variant:"h5"},"Ваш email: ",null==r?void 0:r.email),ht.createElement(ve,{type:"email",id:"email",name:"email",label:"Адрес электронной почты",value:a,onChange:e=>l(e.target.value),placeholder:"Введите ваш email",autoComplete:"off",fullWidth:!0}),ht.createElement(Ee.Z,{variant:"h5"},"Ваше имя: ",null==r?void 0:r.name),ht.createElement(ve,{type:"text",id:"name",name:"name",label:"Имя пользователя",value:o,onChange:e=>i(e.target.value),placeholder:"Введите ваше имя",autoComplete:"off",fullWidth:!0}),ht.createElement(Ee.Z,{variant:"h5"},"Ваш пароль:"),ht.createElement(ve,{type:"text",id:"password",name:"password",label:"Пароль",value:s,onChange:e=>c(e.target.value),placeholder:"Введите ваш пароль",autoComplete:"off",fullWidth:!0}),ht.createElement(Ee.Z,{variant:"h5"},"Статус:"),ht.createElement(Ee.Z,{variant:"h5"},"Дата рождения:"),ht.createElement(Ee.Z,{variant:"h5"},"Ваш аватар:"),ht.createElement(Ee.Z,{variant:"h5"},ht.createElement(Ze.Z,{sx:{cursor:"pointer"},underline:"hover",onClick:()=>e(-1)},"Назад"),ht.createElement(He,{variant:"contained",color:"primary",onClick:()=>{t(D()),at.emit("on-disconnect",null==r?void 0:r.id)}},"Выйти из аккаунта"))))}));var yt=r(7294);const Et=(0,ee.memo)((()=>yt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"72px 376px 1fr",height:"100%",backgroundColor:Te.palette.common.white}},yt.createElement(ye.Z,{sx:{backgroundColor:Te.palette.grey[200]}},yt.createElement(Qe,null)),yt.createElement(ye.Z,{sx:{display:"grid",gridTemplateRows:"72px 1fr 64px",backgroundColor:Te.palette.grey[400],overflow:"hidden"}},yt.createElement(ye.Z,{sx:{padding:"24px 20px",borderBottom:`1px solid ${Te.palette.grey[600]}`}},yt.createElement(Ee.Z,{variant:"h6"},"Каналы")),yt.createElement(ye.Z,{sx:{padding:"0 8px",margin:"28px 0",overflow:"scroll"}},yt.createElement(ye.Z,{sx:{display:"grid",rowGap:"12px"}},Array.from(Array(25).keys()).map((e=>yt.createElement(ye.Z,{key:e}))))),yt.createElement(mt,null)),yt.createElement(ye.Z,{sx:{backgroundColor:Te.palette.grey[600]}}))));var ft=r(7294);const bt=(0,ee.memo)((()=>ft.createElement(Et,null)));var Zt=r(8334),Ct=r(1753),wt=r(8416),kt=r(6046),It=r(7003),Tt=r(7294);const St=(0,ee.memo)((({id:e,name:t,status:r})=>{const[a,n]=(0,ee.useState)(null);return Tt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content 1fr",alignItems:"center"}},Tt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content 1fr",columnGap:"8px",alignItems:"center",padding:"8px 12px",borderRadius:"8px",cursor:"pointer",".MuiBadge-badge":{border:`1px solid ${Te.palette.common.white}`},".MuiBadge-colorSuccess":{backgroundColor:Te.palette.success.light},".MuiBadge-colorError":{backgroundColor:Te.palette.error.light}}},Tt.createElement(Xe.Z,{overlap:"circular",variant:"dot",anchorOrigin:{vertical:"bottom",horizontal:"right"},color:"online"===r?"success":"error"},Tt.createElement(et.Z,{sx:{backgroundColor:tt.Z[500]}})),Tt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content"}},Tt.createElement(Ee.Z,{variant:"body2"},t||""),Tt.createElement(Ee.Z,{variant:"caption"},"online"===r?"В сети":"Не в сети"))),Tt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"repeat(3, 24px)",columnGap:"24px",alignItems:"center",justifyContent:"end"}},Tt.createElement(ye.Z,{sx:{cursor:"pointer"}},Tt.createElement(wt.Z,null)),Tt.createElement(ye.Z,{sx:{cursor:"pointer"}},Tt.createElement(kt.Z,null)),Tt.createElement(ye.Z,{sx:{cursor:"pointer"},onClick:e=>n(e.currentTarget)},Tt.createElement(It.Z,null))),Tt.createElement(Zt.Z,{anchorEl:a,open:Boolean(a),onClose:()=>n(null),MenuListProps:{"aria-labelledby":"basic-button"}},Tt.createElement(Ct.Z,{onClick:()=>n(null)},"Написать"),Tt.createElement(Ct.Z,{onClick:()=>n(null)},"Позвонить"),Tt.createElement(Ct.Z,{onClick:()=>{return void 0,null,t=function*(){n(null);const t=yield f.post("/remove-from-friends",{friendId:e});return at.emit("on-remove-from-friends",e),t.data},new Promise(((e,r)=>{var a=e=>{try{l(t.next(e))}catch(e){r(e)}},n=e=>{try{l(t.throw(e))}catch(e){r(e)}},l=t=>t.done?e(t.value):Promise.resolve(t.value).then(a,n);l((t=t.apply(undefined,null)).next())}));var t}},"Удалить из друзей")))}));var Pt=r(7294);const At=(0,ee.memo)((()=>{const e=(0,n.v9)(le);return Pt.createElement(ye.Z,{sx:{padding:"0 8px 0 16px",margin:"16px 8px 16px 0",display:"grid",alignContent:"start",rowGap:"8px",overflowY:"scroll","&::-webkit-scrollbar":{width:"4px"},"&::-webkit-scrollbar-track":{backgroundColor:"none"},"&::-webkit-scrollbar-thumb":{backgroundColor:Te.palette.grey[300],border:`1px solid ${Te.palette.grey[500]}`,borderRadius:"8px"}}},Pt.createElement(ye.Z,{sx:{padding:"8px 12px"}},Pt.createElement(Ee.Z,{variant:"h6"},"Все друзья: ",e.length>0?e.length:0)),Pt.createElement(ye.Z,{sx:{display:"grid",alignContent:"start",rowGap:"8px"}},e.map((e=>Pt.createElement(St,{key:e._id,id:e._id,name:e.name,status:e.status})))))}));var Gt=r(7294);const Rt=(0,ee.memo)((()=>{const e=(0,n.v9)(le);return Gt.createElement(ye.Z,{sx:{padding:"0 8px 0 16px",margin:"16px 8px 16px 0",display:"grid",alignContent:"start",rowGap:"8px",overflowY:"scroll","&::-webkit-scrollbar":{width:"4px"},"&::-webkit-scrollbar-track":{backgroundColor:"none"},"&::-webkit-scrollbar-thumb":{backgroundColor:Te.palette.grey[300],border:`1px solid ${Te.palette.grey[500]}`,borderRadius:"8px"}}},e.map((e=>"online"===e.status?Gt.createElement(St,{key:e._id,id:e._id,name:e.name,status:e.status}):null)))}));var Ot=r(7294),zt=(e,t,r)=>new Promise(((a,n)=>{var l=e=>{try{i(r.next(e))}catch(e){n(e)}},o=e=>{try{i(r.throw(e))}catch(e){n(e)}},i=e=>e.done?a(e.value):Promise.resolve(e.value).then(l,o);i((r=r.apply(e,t)).next())}));const jt=(0,ee.memo)((({id:e,name:t,status:r})=>Ot.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content 1fr",alignItems:"center"}},Ot.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content 1fr",columnGap:"8px",alignItems:"center",padding:"8px 12px",borderRadius:"8px",cursor:"pointer",".MuiBadge-badge":{border:`1px solid ${Te.palette.common.white}`},".MuiBadge-colorSuccess":{backgroundColor:Te.palette.success.light},".MuiBadge-colorError":{backgroundColor:Te.palette.error.light}}},Ot.createElement(Xe.Z,{overlap:"circular",variant:"dot",anchorOrigin:{vertical:"bottom",horizontal:"right"},color:"online"===r?"success":"error"},Ot.createElement(et.Z,{sx:{backgroundColor:tt.Z[500]}})),Ot.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content"}},Ot.createElement(Ee.Z,{variant:"body2"},t||""),Ot.createElement(Ee.Z,{variant:"caption"},"online"===r?"В сети":"Не в сети"))),Ot.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"repeat(2, max-content)",columnGap:"24px",alignItems:"center",justifyContent:"end"}},Ot.createElement(He,{variant:"contained",color:"primary",onClick:()=>zt(void 0,null,(function*(){const t=yield f.post("/add-to-friends",{friendId:e});return at.emit("on-add-to-friends",e),t.data}))},"Добавить"),Ot.createElement(He,{variant:"contained",color:"primary",onClick:()=>zt(void 0,null,(function*(){const t=yield f.post("/remove-invite-to-friends",{friendId:e});return at.emit("on-remove-invite-to-friends",e),t.data}))},"Отклонить")))));var Mt=r(7294);const $t=(0,ee.memo)((()=>{const e=(0,n.v9)(oe);return Mt.createElement(ye.Z,{sx:{padding:"0 8px 0 16px",margin:"16px 8px 16px 0",display:"grid",alignContent:"start",rowGap:"8px",overflowY:"scroll","&::-webkit-scrollbar":{width:"4px"},"&::-webkit-scrollbar-track":{backgroundColor:"none"},"&::-webkit-scrollbar-thumb":{backgroundColor:Te.palette.grey[300],border:`1px solid ${Te.palette.grey[500]}`,borderRadius:"8px"}}},e.map((e=>Mt.createElement(jt,{key:e._id,id:e._id,name:e.name,status:e.status}))))}));var Bt=r(7294);const Wt=(0,ee.memo)((({id:e,name:t,status:r})=>Bt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content 1fr",alignItems:"center"}},Bt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content 1fr",columnGap:"8px",alignItems:"center",padding:"8px 12px",borderRadius:"8px",cursor:"pointer",".MuiBadge-badge":{border:`1px solid ${Te.palette.common.white}`},".MuiBadge-colorSuccess":{backgroundColor:Te.palette.success.light},".MuiBadge-colorError":{backgroundColor:Te.palette.error.light}}},Bt.createElement(Xe.Z,{overlap:"circular",variant:"dot",anchorOrigin:{vertical:"bottom",horizontal:"right"},color:"online"===r?"success":"error"},Bt.createElement(et.Z,{sx:{backgroundColor:tt.Z[500]}})),Bt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content"}},Bt.createElement(Ee.Z,{variant:"body2"},t||""),Bt.createElement(Ee.Z,{variant:"caption"},"online"===r?"В сети":"Не в сети"))),Bt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"repeat(2, max-content)",columnGap:"24px",alignItems:"center",justifyContent:"end"}},Bt.createElement(Ee.Z,{variant:"body1"},"Ожидает добавления в друзья"),Bt.createElement(He,{variant:"contained",color:"primary",onClick:()=>{return void 0,null,t=function*(){const t=yield f.post("/remove-invite-to-friends",{friendId:e});return at.emit("on-remove-invite-to-friends",e),t.data},new Promise(((e,r)=>{var a=e=>{try{l(t.next(e))}catch(e){r(e)}},n=e=>{try{l(t.throw(e))}catch(e){r(e)}},l=t=>t.done?e(t.value):Promise.resolve(t.value).then(a,n);l((t=t.apply(undefined,null)).next())}));var t}},"Отклонить")))));var _t=r(7294);const Dt=(0,ee.memo)((()=>{const e=(0,n.v9)(ie);return _t.createElement(ye.Z,{sx:{padding:"0 8px 0 16px",margin:"16px 8px 16px 0",display:"grid",alignContent:"start",rowGap:"8px",overflowY:"scroll","&::-webkit-scrollbar":{width:"4px"},"&::-webkit-scrollbar-track":{backgroundColor:"none"},"&::-webkit-scrollbar-thumb":{backgroundColor:Te.palette.grey[300],border:`1px solid ${Te.palette.grey[500]}`,borderRadius:"8px"}}},e.map((e=>_t.createElement(Wt,{key:e._id,id:e._id,name:e.name,status:e.status}))))}));var Lt=r(7294);const Ut=(0,ee.memo)((({id:e,name:t,status:r,setSearchValue:a})=>Lt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content 1fr",alignItems:"center"}},Lt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content 1fr",columnGap:"8px",alignItems:"center",padding:"8px 12px",borderRadius:"8px",cursor:"pointer",".MuiBadge-badge":{border:`1px solid ${Te.palette.common.white}`},".MuiBadge-colorSuccess":{backgroundColor:Te.palette.success.light},".MuiBadge-colorError":{backgroundColor:Te.palette.error.light}}},Lt.createElement(Xe.Z,{overlap:"circular",variant:"dot",anchorOrigin:{vertical:"bottom",horizontal:"right"},color:"online"===r?"success":"error"},Lt.createElement(et.Z,{sx:{backgroundColor:tt.Z[500]}})),Lt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"max-content"}},Lt.createElement(Ee.Z,{variant:"body2"},t||""),Lt.createElement(Ee.Z,{variant:"caption"},"online"===r?"В сети":"Не в сети"))),Lt.createElement(ye.Z,{sx:{display:"grid",gridTemplateColumns:"repeat(1, max-content)",columnGap:"24px",alignItems:"center",justifyContent:"end"}},Lt.createElement(He,{variant:"contained",color:"primary",onClick:()=>{return void 0,null,t=function*(){a("");const t=yield f.post("/add-invite-to-friends",{friendId:e});return at.emit("on-add-invite-to-friends",e),t.data},new Promise(((e,r)=>{var a=e=>{try{l(t.next(e))}catch(e){r(e)}},n=e=>{try{l(t.throw(e))}catch(e){r(e)}},l=t=>t.done?e(t.value):Promise.resolve(t.value).then(a,n);l((t=t.apply(undefined,null)).next())}));var t}},"Добавить в друзья")))));var qt=r(7294);const Ht=(0,ee.memo)((()=>{const e=(0,n.I0)(),t=(0,n.v9)(ne),[r,a]=(0,ee.useState)("");return(0,ee.useEffect)((()=>{r&&e(U({searchValue:r}))}),[r]),qt.createElement(ye.Z,{sx:{padding:"0 8px 0 16px",margin:"16px 8px 16px 0"}},qt.createElement(ve,{fullWidth:!0,size:"small",placeholder:"Поиск по друзьям",value:r,onChange:e=>a(e.target.value)}),qt.createElement(ye.Z,{sx:{padding:"0 8px 0 16px",margin:"16px 8px 16px 0",display:"grid",alignContent:"start",rowGap:"8px",overflowY:"scroll","&::-webkit-scrollbar":{width:"4px"},"&::-webkit-scrollbar-track":{backgroundColor:"none"},"&::-webkit-scrollbar-thumb":{backgroundColor:Te.palette.grey[300],border:`1px solid ${Te.palette.grey[500]}`,borderRadius:"8px"}}},null==t?void 0:t.map((e=>qt.createElement(Ut,{key:e.id,id:e.id,name:e.name,status:e.status,setSearchValue:a})))))}));var Yt=r(7294);const Ft=(0,ee.memo)((()=>Yt.createElement(ce.Z5,null,Yt.createElement(ce.AW,{path:"friends",element:Yt.createElement(ut,null)},Yt.createElement(ce.AW,{path:"all-friends",element:Yt.createElement(At,null)}),Yt.createElement(ce.AW,{path:"friends-online",element:Yt.createElement(Rt,null)}),Yt.createElement(ce.AW,{path:"friends-invites",element:Yt.createElement($t,null)}),Yt.createElement(ce.AW,{path:"friends-approvals",element:Yt.createElement(Dt,null)}),Yt.createElement(ce.AW,{path:"add-to-friends",element:Yt.createElement(Ht,null)})),Yt.createElement(ce.AW,{path:"messages",element:Yt.createElement(xt,null)}),Yt.createElement(ce.AW,{path:"profile",element:Yt.createElement(vt,null)}),Yt.createElement(ce.AW,{path:"channels",element:Yt.createElement(bt,null)}),Yt.createElement(ce.AW,{path:"*",element:Yt.createElement(ce.Fg,{to:"friends/all-friends"})}))));var Nt=r(7294);const Vt=(0,ee.memo)((({isAuthorizated:e})=>e?Nt.createElement(Ft,null):Nt.createElement($e,null)));var Jt=r(7294);const Kt=()=>{const e=(0,n.I0)(),t=(0,n.v9)(te),r=(0,n.v9)(ae);return(0,ee.useEffect)((()=>{localStorage.getItem("token")&&e(W())}),[]),(0,ee.useEffect)((()=>{t&&(e(L()),at.on("on-connect",(()=>{e(L())})))}),[t]),(0,ee.useEffect)((()=>{(null==r?void 0:r.id)&&at.emit("on-connect",r.id)}),[null==r?void 0:r.id]),Jt.createElement(Vt,{isAuthorizated:t})};var Qt=r(3362),Xt=r(7294);const er=()=>(i.hi`
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }

    html {
      box-sizing: border-box;
    }

    html,
    body,
    .root {
      height: 100%;
    }

    body {
      margin: 0;
      background: radial-gradient(105.05% 99.28% at 50% 29.72%, #8c9eff 0%, #536dfe 42.9%, #536dfe 61.7%, #3d5afe 84.71%, #304ffe 100%);
      background-repeat: no-repeat;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      box-shadow: 0 0 0 30px #ffffff inset;
    }
  `,(0,Qt.D)(),Xt.createElement(n.zt,{store:X},Xt.createElement(o.Z,{theme:Te},Xt.createElement(l.UT,null,Xt.createElement(Kt,null),Xt.createElement(q.Ix,{theme:"light"})))));(0,a.render)(Xt.createElement(er,null),document.querySelector(".root"))}},r={};function a(e){var n=r[e];if(void 0!==n)return n.exports;var l=r[e]={exports:{}};return t[e](l,l.exports,a),l.exports}a.m=t,e=[],a.O=(t,r,n,l)=>{if(!r){var o=1/0;for(d=0;d<e.length;d++){for(var[r,n,l]=e[d],i=!0,s=0;s<r.length;s++)(!1&l||o>=l)&&Object.keys(a.O).every((e=>a.O[e](r[s])))?r.splice(s--,1):(i=!1,l<o&&(o=l));if(i){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[r,n,l]},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;a.g.importScripts&&(e=a.g.location+"");var t=a.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=e+"../"})(),(()=>{var e={179:0};a.O.j=t=>0===e[t];var t=(t,r)=>{var n,l,[o,i,s]=r,c=0;if(o.some((t=>0!==e[t]))){for(n in i)a.o(i,n)&&(a.m[n]=i[n]);if(s)var d=s(a)}for(t&&t(r);c<o.length;c++)l=o[c],a.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return a.O(d)},r=globalThis.webpackChunkvideo_calls=globalThis.webpackChunkvideo_calls||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=a.O(void 0,[628],(()=>a(5134)));n=a.O(n)})();
//# sourceMappingURL=main.996c478d83c6439d0127.js.map