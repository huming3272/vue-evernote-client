webpackJsonp([5],{"4eqF":function(t,e,n){"use strict";e.a=function(t){var e=t instanceof Object?t:Date.parse(t),n=Date.parse(new Date)-e,o="刚才";switch(!0){case n<6e4:o="刚刚";break;case n<36e5:o=Math.floor(n/6e4)+"分钟前";break;case n<864e5:o=Math.floor(n/36e5)+"小时前";break;case n<2592e6:o=Math.floor(n/864e5)+"天前";break;case n<31104e6:o=Math.floor(n/2592e6)+"月前";break;case n>31104e6:o=Math.floor(n/31104e6)+"年前"}return o}},"776r":function(t,e,n){"use strict";var o=n("d/yp"),r="/auth/register",a="/auth/login",s="/auth/logout",c="/auth",u={register:function(t){var e=t.username,n=t.password;return Object(o.a)(r,"POST",{username:e,password:n})},login:function(t){var e=t.username,n=t.password;return Object(o.a)(a,"POST",{username:e,password:n})},loginOut:function(){return Object(o.a)(s)},getInfo:function(){return Object(o.a)(c)}};e.a=u},GsJl:function(t,e){},HKMG:function(t,e,n){"use strict";var o=n("//Fk"),r=n.n(o),a=n("d/yp"),s=n("4eqF"),c={GET:"/notes/from/:notebookId",ADD:"/notes/to/:notebookId",UPDATE:"/notes/:noteId",DELETE:"/notes/:noteId"},u={getAll:function(t){return new r.a(function(e,n){Object(a.a)(c.GET.replace(":notebookId",t)).then(function(t){t.data.map(function(t){return t.createdAtFriendly=Object(s.a)(t.createdAt),t.updatedAtFriendly=Object(s.a)(t.updatedAt),t}),t.data.sort(function(t,e){return Date.parse(e.updatedAt)-Date.parse(t.updatedAt)}),e(t)}).catch(function(t){console.error(t),n(t)})})},addNote:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{title:o,content:i},n=e.title,o=void 0===n?"":n,u=e.content,i=void 0===u?"":u;return new r.a(function(e,n){Object(a.a)(c.ADD.replace(":notebookId",t),"POST",{title:o,content:i}).then(function(t){t.data.createdAtFriendly=Object(s.a)(t.data.createdAt),t.data.updatedAtFriendly=Object(s.a)(t.data.updateAt),e(t)}).catch(function(t){console.error(t),n(t)})})},updateNote:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{title:"",content:""},n=e.title,o=void 0===n?"":n,r=e.content,s=void 0===r?"":r;return Object(a.a)(c.UPDATE.replace(":noteId",t),"PATCH",{title:o,content:s})},deleteNote:function(t){return Object(a.a)(c.DELETE.replace(":noteId",t),"DELETE")}};e.a=u},J8jR:function(t,e){},M0vk:function(t,e,n){"use strict";var o=n("7+uW");e.a=new o.default},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("7+uW"),r=n("Dd8w"),a=n.n(r),s=n("776r"),c=n("NYxO"),u=n("M0vk"),i={name:"Avatar",data:function(){return{}},computed:a()({},Object(c.c)(["slug","username"])),methods:a()({},Object(c.b)(["checkLogin"])),created:function(){var t=this;u.a.$on("userInfo",function(e){t.user.username=e.username}),this.checkLogin({path:"/login"})}},d={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",{attrs:{title:this.username}},[this._v(this._s(this.slug))])])},staticRenderFns:[]};var l={name:"SlideBar",data:function(){return{fold:!0}},components:{Avatar:n("VU/8")(i,d,!1,function(t){n("J8jR")},"data-v-8f8c35ba",null).exports},mounted:function(){},methods:a()({},Object(c.b)(["loginOut"]),{logOut:function(){var t=this;this.$confirm("此操作将注销账户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.loginOut(),t.fold=!0,t.$message({type:"success",message:"注销成功!"})}).catch(function(){t.$message({type:"info",message:"已取消注销"})})}})},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.fold?"fold-sidebar":"",attrs:{id:"sidebar"}},[n("div",{staticClass:"fold",on:{click:function(e){t.fold=!t.fold}}},[n("i",{class:t.fold?"el-icon-arrow-right":"el-icon-arrow-left"})]),t._v(" "),n("Avatar"),t._v(" "),n("div",{staticClass:"icons"},[n("router-link",{attrs:{to:"/note",title:"笔记"}},[n("i",{staticClass:"iconfont icon-note"})]),t._v(" "),n("router-link",{attrs:{to:"/notebooks",title:"笔记本"}},[n("i",{staticClass:"iconfont icon-notebook"})]),t._v(" "),n("router-link",{attrs:{to:"/trash",title:"回收站"}},[n("i",{staticClass:"iconfont icon-trash"})])],1),t._v(" "),n("div",{staticClass:"logout",on:{click:t.logOut}},[n("i",{staticClass:"iconfont icon-logout"})])],1)},staticRenderFns:[]};var h={name:"App",data:function(){return{}},components:{SideBar:n("VU/8")(l,f,!1,function(t){n("Vfdj")},"data-v-037ad01c",null).exports}},p={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("SideBar"),this._v(" "),e("router-view",{staticClass:"some"})],1)},staticRenderFns:[]};var b=n("VU/8")(h,p,!1,function(t){n("GsJl")},null,null).exports,m=n("/ocq");o.default.use(m.a);var v=m.a.prototype.replace;m.a.prototype.replace=function(t){return v.call(this,t).catch(function(t){return t})};var k=new m.a({routes:[{path:"/login",name:"login",component:function(){return n.e(2).then(n.bind(null,"xJsL"))}},{path:"/",alias:"/notebooks",name:"notebooks",component:function(){return n.e(3).then(n.bind(null,"C3fl"))}},{path:"/note",name:"note",component:function(){return n.e(0).then(n.bind(null,"Gb2o"))}},{path:"/trash",name:"trash",component:function(){return n.e(1).then(n.bind(null,"WMg/"))}}]}),g=n("zL8q"),N=n.n(g),I=(n("tvR6"),n("Xcu2"),n("HKMG")),T={state:{notes:null,curNoteId:null},getters:{notes:function(t){return t.notes||[]},curNote:function(t){return Array.isArray(t.notes)?t.curNoteId?t.notes.find(function(e){return e.id==t.curNoteId})||{}:t.notes[0]||{}:{}}},mutations:{setNote:function(t,e){t.notes=e.notes},addNote:function(t,e){t.notes.unshift(e.note)},updateNote:function(t,e){var n=t.notes.find(function(t){return t.id===parseInt(e.noteId)})||{};n.title=e.title,n.content=e.content},deleteNote:function(t,e){t.notes=t.notes.filter(function(t){return t.id!==parseInt(e.noteId)})},setCurNote:function(t,e){t.curNoteId=e.curNoteId}},actions:{getNotes:function(t,e){var n=t.commit,o=e.notebookId;return I.a.getAll(o).then(function(t){n("setNote",{notes:t.data})})},addNote:function(t){var e=t.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{notebookId:r,title:s,content:u},o=n.notebookId,r=void 0===o?"":o,a=n.title,s=void 0===a?"":a,c=n.content,u=void 0===c?"":c;return I.a.addNote(r,{title:s,content:u}).then(function(t){e("addNote",{note:t.data}),g.Message.success(t.msg)})},updateNote:function(t,e){var n=t.commit,o=e.noteId,r=e.title,a=e.content;return I.a.updateNote(o,{title:r,content:a}).then(function(t){n("updateNote",{noteId:o,title:r,content:a})})},deleteNote:function(t,e){var n=t.commit,o=e.noteId;return I.a.deleteNote(o).then(function(t){n("deleteNote",{noteId:o}),k.replace({path:"/note"}),g.Message.success(t.msg)})}}},A=n("//Fk"),E=n.n(A),O=n("Zq7Q"),j=n("4eqF"),w={state:{notebooks:null,curBookId:null},mutations:{setCurBook:function(t,e){t.curBookId=e.curBookId},setNotebooks:function(t,e){t.notebooks=e.notebooks},addNotebook:function(t,e){t.notebooks.unshift(e.notebook)},updateNotebook:function(t,e){t.notebooks.find(function(t){return t.id===parseInt(e.notebookId)||{}}).title=e.title},deleteNotebook:function(t,e){t.notebooks.splice(t.notebooks.indexOf(e),1)}},actions:{getNotebooks:function(t){var e=t.commit;return null!==t.state.notebooks?E.a.resolve():O.a.getAll().then(function(t){e("setNotebooks",{notebooks:t.data})})},addNotebook:function(t,e){var n=t.commit;O.a.addNoteBooks({title:e.title}).then(function(t){t.data.friendlyCreatedAt=Object(j.a)(t.data.createdAt),n("addNotebook",{notebook:t.data}),g.Message.success(t.msg)}).catch(function(t){console.error(t.data)})},updateNotebook:function(t,e){var n=t.commit;O.a.updateNoteBooks(e.notebookId,{title:e.title}).then(function(t){n("updateNotebook",{notebookId:e.notebookId,title:e.title}),g.Message.success("成功修改为: "+t.msg)}).catch(function(t){console.error(t.data)})},deleteNotebook:function(t,e){var n=t.commit;O.a.deleteNoteBooks(e.id).then(function(t){n("deleteNotebook",e),g.Message.success(t.msg)}).catch(function(t){console.error(t)})}},getters:{notebooks:function(t){return t.notebooks||[]},curBook:function(t){return Array.isArray(t.notebooks)?t.curBookId?t.notebooks.find(function(e){return e.id===parseInt(t.curBookId)})||{}:t.notebooks[0]||{}:"暂无笔记"}}},D=n("fAjE"),y={state:{trashNotes:null,curTrashNoteId:null},getters:{trashNotes:function(t){return t.trashNotes||[]},curTrashNote:function(t,e){return t.curTrashNoteId?t.trashNotes.find(function(e){return e.id===parseInt(t.curTrashNoteId)})||{}:e.trashNotes[0]||{}},belongTo:function(t,e,n,o){return(o.notebooks.find(function(t){return t.id===parseInt(e.curTrashNote.notebookId)})||{}).title||""}},mutations:{setTrashNotes:function(t,e){t.trashNotes=e.trashNotes},setCurTrashNoteId:function(t,e){t.curTrashNoteId=e.curTrashNoteId},delTrash:function(t,e){t.trashNotes=t.trashNotes.filter(function(t){return t.id!==parseInt(e)})}},actions:{getTrash:function(t){var e=t.commit;return D.a.getAll().then(function(t){e("setTrashNotes",{trashNotes:t.data})})},deleteTrash:function(t,e){var n=t.commit;t.state;return D.a.deleteNote(e.curTrashNoteId).then(function(){n("delTrash",e.curTrashNoteId)})},revertNote:function(t,e){var n=t.commit;return D.a.revertNote(e.curTrashNoteId).then(function(){n("delTrash",e.curTrashNoteId)})}}},C={state:{user:null},getters:{slug:function(t){return null===t.user?"未":t.user.username.charAt(0)},username:function(t){return null===t.user?"未登录":t.user.username}},mutations:{setUser:function(t,e){t.user=e}},actions:{checkLogin:function(t,e){t.commit;return null!==t.state.user?E.a.resolve():s.a.getInfo().then(function(t){t.isLogin||"/login"==k.history.current.path||k.push({path:"/login"})})},Login:function(t,e){var n=t.commit,o=e.username,r=e.password;return s.a.login({username:o,password:r}).then(function(t){n("setUser",t.data)})},loginOut:function(){return s.a.loginOut().then(function(){k.replace({path:"/login"})})},Register:function(t,e){var n=t.commit,o=e.username,r=e.password;return s.a.register({username:o,password:r}).then(function(t){n("setUser",t.data)})}}};o.default.use(c.a);var L=new c.a.Store({modules:{note:T,notebook:w,trash:y,user:C}});o.default.config.productionTip=!1,o.default.use(N.a),new o.default({el:"#app",router:k,store:L,components:{App:b},template:"<App/>"})},V7dz:function(t,e){t.exports={baseURL:"//note-server.hunger-valley.com"}},Vfdj:function(t,e){},Xcu2:function(t,e){},Zq7Q:function(t,e,n){"use strict";var o=n("//Fk"),r=n.n(o),a=n("d/yp"),s=n("4eqF"),c={GET:"/notebooks",ADD:"/notebooks",UPDATE:"/notebooks/:id",DELETE:"/notebooks/:id"},u={getAll:function(){return new r.a(function(t,e){Object(a.a)(c.GET).then(function(e){e.data.map(function(t){t.friendlyCreatedAt=Object(s.a)(t.createdAt)}),e.data=e.data.sort(function(t,e){return Date.parse(e.createdAt)-Date.parse(t.createdAt)}),t(e)}).catch(function(t){e(t)})})},addNoteBooks:function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{title:""}).title,e=void 0===t?"":t;return Object(a.a)(c.ADD,"POST",{title:e})},updateNoteBooks:function(t){var e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{title:""}).title,n=void 0===e?"":e;return Object(a.a)(c.UPDATE.replace(":id",t),"PATCH",{title:n})},deleteNoteBooks:function(t){return Object(a.a)(c.DELETE.replace(":id",t),"DELETE")}};window.notebooks=u,e.a=u},"d/yp":function(t,e,n){"use strict";var o=n("//Fk"),r=n.n(o),a=(n("7+uW"),n("mtWM")),s=n.n(a),c=n("V7dz"),u=n.n(c),i=n("zL8q");n.n(i);s.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",s.a.defaults.baseURL=u.a.baseURL,s.a.defaults.withCredentials=!0;e.a=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new r.a(function(o,r){var a={url:t,method:e,validateStatus:function(t){return t>=200&&t<300||400===t}};"get"===e.toLowerCase()?a.params=n:a.data=n,s()(a).then(function(t){200===t.status?o(t.data):(console.error(t),Object(i.Message)({showClose:!0,message:"笔记为空，亦或"+t.data.msg,type:"error"}),r(t.data))}).catch(function(t){console.error({msg:"网络异常"}),Object(i.Message)({showClose:!0,message:"网络错误:"+t.data.msg,type:"error"}),r({msg:"网络异常"})})})}},fAjE:function(t,e,n){"use strict";var o=n("//Fk"),r=n.n(o),a=n("d/yp"),s=n("4eqF"),c={GET:"/notes/trash",REVERT:"/notes/:noteId/revert",DELETE:"/notes/:noteId/confirm"},u={getAll:function(){return new r.a(function(t,e){Object(a.a)(c.GET).then(function(e){e.data.map(function(t){return t.createdAtFriendly=Object(s.a)(t.createdAt),t.updatedAtFriendly=Object(s.a)(t.updatedAt),t}),e.data.sort(function(t,e){return Date.parse(e.createdAt)-Date.parse(t.createdAt)}),t(e)}).catch(function(t){console.error(t),e(t)})})},revertNote:function(t){return Object(a.a)(c.REVERT.replace(":noteId",t),"PATCH")},deleteNote:function(t){return Object(a.a)(c.DELETE.replace(":noteId",t),"DELETE")}};e.a=u},tvR6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.dc6952a13504fead95da.js.map