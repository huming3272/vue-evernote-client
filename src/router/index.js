import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: ()=> import('@/components/Login.vue')
    },
    {
      path: '/',
      alias:'/notebooks',
      name: 'notebooks',
      component: ()=> import('@/components/NotebookList.vue')
    },
    {
      path:'/note',
      name: 'note',
      component: ()=> import('@/components/NoteDetail.vue')
    },
    {
      // path:'/trash/noteId=:noteId',
      path:'/trash',
      name: 'trash',
      component: ()=> import('@/components/TrashDetail.vue')
    },

  ]
})
