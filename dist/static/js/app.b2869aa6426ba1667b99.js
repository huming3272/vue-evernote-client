webpackJsonp([0],{"5Mpm":function(t,e){},"G/bI":function(t,e){},"L+R+":function(t,e){},NGgo:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("7+uW"),n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",{attrs:{title:this.user.username}},[this._v(this._s(this.slug))])])},staticRenderFns:[]};var r={name:"SlideBar",data:function(){return{}},components:{Avatar:s("VU/8")({name:"Avatar",data:function(){return{user:{username:"hunger"},slug:"H"}}},n,!1,function(t){s("5Mpm")},"data-v-2933244e",null).exports},mounted:function(){console.log("sideBar启动了")}},o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"sidebar"}},[e("Avatar"),this._v(" "),e("div",{staticClass:"icons"},[e("router-link",{attrs:{to:"/note/id",title:"笔记"}},[e("i",{staticClass:"iconfont icon-note"})]),this._v(" "),e("router-link",{attrs:{to:"/notebooks",title:"笔记本"}},[e("i",{staticClass:"iconfont icon-notebook"})]),this._v(" "),e("router-link",{attrs:{to:"/trash/id",title:"回收站"}},[e("i",{staticClass:"iconfont icon-trash"})])],1),this._v(" "),this._m(0)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"logout"},[e("i",{staticClass:"iconfont icon-logout"})])}]};var a={name:"App",data:function(){return{}},components:{SideBar:s("VU/8")(r,o,!1,function(t){s("L+R+")},"data-v-428b70e2",null).exports}},l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("SideBar"),this._v(" "),e("router-link",{staticClass:"login",attrs:{to:"/login"}},[this._v("登陆")]),this._v(" "),e("router-view",{staticClass:"some"})],1)},staticRenderFns:[]};var c=s("VU/8")(a,l,!1,function(t){s("jAcl")},null,null).exports,u=s("/ocq"),d={data:function(){return{isShowLogin:!0,isShowRegister:!1,login:{username:"",password:"",notice:"输入用户名和密码",isError:!1},register:{username:"",password:"",notice:"创建账号后，请记住用户名和密码",isError:!1}}},methods:{showLogin:function(){this.isShowLogin=!0,this.isShowRegister=!1},showRegister:function(){this.isShowLogin=!1,this.isShowRegister=!0},onRegister:function(){return/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)?/^.{6,16}$/.test(this.register.password)?(this.register.isError=!1,this.register.notice="",void console.log("start register..., username: "+this.register.username+" , password: "+this.register.password)):(this.register.isError=!0,void(this.register.notice="密码长度为6~16个字符")):(this.register.isError=!0,void(this.register.notice="用户名3~15个字符，仅限于字母数字下划线中文"))},onLogin:function(){return/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)?/^.{6,16}$/.test(this.login.password)?(this.login.isError=!1,this.login.notice="",void console.log("start login..., username: "+this.login.username+" , password: "+this.login.password)):(this.login.isError=!0,void(this.login.notice="密码长度为6~16个字符")):(this.login.isError=!0,void(this.login.notice="用户名3~15个字符，仅限于字母数字下划线中文"))}}},v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"login"}},[s("div",{staticClass:"modal-mask"},[s("div",{staticClass:"modal-wrapper"},[s("div",{staticClass:"modal-container"},[s("div",{staticClass:"main"}),t._v(" "),s("div",{staticClass:"form"},[s("h3",{on:{click:t.showRegister}},[t._v("创建账户")]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowRegister,expression:"isShowRegister"}],staticClass:"register"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.register.username,expression:"register.username"}],attrs:{type:"text",placeholder:"用户名"},domProps:{value:t.register.username},on:{input:function(e){e.target.composing||t.$set(t.register,"username",e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.register.password,expression:"register.password"}],attrs:{type:"password",placeholder:"密码"},domProps:{value:t.register.password},on:{input:function(e){e.target.composing||t.$set(t.register,"password",e.target.value)}}}),t._v(" "),s("p",{class:{error:t.register.isError}},[t._v(" "+t._s(t.register.notice))]),t._v(" "),s("div",{staticClass:"button",on:{click:t.onRegister}},[t._v("创建账号")])]),t._v(" "),s("h3",{on:{click:t.showLogin}},[t._v("登录")]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowLogin,expression:"isShowLogin"}],staticClass:"login"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.login.username,expression:"login.username"}],attrs:{type:"text",placeholder:"输入用户名"},domProps:{value:t.login.username},on:{input:function(e){e.target.composing||t.$set(t.login,"username",e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.login.password,expression:"login.password"}],attrs:{type:"password",placeholder:"密码"},domProps:{value:t.login.password},on:{input:function(e){e.target.composing||t.$set(t.login,"password",e.target.value)}}}),t._v(" "),s("p",{class:{error:t.login.isError}},[t._v(" "+t._s(t.login.notice))]),t._v(" "),s("div",{staticClass:"button",on:{click:t.onLogin}},[t._v(" 登录")])])])])])])])},staticRenderFns:[]};var h=s("VU/8")(d,v,!1,function(t){s("NGgo")},"data-v-9d8b8fba",null).exports,g={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v(this._s(this.msg))])},staticRenderFns:[]};var m=s("VU/8")({name:"msgbooks",data:function(){return{msg:"笔记本列表"}}},g,!1,function(t){s("vih/")},"data-v-4132fe9a",null).exports,p={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n  "+this._s(this.msg)+this._s(this.$route.params.noteId)+"\n")])},staticRenderFns:[]};var f=s("VU/8")({name:"NoteDetail",data:function(){return{msg:"笔记本详情"}}},p,!1,function(t){s("G/bI")},"data-v-402f577e",null).exports,_={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n  "+this._s(this.msg)+"||"+this._s(this.$route.params.noteId)+"\n")])},staticRenderFns:[]};var w=s("VU/8")({name:"TrashDetail",data:function(){return{msg:"回收站"}}},_,!1,function(t){s("OWPJ")},"data-v-a054c388",null).exports;i.a.use(u.a);var E=new u.a({routes:[{path:"/login",name:"login",component:h},{path:"/notebooks",name:"notebooks",component:m},{path:"/note/:noteId",name:"note",component:f},{path:"/trash/:noteId",name:"trash",component:w}]});i.a.config.productionTip=!1,new i.a({el:"#app",router:E,components:{App:c},template:"<App/>"})},OWPJ:function(t,e){},jAcl:function(t,e){},"vih/":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.b2869aa6426ba1667b99.js.map