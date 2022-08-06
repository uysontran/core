"use strict";(self.webpackChunkms_ui=self.webpackChunkms_ui||[]).push([[3499,9468,5097,9789,1763,9762,8118,4923,5394,9892,7089,1633,2819,3551],{5097:function(e,t,n){n.r(t),n.d(t,{default:function(){return s}});var a=n(885),i=n(2791),o=n(9789),r=n(8820),l=n(184);function s(e){var t=e.children,n=e.interval,s=e.auto,u=void 0!==s&&s,c=e.Index,d=e.toolbars,f=void 0===d||d,m=(0,i.useState)(0),v=(0,a.Z)(m,2),h=v[0],x=v[1],_=(0,i.useState)(u),j=(0,a.Z)(_,2),p=j[0],b=j[1],C=(0,i.useState)(0),y=(0,a.Z)(C,2),N=y[0],g=y[1],k=(0,i.useState)(0),Z=(0,a.Z)(k,2),S=Z[0],M=Z[1],w=(0,i.useRef)(!1);return(0,i.useEffect)((function(){if(p){var e=setTimeout((function(){x((h+1)%t.length)}),n);return function(){clearTimeout(e)}}}),[u,t.length,h,n,p]),(0,i.useEffect)((function(){if(w){var e=w.current.getBoundingClientRect(),t=e.height,n=e.width;M(t),g(n)}}),[]),(0,i.useEffect)((function(){x(c)}),[c]),(0,l.jsxs)("div",{className:o.default.container,ref:w,children:[f&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:o.default["tool-bar"],style:{justifyContent:"center",bottom:32,width:N},children:t.map((function(e,t){return(0,l.jsx)("svg",{height:"20",width:"20",className:o.default["icon-2"],onClick:function(){return function(e){x(e)}(t)},children:(0,l.jsx)("circle",{cx:"10",cy:"10",r:h===t?"8":"5",fill:"black",stroke:h===t?"white":"none",strokeWidth:"3px"})},t)}))}),(0,l.jsxs)("div",{className:o.default["tool-bar"],style:{bottom:8,width:N},children:[(0,l.jsx)(r.IaS,{onClick:function(){x((h+t.length-1)%t.length)},size:25,className:o.default.icon}),(0,l.jsx)(r._H$,{onClick:function(){b(!p)},size:25,className:o.default.icon}),(0,l.jsx)(r.evb,{onClick:function(){x((h+t.length+1)%t.length)},size:25,className:o.default.icon})]})]}),!1!==w.current&&t.map((function(e,t){return(0,l.jsx)("div",{className:o.default.children,style:{position:"relative",right:N*h,height:S,minWidth:N,transition:"1s"},children:e},t)}))]})}},1763:function(e,t,n){n.r(t),n.d(t,{default:function(){return l}});var a=n(7467),i=n(9762),o=n(8182),r=n(184);function l(e){var t=e.children,n=e.onConfirm,l=void 0===n?function(){}:n,s=e.trigger,u=e.cancel,c=void 0===u?"Cancel":u,d=e.confirm,f=void 0===d?"Confirm":d;return(0,r.jsx)(a.Z,{trigger:s,modal:!0,contentStyle:{borderRadius:"20px",width:"max-content"},children:function(e){return(0,r.jsxs)("div",{className:i.default.PopUp,children:[(0,r.jsx)("div",{className:i.default.content,children:t}),(0,r.jsxs)("div",{className:i.default.toolBar,children:[(0,r.jsx)("div",{className:(0,o.Z)([i.default.cancel,i.default.button]),onClick:function(){return e()},children:c}),(0,r.jsx)("div",{className:(0,o.Z)([i.default.confirm,i.default.button]),onClick:function(){l(),e()},children:f})]})]})}})}},9468:function(e,t,n){n.r(t),n.d(t,{Carousel:function(){return i.default},ConfirmBox:function(){return a.default}});var a=n(1763),i=n(5097)},3694:function(e,t,n){n.r(t),n.d(t,{default:function(){return s}});var a=n(885),i=n(2791),o=n(8118),r=n(5898),l=n(184);function s(){var e=(0,i.useState)({}),t=(0,a.Z)(e,2),n=t[0],s=t[1];return(0,l.jsx)("div",{className:o.default.container,children:(0,l.jsx)("div",{className:o.default.Carousel,children:(0,l.jsx)(r.default,{submitData:n,setSubmitData:s})})})}},4923:function(e,t,n){n.r(t),n.d(t,{default:function(){return r}});var a=n(7467),i=n(5394),o=n(184);function r(e){var t=e.trigger,n=e.data,r=e.head;return(0,o.jsx)(a.Z,{trigger:t,modal:!0,contentStyle:{backgroundColor:"#eff4f9",borderRadius:"20px"},children:function(e){return(0,o.jsxs)("div",{className:i.default.container,children:[(0,o.jsx)("div",{className:i.default.head,children:r}),(0,o.jsx)("div",{className:i.default.content,children:Object.keys(n).filter((function(e){return"id"!==e})).map((function(e,t){return(0,o.jsxs)("div",{children:[(0,o.jsx)("span",{children:e}),(0,o.jsx)("span",{children:n[e]})]},t+"tablebox")}))}),(0,o.jsx)("div",{onClick:function(){return e()},className:i.default.footer,children:"Close"})]})}})}},7250:function(e,t,n){n.r(t),n.d(t,{default:function(){return x}});var a=n(885),i=n(2791),o=n(9126),r=n(8820),l=n(7009),s=n(9468),u=n(3449),c=n(4717),d=n(9892),f=n(4923),m=n(2803),v=n(3504),h=n(184);function x(){var e=(0,i.useState)([]),t=(0,a.Z)(e,2),n=t[0],x=t[1],_=(0,c.useDevicesInfo)().data,j=void 0===_?[]:_,p=(0,c.useModelsInfo)().data,b=j.map((function(e){return function(e){return{name:{value:(0,h.jsx)("div",{children:e.name}),key:e.name},modelName:{value:(0,h.jsx)("div",{onClick:function(){var t=(null!==p&&void 0!==p&&p.length?p:[]).find((function(t){return t.name===e.Model.name}));M(t),g(!0)},children:e.Model.name}),key:e.Model.name},isProvision:{value:(0,h.jsx)("div",{children:e.isProvision?(0,h.jsxs)("div",{"data-tip":"This device has provisioned","data-effect":"solid",children:[(0,h.jsx)(o.DgJ,{size:25,color:"#00ad55"}),(0,h.jsx)(l.Z,{})]}):(0,h.jsxs)("div",{"data-tip":"This device has not provisioned",children:[(0,h.jsx)(o.$az,{size:25,color:"#f30d0d"}),(0,h.jsx)(l.Z,{})]})}),key:e.isProvision?1:0},upProtocol:{value:(0,h.jsx)(f.default,{trigger:(0,h.jsx)("div",{style:{cursor:"pointer"},children:(0,h.jsx)(o.Hfo,{})}),data:e.upProtocol,head:"".concat(e.name," up protocol")}),key:e.name},downProtocol:{value:(0,h.jsx)(f.default,{trigger:(0,h.jsx)("div",{style:{cursor:"pointer"},children:(0,h.jsx)(o.Hfo,{})}),data:e.downProtocol,head:"".concat(e.name," down protocol")}),key:e.name},provision:{value:(0,h.jsx)(s.ConfirmBox,{onConfirm:function(){w(e.id)},trigger:(0,h.jsxs)("div",{style:{cursor:"pointer"},"data-tip":"Provision","data-effect":"solid",children:[(0,h.jsx)(l.Z,{}),(0,h.jsx)(o.a4S,{size:25})]}),children:"Are you sure about provision?"}),key:e.name},delete:{value:(0,h.jsx)(s.ConfirmBox,{onConfirm:function(){D({id:e.id})},trigger:(0,h.jsxs)("div",{style:{cursor:"pointer"},"data-tip":"Upload Delete Devices","data-effect":"solid","data-place":"top","data-for":"persistence",children:[(0,h.jsx)(l.Z,{id:"delete"}),(0,h.jsx)(r.VPh,{size:25})]}),children:"Are you sure about delete?"})}}}(e)})),C=(0,i.useState)(!1),y=(0,a.Z)(C,2),N=y[0],g=y[1],k=(0,i.useState)(null),Z=(0,a.Z)(k,2),S=Z[0],M=Z[1],w=(0,c.useProvision)({onSuccess:function(){}}).mutate,D=(0,c.useDeleteDevice)({onSuccess:function(){}}).mutate;return(0,h.jsxs)("div",{className:d.default.container,children:[(0,h.jsx)("div",{className:d.default.buttonHolder,children:(0,h.jsx)(v.rU,{to:"new",children:(0,h.jsx)("div",{className:d.default.createButton,children:"+ Create"})})}),(0,h.jsxs)("div",{className:d.default.tableContainer,children:[(0,h.jsx)(u.default,{head:[{id:"name",numberic:!1,label:"Name"},{id:"isProvision",numberic:!0,label:"Provision Status"},{id:"upProtocol",numberic:!1,label:"Up Protocol"},{id:"downProtocol",numberic:!1,label:"Down Protocol"},{id:"modelName",numberic:!1,label:"Model Name"},{id:"provision",numberic:!1,label:"",isSort:!1},{id:"delete",numberic:!1,label:"",isSort:!1}],select:[n,x],data:b,classes:{head:{name:d.default.head,default:!0}}}),null!==S&&(0,h.jsx)(m.default,{data:S,open:N,onClose:function(){return g(!1)}})]})]})}},2851:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var a=n(2982),i=n(1413),o=n(4942),r=n(7467),l=n(7089),s=n(184);function u(e){var t=e.trigger,n=(e.service,e.open),u=void 0!==n&&n,c=e.onClose,d=e.setChannels,f=e.channelAttrs;return(0,s.jsx)(r.Z,{trigger:t,modal:!0,contentStyle:{backgroundColor:"white"},open:u,onClose:c,children:function(e){return(0,s.jsxs)("form",{className:l.default.container,onSubmit:function(t){t.preventDefault();var n=f.map((function(e,n){return(0,o.Z)({},e.key,t.target[n].value)})).reduce((function(e,t){return(0,i.Z)((0,i.Z)({},e),t)}),{});d((function(e){return[].concat((0,a.Z)(e),[n])})),e()},children:[(0,s.jsx)("div",{className:l.default.header,children:"Create new channel"}),f.map((function(e){return"ENUM"===e.type?(0,s.jsxs)("div",{className:l.default.row,children:[(0,s.jsx)("span",{children:e.key}),(0,s.jsx)("select",{name:e.key,defaultValue:e.defaultValue,children:JSON.parse(e.values).map((function(e){return(0,s.jsx)("option",{value:e,children:e},e)}))})]}):(0,s.jsxs)("div",{className:l.default.row,children:[(0,s.jsx)("span",{children:e.key}),(0,s.jsx)("input",{type:"text",name:e.key,defaultValue:e.defaultValue})]})})),(0,s.jsx)("div",{className:l.default.footer,children:(0,s.jsx)("input",{type:"submit",value:"Create",className:l.default.buttonHolder})})]})}})}},2288:function(e,t,n){n.r(t),n.d(t,{default:function(){return x}});var a=n(4942),i=n(1413),o=n(2982),r=n(885),l=n(1633),s=n(2791),u=n(4717),c=n(3449),d=n(2851),f=n(8820),m=n(9126),v=n(6871),h=n(184);function x(){var e,t=(0,u.useServiceInfo)(),n=t.data,x=void 0===n?[]:n,_=t.isLoading,j=x.filter((function(e){return"downService"===e.type})),p=j.map((function(e){return e.name})),b=(0,s.useState)([]),C=(0,r.Z)(b,2),y=C[0],N=C[1],g=(0,s.useState)([]),k=(0,r.Z)(g,2),Z=k[0],S=k[1],M=(0,u.useToast)("success"),w=(0,v.s0)(),D=(0,u.useMutationModel)({onSuccess:function(){M("Success"),w(-1)}}).mutate,B=[{key:"name"},{key:"ReadWrite",type:"ENUM",values:JSON.stringify(["R","W","RW"])},{key:"Scale",defaultValue:1},{key:"Offset",defaultValue:0},{key:"Precision"}].concat((0,o.Z)((null===y||void 0===y||null===(e=y.ServiceMetaDatas)||void 0===e?void 0:e.filter((function(e){return"ModelChannel"===e.kind})))||[])),P=[].concat((0,o.Z)(B.map((function(e){return{id:e.key,numberic:!1,label:e.key}}))),[{id:"delete",numberic:!1,isSort:!1,label:""}]),H=(0,s.useState)([]),F=(0,r.Z)(H,2),T=F[0],R=F[1],A=T.map((function(e,t){return(0,i.Z)((0,i.Z)({},Object.keys(e).reduce((function(t,n){return(0,i.Z)((0,i.Z)({},t),{},(0,a.Z)({},n,{value:e[n],key:e[n]}))}),{})),{},{delete:{value:(0,h.jsx)(f.VPh,{onClick:function(){R(T.filter((function(e,n){return n!==t})))}}),key:"delete"}})})),U=(0,s.useState)(!1),O=(0,r.Z)(U,2),W=O[0],z=O[1],V=(0,s.useState)({name:"",type:"",manufacture:"",ProtocolType:p[0]}),I=(0,r.Z)(V,2),E=I[0],J=I[1];return(0,s.useEffect)((function(){N(j[0])}),[x]),(0,h.jsxs)("div",{className:l.default.container,children:[(0,h.jsx)("form",{onSubmit:function(e){e.preventDefault()},onChange:function(e){J((0,i.Z)((0,i.Z)({},E),{},(0,a.Z)({},e.target.name,e.target.value)))},children:(0,h.jsxs)("div",{className:l.default.inputFields,children:[(0,h.jsxs)("div",{className:l.default.inputRow,children:[(0,h.jsxs)("div",{className:l.default.inputField,children:[(0,h.jsx)("span",{children:"Name"}),(0,h.jsx)("input",{type:"text",name:"name"})]}),(0,h.jsxs)("div",{className:l.default.inputField,children:[(0,h.jsx)("span",{children:"Type"}),(0,h.jsx)("input",{type:"text",name:"type"})]})]}),(0,h.jsxs)("div",{className:l.default.inputRow,children:[(0,h.jsxs)("div",{className:l.default.inputField,children:[(0,h.jsx)("span",{children:"Manufacture"}),(0,h.jsx)("input",{type:"text",name:"manufacture"})]}),(0,h.jsxs)("div",{className:l.default.inputField,children:[(0,h.jsx)("span",{children:"Protcol Type: "}),(0,h.jsx)("select",{value:null===y||void 0===y?void 0:y.name,onChange:function(e){var t=e.target.value;N(j.find((function(e){return e.name===t})))},name:"ProtcolType",children:p.map((function(e,t){return(0,h.jsx)("option",{value:e,children:e},e+t)}))})]})]})]})}),(0,h.jsxs)("div",{className:l.default.tableContainer,children:[!_&&(0,h.jsx)(c.default,{head:P,data:A,select:[Z,S],footer:[(0,h.jsx)("td",{colSpan:P.length,className:l.default.tfooter,onClick:function(){z(!0)},align:"center",children:(0,h.jsx)(m.Dwu,{})},"1")]}),(0,h.jsx)("div",{className:l.default.buttonHolder,children:(0,h.jsx)("button",{className:l.default.createButton,onClick:function(){D((0,i.Z)((0,i.Z)({},E),{},{channels:T}))},children:"Create"})})]}),(0,h.jsx)(d.default,{open:W,onClose:function(){return z(!1)},setChannels:R,channelAttrs:B})]})}},73:function(e,t,n){n.r(t),n.d(t,{default:function(){return d}});var a=n(885),i=n(3449),o=n(2791),r=n(2819),l=n(4717),s=n(2803),u=n(3504),c=n(184);function d(){var e=(0,l.useModelsInfo)().data,t=void 0===e?[]:e,n=(0,o.useState)([]),d=(0,a.Z)(n,2),f=d[0],m=d[1],v=(0,o.useState)(!1),h=(0,a.Z)(v,2),x=h[0],_=h[1],j=(0,o.useState)(null),p=(0,a.Z)(j,2),b=p[0],C=p[1],y=t.map((function(e){return function(e){return{onClick:function(){_(!0),C(e)},name:{value:(0,c.jsx)("div",{children:e.name}),key:e.name},manufacture:{value:(0,c.jsx)("div",{children:e.manufacture}),key:e.manufacture},type:{value:(0,c.jsx)("div",{children:e.type}),key:e.type}}}(e)}));return(0,c.jsxs)("div",{className:r.default.container,children:[(0,c.jsx)("div",{className:r.default.buttonHolder,children:(0,c.jsx)(u.rU,{to:"new",children:(0,c.jsx)("div",{className:r.default.createButton,children:"+ Create"})})}),(0,c.jsxs)("div",{className:r.default.tableContainer,children:[(0,c.jsx)(i.default,{head:[{id:"name",numberic:!1,label:"Name"},{id:"manufacture",numberic:!0,label:"Manufacture"},{id:"type",numberic:!1,label:"Type"}],select:[f,m],data:y,classes:{head:{name:r.default.head,default:!0}}}),null!==b&&(0,c.jsx)(s.default,{data:b,open:x,onClose:function(){return _(!1)}})]})]})}},9591:function(e,t,n){n.r(t),n.d(t,{default:function(){return d}});var a=n(6871),i=n(3504),o=n(7250),r=n(73),l=n(3694),s=n(2288),u=n(3551),c=n(184);function d(){var e=(0,a.TH)(),t=function(e){switch(e.pathname.split("/")[2]){case"Devices":case"devices":return"Devices";case"models":case"Models":return"Models";default:return""}};return(0,c.jsxs)("div",{className:u.default.container,children:[(0,c.jsx)("h1",{children:"Devices Management"}),(0,c.jsxs)("div",{className:u.default.tabsName,children:[(0,c.jsx)(i.rU,{to:"devices",style:{color:"Devices"===t(e)?"#8139ff":"#707683",borderBottom:"Devices"===t(e)?"3px solid #8139ff":"none"},children:"Devices"}),(0,c.jsx)(i.rU,{to:"models",style:{color:"Models"===t(e)?"#8139ff":"#707683",borderBottom:"Models"===t(e)?"3px solid #8139ff":"none"},children:"Models"})]}),(0,c.jsxs)(a.Z5,{children:[(0,c.jsx)(a.AW,{index:!0,element:(0,c.jsx)(a.Fg,{to:"devices"})}),(0,c.jsx)(a.AW,{element:(0,c.jsx)(o.default,{}),path:"/devices"}),(0,c.jsx)(a.AW,{element:(0,c.jsx)(l.default,{}),path:"/devices/new"}),(0,c.jsx)(a.AW,{element:(0,c.jsx)(r.default,{}),path:"/models"}),(0,c.jsx)(a.AW,{element:(0,c.jsx)(s.default,{}),path:"/models/new"})]})]})}},9789:function(e,t,n){n.r(t),t.default={container:"Carousel_container__iZ7C+","tool-bar":"Carousel_tool-bar__b61dY",icon:"Carousel_icon__OS8V2","icon-2":"Carousel_icon-2__KvHtr"}},9762:function(e,t,n){n.r(t),t.default={PopUp:"ConfirmBox_PopUp__OADRt",content:"ConfirmBox_content__Bn+3D",toolBar:"ConfirmBox_toolBar__kLqOm",button:"ConfirmBox_button__uXkxw",cancel:"ConfirmBox_cancel__u+lgb",confirm:"ConfirmBox_confirm__m3DaT"}},8118:function(e,t,n){n.r(t),t.default={container:"Create_container__-eLbu",Carousel:"Create_Carousel__4XdDj"}},5394:function(e,t,n){n.r(t),t.default={container:"TableBox_container__gl5Kv",head:"TableBox_head__6gpbU",content:"TableBox_content__HUjhK",footer:"TableBox_footer__-gdGI"}},9892:function(e,t,n){n.r(t),t.default={container:"Devices_container__oxIpN",tableContainer:"Devices_tableContainer__XTHgc",buttonHolder:"Devices_buttonHolder__cXbjW",createButton:"Devices_createButton__qtwmo"}},7089:function(e,t,n){n.r(t),t.default={container:"CreateChannel_container__ghEYA",header:"CreateChannel_header__5jmfO",row:"CreateChannel_row__GFzr4",buttonHolder:"CreateChannel_buttonHolder__6aHyt",footer:"CreateChannel_footer__dJF4f"}},1633:function(e,t,n){n.r(t),t.default={container:"Create_container__slGu8",inputFields:"Create_inputFields__dXLeu",inputRow:"Create_inputRow__jDpCr",inputField:"Create_inputField__O0i+y",tfooter:"Create_tfooter__6SaMq",buttonHolder:"Create_buttonHolder__MJ49i",createButton:"Create_createButton__MDPxQ",tableContainer:"Create_tableContainer__ZuNta",next:"Create_next__NzRsY"}},2819:function(e,t,n){n.r(t),t.default={container:"Models_container__U5MAK",tableContainer:"Models_tableContainer__yLtlf",buttonHolder:"Models_buttonHolder__nkvOh",createButton:"Models_createButton__i+tMi",inputFields:"Models_inputFields__Avpgf",inputRow:"Models_inputRow__dyZyD",inputField:"Models_inputField__Amg70"}},3551:function(e,t,n){n.r(t),t.default={container:"DevicesManagement_container__tQPBm",tabsName:"DevicesManagement_tabsName__r1QSf",tabsContainer:"DevicesManagement_tabsContainer__5C1p6"}}}]);
//# sourceMappingURL=3499.2f3fc8e7.chunk.js.map