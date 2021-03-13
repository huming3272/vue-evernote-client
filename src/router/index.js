import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import NotebookList from '@/components/NotebookList.vue'
import NoteDetail from '@/components/NoteDetail.vue'
import TrashDetail from '@/components/TrashDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/notebooks',
      name: 'notebooks',
      component: NotebookList
    },
    {
      path:'/note/noteId=:noteId',
      name: 'note',
      component: NoteDetail,
    },
    {
      path:'/trash/noteId=:noteId',
      name: 'trash',
      component: TrashDetail,
    },

  ]
})
