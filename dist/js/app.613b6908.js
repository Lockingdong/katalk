(function(t){function e(e){for(var s,r,o=e[0],c=e[1],u=e[2],f=0,g=[];f<o.length;f++)r=o[f],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&g.push(i[r][0]),i[r]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);l&&l(e);while(g.length)g.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],s=!0,o=1;o<n.length;o++){var c=n[o];0!==i[c]&&(s=!1)}s&&(a.splice(e--,1),t=r(r.s=n[0]))}return t}var s={},i={app:0},a=[];function r(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=s,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(n,s,function(e){return t[e]}.bind(null,s));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"16a3":function(t,e,n){"use strict";n("cd8c")},"26d9":function(t,e,n){"use strict";n("420b")},"420b":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("transition",{attrs:{name:"fade"}},[t.navOpen?n("navbar",{attrs:{muted:t.muted},on:{"toggle-muted":t.toggleMuted,"close-navbar":function(e){t.navOpen=!1}}}):t._e()],1),n("div",{staticClass:"ham",on:{click:function(e){t.navOpen=!t.navOpen}}},[n("span",{staticClass:"line1"}),n("span",{staticClass:"line2"})]),n("transition",{attrs:{name:"fade"}},[t.currentPageStatus===t.pageStatus.init?n("landing-page",{on:{"join-room":t.joinRoom}}):t._e(),t.currentPageStatus===t.pageStatus.wait?n("waiting-page"):t._e(),t.currentPageStatus===t.pageStatus.inroom?n("chat-room",{attrs:{msgs:t.msgs,"is-other-typing":t.isOtherTyping},on:{"send-msg":t.sendMsg,"leave-room":t.leaveRoom,"user-is-typing":t.userIsTyping}}):t._e()],1)],1)},a=[],r=n("3835"),o=(n("159b"),n("ac1f"),n("1276"),n("d4ec")),c=function t(e,n){Object(o["a"])(this,t),this.className=e,this.content=n},u=c,l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"chat-room-wrapper"},[n("div",{ref:"msgList",staticClass:"msg-list-wrapper"},[n("transition-group",{staticClass:"msg-list",attrs:{name:"list",tag:"ul"}},[t._l(t.msgs,(function(e,s){return n("li",{key:"msg"+s,staticClass:"msg-item",class:t.msgItem(e.className,s)},["admin"===e.className?n("div",{staticClass:"msg-wrapper",domProps:{innerHTML:t._s(e.content)}}):n("div",{staticClass:"msg-wrapper"},[t._v(" "+t._s(e.content)+" ")])])})),t.isOtherTyping?n("li",{key:"other_typing",staticClass:"msg-item other"},[n("div",{staticClass:"msg-wrapper"},[t._v(" 對方正在輸入... ")])]):t._e()],2)],1),n("div",{staticClass:"text-form"},[n("div",{staticClass:"hist-msg-list"},[n("ul",t._l(t.histMsgArr,(function(e,s){return n("li",{key:s,on:{click:function(n){return t.triggerInput(e)}}},[t._v(t._s(e))])})),0)]),n("div",{staticClass:"form-wrapper"},[n("div",{staticClass:"form-btn leave",on:{click:t.showLeaveRoomForm}},[n("i",{staticClass:"fas fa-sign-out-alt"})]),n("div",{staticClass:"text-wrapper"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.userMsg,expression:"userMsg"}],ref:"textInput",staticClass:"text-msg",attrs:{type:"text",disabled:t.userMsgFormDisabled},domProps:{value:t.userMsg},on:{keydown:t.sendMsgHandler,input:function(e){e.target.composing||(t.userMsg=e.target.value)}}})]),n("div",{staticClass:"form-btn",on:{click:t.sendMsg}},[n("i",{staticClass:"fas fa-paper-plane"})])])]),n("confirm-form",{on:{confirm:t.leaveRoom}})],1)},f=[],g=n("ade3"),d=(n("498a"),n("caad"),n("2532"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("modal",{attrs:{name:"confirm-form","max-width":600,width:"90%",height:"auto",adaptive:!0},on:{"before-open":t.beforeOpen}},[n("div",{staticClass:"card-body"},[n("h4",{staticClass:"mb-3 text-center"},[t._v(t._s(t.header))]),t.isContentArray?n("div",{staticClass:"text-center mb-3"},[n("ul",t._l(t.content,(function(e,s){return n("li",{key:s},[t._v(" "+t._s(e)+" ")])})),0)]):n("div",{staticClass:"text-center mb-3",domProps:{innerHTML:t._s(t.content)}}),n("div",{staticClass:"text-center"},[n("button",{staticClass:"btn btn-outline-secondary me-3",on:{click:t.cancel}},[t._v("取消")]),n("button",{staticClass:"btn btn-primary",on:{click:t.confirm}},[t._v("確定")])])])])}),m=[],h={data:function(){return{header:{type:String,required:!0},content:{required:!0}}},computed:{isContentArray:function(){return Array.isArray(this.content)}},methods:{close:function(){this.$modal.hide("confirm-form")},beforeOpen:function(t){var e=t.params;this.header=e.header||"",this.content=e.content||""},confirm:function(){this.$emit("confirm"),this.close()},cancel:function(){this.$emit("cancel"),this.close()}}},p=h,v=(n("8932"),n("2877")),_=Object(v["a"])(p,d,m,!1,null,"39f5b1ae",null),b=_.exports,S={data:function(){return{userMsg:"",userMsgFormDisabled:!1,histMsgArr:[]}},components:{ConfirmForm:b},props:{msgs:{type:Array,required:!0},isOtherTyping:{type:Boolean,required:!0}},computed:{userMsgHasValue:function(){return""!==this.userMsg}},methods:{sendMsgHandler:function(t){13!==t.keyCode||t.shiftKey||(t.preventDefault(),this.sendMsg())},sendMsg:function(){var t=this.userMsg.trim();if(""!==t&&!this.userMsgFormDisabled){var e=this.filterMsg(t,200);this.pushInHistMsg(e),this.$emit("send-msg",e),this.userMsg="",this.lockUserMsgForm()}},filterMsg:function(t,e){var n=t;return n.length>e?(n=n.substring(0,e),n+"..."):n},pushInHistMsg:function(t){var e=this.$localStorage.get("hms"),n=JSON.parse(e);t.length<=5&&!n.includes(t)&&(n.unshift(t),n.length>=6&&n.pop()),this.$localStorage.set("hms",JSON.stringify(n)),this.histMsgArr=n},showLeaveRoomForm:function(){this.$modal.show("confirm-form",{header:"確定要離開嗎？",content:"離開後訊息將無法還原"})},leaveRoom:function(){this.$emit("leave-room")},msgItem:function(t,e){var n;return n={},Object(g["a"])(n,t,!0),Object(g["a"])(n,"last",void 0===this.msgs[e+1]||this.msgs[e+1].className!==t),n},msgListScrollDown:function(){var t=this;this.$nextTick((function(){var e=t.$refs.msgList;e.scrollTop=e.scrollHeight}))},triggerInput:function(t){this.userMsg=t,this.$refs.textInput.focus()},lockUserMsgForm:function(){var t=this;this.userMsgFormDisabled=!0,setTimeout((function(){t.userMsgFormDisabled=!1,t.$nextTick((function(){t.$refs.textInput.focus()}))}),800)}},watch:{userMsgHasValue:function(t,e){this.$emit("user-is-typing",t)},isOtherTyping:function(t,e){t&&this.msgListScrollDown()},msgs:function(){this.msgListScrollDown()}},mounted:function(){this.msgListScrollDown(),this.histMsgArr=JSON.parse(this.$localStorage.get("hms"))}},O=S,M=(n("5fcf"),Object(v["a"])(O,l,f,!1,null,null,null)),C=M.exports,y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"landing-page"},[t._m(0),n("h1",{staticClass:"title"},[t._v("聊BAR")]),n("h3",{staticClass:"subtitle"},[t._v("來聊BAR聊吧")]),n("button",{staticClass:"start-btn",on:{click:t.joinRoom}},[t._v("進入包廂")])])},w=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"logo-wrapper"},[s("img",{attrs:{src:n("ad2f"),alt:""}})])}],T={methods:{joinRoom:function(){this.$emit("join-room")}}},$=T,R=(n("f1b9"),Object(v["a"])($,y,w,!1,null,null,null)),k=R.exports,E=n("c4b6"),I=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"navbar",on:{click:function(e){return e.target!==e.currentTarget?null:t.closeNavbar.apply(null,arguments)}}},[n("div",{staticClass:"nav-content"},[t._m(0),n("ul",[n("li",[t._v("關於聊Bar")]),n("li",[t._v("服務條款")]),n("li",[t._v("尋人專區")]),n("li",{staticClass:"mute"},[t._v(" 通知音效 "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.navMuted,expression:"navMuted"}],attrs:{type:"checkbox",id:"switch"},domProps:{checked:Array.isArray(t.navMuted)?t._i(t.navMuted,null)>-1:t.navMuted},on:{change:function(e){var n=t.navMuted,s=e.target,i=!!s.checked;if(Array.isArray(n)){var a=null,r=t._i(n,a);s.checked?r<0&&(t.navMuted=n.concat([a])):r>-1&&(t.navMuted=n.slice(0,r).concat(n.slice(r+1)))}else t.navMuted=i}}}),n("label",{attrs:{for:"switch"}},[t._v("Toggle")])]),t._m(1)]),t._m(2)])])},N=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"logo-wrapper"},[s("img",{attrs:{src:n("ad2f"),alt:""}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("i",{staticClass:"fas fa-donate"}),t._v(" 贊助開發APP基金")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"media"},[n("a",{attrs:{href:"https://www.facebook.com/talkbartalk/",target:"_blank"}},[n("i",{staticClass:"fab fa-facebook"})]),n("a",{attrs:{href:"https://www.instagram.com/talkbartalk/",target:"_blank"}},[n("i",{staticClass:"fab fa-instagram"})])])}],x={props:{muted:{type:Boolean,required:!0}},methods:{closeNavbar:function(){this.$emit("close-navbar",!1)}},computed:{navMuted:{get:function(){return!this.muted},set:function(t){this.$emit("toggle-muted")}}}},P=x,A=(n("16a3"),Object(v["a"])(P,I,N,!1,null,null,null)),j=A.exports,U=(n("cc98"),n("a4da")),L=n.n(U),H={name:"App",components:{ChatRoom:C,LandingPage:k,WaitingPage:E["default"],Navbar:j},data:function(){return{msgs:[],pageStatus:{init:"INIT",wait:"WAIT",inroom:"INROOM"},currentPageStatus:"",isOtherTyping:!1,navOpen:!1,muted:!0,notificationCount:0,docTitle:""}},sockets:{connect:function(){var t=this.$localStorage.get("ri");"WAITING_ROOM"!==t?null!==t&&this.$socket.emit("USER_RECONNECT_CHAT_ROOM",t,this.$localStorage.get("ut")):this.leaveRoom()},USER_CLEAR_ROOM:function(){this.resetToInit()},JOIN_CHAT_ROOM_SUCCESS:function(t){this.$localStorage.set("ri",t),this.currentPageStatus=this.pageStatus.inroom},JOIN_WAITING_ROOM:function(){this.$localStorage.set("ri","WAITING_ROOM"),this.currentPageStatus=this.pageStatus.wait},USER_RECONNECT_CHAT_ROOM:function(){this.currentPageStatus=this.pageStatus.inroom},USER_RECONNECT_WAITING_ROOM:function(){this.currentPageStatus=this.pageStatus.wait},USER_RECV_MSG:function(t){var e=Object(r["a"])(t,2),n=e[0],s=e[1];this.addNotification(),this.insertMsgToWindow(n,s),0!==n&&this.alertSound()},USER_SET_HIST_MSGS:function(t){var e=this;t.forEach((function(t){var n=JSON.parse(t),s=Object(r["a"])(n,2),i=s[0],a=s[1];e.insertMsgToWindow(i,a)}))},OTHER_IS_TYPING:function(t){this.isOtherTyping=t}},computed:{},watch:{notificationCount:function(t,e){document.title=1===t?"(🔔) ".concat(this.docTitle):this.docTitle}},methods:{getUserOrder:function(){var t=this.$localStorage.get("ut"),e=this.$localStorage.get("ri"),n=e.split(":");return t===n[0]?1:2},joinRoom:function(){this.$socket.emit("USER_CLICK_JOIN_ROOM",this.$localStorage.get("ut"))},leaveRoom:function(){this.$socket.emit("USER_CLICK_LEAVE_ROOM",this.$localStorage.get("ri"),this.$localStorage.get("ut")),this.resetToInit()},sendMsg:function(t){var e=this.getUserOrder();this.insertMsgToWindow(e,t),this.emitUserMsg(e,t)},emitUserMsg:function(t,e){this.$socket.emit("USER_SEND_MSG",this.$localStorage.get("ri"),t,e)},insertMsgToWindow:function(t,e){var n,s=this.getUserOrder();t===s?n="mine":0===t?n="admin":t!==s?n="other":console.log("user order not found");var i=new u(n,e);this.msgs.push(i)},resetToInit:function(){this.$localStorage.remove("ri"),this.currentPageStatus=this.pageStatus.init,this.msgs=[],this.isOtherTyping=!1},userIsTyping:function(t){this.resetNotification(),this.$socket.emit("USER_IS_TYPING",this.$localStorage.get("ri"),t)},toggleMuted:function(){this.muted=!this.muted},addNotification:function(){this.notificationCount=1},resetNotification:function(){this.notificationCount=0},alertSound:function(){if(!this.muted){var t=new Audio(L.a);t.play()}}},mounted:function(){this.currentPageStatus=this.pageStatus.init,this.docTitle=document.title;var t=window.innerHeight/100;document.querySelector("#app").style.setProperty("--vh",t+"px"),window.addEventListener("resize",(function(){document.querySelector("#app").style.setProperty("--vh",t+"px")}))}},D=H,F=(n("5c0b"),Object(v["a"])(D,i,a,!1,null,null,null)),J=F.exports,W=n("5132"),G=n.n(W),q=n("8e27"),B=n.n(q),V=n("ead5"),K=n.n(V),Y=n("1881"),z=n.n(Y),Q=n("ec26");s["a"].use(K.a),s["a"].use(z.a);var X=s["a"].localStorage.get("ut");null===X&&(X=Object(Q["a"])(),s["a"].localStorage.set("ut",X));var Z=s["a"].localStorage.get("hms");null===Z&&s["a"].localStorage.set("hms",JSON.stringify([]));var tt=B()("http://localhost:3003",{query:{user_token:X}});s["a"].use(new G.a({debug:!0,connection:tt})),s["a"].config.productionTip=!1,new s["a"]({render:function(t){return t(J)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";n("9c0c")},"5fcf":function(t,e,n){"use strict";n("9b40")},"79ef":function(t,e,n){},8932:function(t,e,n){"use strict";n("dca1")},9603:function(t,e,n){"use strict";var s=n("c618"),i=n.n(s);e["default"]=i.a},"9b40":function(t,e,n){},"9c0c":function(t,e,n){},a4da:function(t,e,n){t.exports=n.p+"media/alert.1de6c75d.mp3"},ad2f:function(t,e,n){t.exports=n.p+"img/bar.834b265b.png"},af67:function(t,e,n){"use strict";n.d(e,"a",(function(){return s})),n.d(e,"b",(function(){return i}));var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"waiting-page"},[t._v(" 正在排隊進入包廂 ... ")])},i=[]},c4b6:function(t,e,n){"use strict";var s=n("af67"),i=n("9603"),a=(n("26d9"),n("2877")),r=Object(a["a"])(i["default"],s["a"],s["b"],!1,null,null,null);e["default"]=r.exports},c618:function(t,e){},cd8c:function(t,e,n){},dca1:function(t,e,n){},f1b9:function(t,e,n){"use strict";n("79ef")}});
//# sourceMappingURL=app.613b6908.js.map