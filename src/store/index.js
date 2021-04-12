import Vue from 'vue'
import Vuex from 'vuex'
import note from './modules/note.js'
import notebook from './modules/notebook.js'
import trash from './modules/trash.js'
import user from './modules/user.js'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    note, notebook, trash, user
  }
})
