"use strict";(self.webpackChunkms_ui=self.webpackChunkms_ui||[]).push([[9975,4717,8641,5139,6875,2039],{8641:function(e,n,t){t.r(n),t.d(n,{default:function(){return u}});var r=t(6960);function u(e){return e?function(n){r.Am[e](n,{position:"bottom-center",autoClose:2e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})}:function(e){(0,r.Am)(e,{position:"bottom-center",autoClose:2e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})}}},5139:function(e,n,t){t.r(n),t.d(n,{useDeleteDevice:function(){return m},useMutateDevice:function(){return y},useMutateProtocol:function(){return p},useMutateTask:function(){return k},useProtcolConfig:function(){return d},useProvision:function(){return l},useServiceInfo:function(){return f},useTask:function(){return v}});var r=t(5861),u=t(7757),o=t.n(u),i=t(4569),c=t.n(i),s=t(1933),a=t(8641);function f(){return(0,s.useQuery)("service-info",(0,r.Z)(o().mark((function e(){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c().get("/microservices").then((function(e){return e.data}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)}))),{staleTime:6e4})}function l(e){var n=e.onSuccess,t=void 0===n?function(){}:n,r=(0,s.useQueryClient)(),u=(0,a.default)("error");return(0,s.useMutation)((function(e){return c().get("/devices/provision",{params:{id:e}})}),{onSuccess:function(){t(),r.invalidateQueries("devices-info")},onError:function(e,n,t){var r;u(null===(r=e.response)||void 0===r?void 0:r.data)}})}function d(e){return(0,s.useQuery)("protocol?".concat(e),(0,r.Z)(o().mark((function n(){var t;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!e){n.next=5;break}return n.next=3,c().get("/protocol",{params:{id:e}}).then((function(e){return e.data}));case 3:return t=n.sent,n.abrupt("return",t);case 5:return n.abrupt("return",0);case 6:case"end":return n.stop()}}),n)}))),{staleTime:100})}function v(){return(0,s.useQuery)("task",(0,r.Z)(o().mark((function e(){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c().get("/tasks").then((function(e){return e.data}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)}))),{staleTime:6e4})}function p(e){var n=e.onSuccess,t=void 0===n?function(){}:n,r=(0,s.useQueryClient)(),u=(0,a.default)("error");return(0,s.useMutation)((function(e){return c().post("/protocol",e)}),{onSuccess:function(){t(),r.invalidateQueries("service-info")},onError:function(e,n,t){var r;u(null===(r=e.response)||void 0===r?void 0:r.data)}})}function m(e){var n=e.onSuccess,t=void 0===n?function(){}:n,r=(0,s.useQueryClient)(),u=(0,a.default)("error");return(0,s.useMutation)((function(e){return c().delete("/devices",{params:e})}),{onSuccess:function(){t(),r.invalidateQueries("devices-info")},onError:function(e,n,t){var r;u(null===(r=e.response)||void 0===r?void 0:r.data)}})}function y(e){var n=e.onSuccess,t=void 0===n?function(){}:n,r=(0,s.useQueryClient)(),u=(0,a.default)("error");return(0,s.useMutation)((function(e){return c().post("/devices",e)}),{onSuccess:function(){t(),r.invalidateQueries("devices-info")},onError:function(e,n,t){var r;u(null===(r=e.response)||void 0===r?void 0:r.data)}})}function k(e){var n=e.onSuccess,t=void 0===n?function(){}:n,r=(0,s.useQueryClient)(),u=(0,a.default)("error");return(0,s.useMutation)((function(e){return c().post("/tasks",e)}),{onSuccess:function(){t(),r.invalidateQueries("task")},onError:function(e,n,t){var r;u(null===(r=e.response)||void 0===r?void 0:r.data)}})}},4717:function(e,n,t){t.r(n),t.d(n,{useDeleteDevice:function(){return f.useDeleteDevice},useDevicesInfo:function(){return d},useModelsInfo:function(){return v},useMutateDevice:function(){return f.useMutateDevice},useMutateProtocol:function(){return f.useMutateProtocol},useMutateTask:function(){return f.useMutateTask},useMutationModel:function(){return p},useProtcolConfig:function(){return f.useProtcolConfig},useProvision:function(){return f.useProvision},useServiceInfo:function(){return f.useServiceInfo},useSocket:function(){return l.useSocket},useTask:function(){return f.useTask},useToast:function(){return m}});var r=t(5861),u=t(7757),o=t.n(u),i=t(1933),c=t(4569),s=t.n(c),a=t(8641),f=t(5139),l=t(6875);function d(){return(0,i.useQuery)("devices-info",(0,r.Z)(o().mark((function e(){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s().get("/devices/info").then((function(e){return e.data}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)}))),{staleTime:6e4})}function v(){return(0,i.useQuery)("models-info",(0,r.Z)(o().mark((function e(){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s().get("/models/info").then((function(e){return e.data}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)}))),{staleTime:6e4})}function p(e){var n=e.onSuccess,t=(0,i.useQueryClient)(),r=(0,a.default)("error");return(0,i.useMutation)((function(e){return s().post("/models",e)}),{onSuccess:function(){n(),t.invalidateQueries("models-info")},onError:function(e,n,t){var u;r(null===(u=e.response)||void 0===u?void 0:u.data)}})}function m(e){return(0,a.default)(e)}},6875:function(e,n,t){t.r(n),t.d(n,{useSocket:function(){return i}});var r=t(885),u=t(2791),o=t(6932);function i(e){var n=(0,u.useRef)((0,o.ZP)()),t=(0,u.useState)([]),i=(0,r.Z)(t,2),c=i[0],s=i[1];return(0,u.useEffect)((function(){return console.log(""),n.current.on("connect",(function(){n.current.emit(e,!0),n.current.on(e,(function(e){s(e)}))})),function(){}}),[n,e]),c}},9975:function(e,n,t){t.r(n),t.d(n,{default:function(){return f}});var r=t(1413),u=t(4942),o=t(2982),i=t(7467),c=t(2039),s=t(4717),a=t(184);function f(e){var n=e.trigger,t=e.data,f=e.open,l=void 0!==f&&f,d=e.onClose,v=(0,s.useMutateProtocol)({onSuccess:function(){console.log("success"),window.location.reload()}}).mutate;return(0,a.jsx)(i.Z,{trigger:n,modal:!0,contentStyle:{backgroundColor:"white"},open:l,onClose:d,children:function(e){return(0,a.jsx)("div",{className:c.default.container,children:(0,a.jsxs)("form",{onSubmit:function(n){var i;n.preventDefault(),[{type:"STRING",key:"name"}].concat((0,o.Z)(t)).map((function(e){return(0,u.Z)({},e.key,n.target[e.key].value)}));var c=[{type:"STRING",key:"name"}].concat((0,o.Z)(t)).map((function(e){return(0,u.Z)({},e.key,n.target[e.key].value)})).reduce((function(e,n){return(0,r.Z)((0,r.Z)({},e),n)}),{});c.MicroserviceID=null===(i=t[0])||void 0===i?void 0:i.MicroserviceID,v(c),e()},children:[(0,a.jsx)("div",{className:c.default.header,children:"Create new config"}),[{type:"STRING",key:"name"}].concat((0,o.Z)(t)).map((function(e){return"ENUM"===e.type?(0,a.jsxs)("div",{className:c.default.row,children:[(0,a.jsx)("span",{children:e.key}),(0,a.jsx)("select",{name:e.key,defaultValue:e.defaultValue,children:JSON.parse(e.values).map((function(e){return(0,a.jsx)("option",{value:e,children:e},e)}))})]},e.key):(0,a.jsxs)("div",{className:c.default.row,children:[(0,a.jsx)("span",{children:e.key}),(0,a.jsx)("input",{type:"text",name:e.key,defaultValue:e.defaultValue})]},e.key)})),(0,a.jsx)("div",{className:c.default.footer,children:(0,a.jsx)("input",{type:"submit",value:"Create",className:c.default.buttonHolder})})]})})}})}},2039:function(e,n,t){t.r(n),n.default={container:"ProtocolBox_container__HuIq3",header:"ProtocolBox_header__B7mIS",row:"ProtocolBox_row__zK5XT",buttonHolder:"ProtocolBox_buttonHolder__BRn71",footer:"ProtocolBox_footer__gPzvW"}},2982:function(e,n,t){t.d(n,{Z:function(){return o}});var r=t(907);var u=t(181);function o(e){return function(e){if(Array.isArray(e))return(0,r.Z)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||(0,u.Z)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);
//# sourceMappingURL=9975.badf383b.chunk.js.map