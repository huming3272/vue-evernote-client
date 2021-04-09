import Notebook from '@/api/notebooks.js'
import {Message} from 'element-ui'
import friendlyDate from '@/support/until.js'

const state = {
  notebooks: null,
  curBookId: null,
  // curBook: null
}

const getters = {
  notebooks: state => state.notebooks || [],

  curBook:(state)=>{

    if (!Array.isArray(state.notebooks)) {
      // console.log('1---', state.notebooks)
      return '暂无笔记'
    }
    //如果notebooks没得到返回的值那其中的当前笔记curbook一定为空

    if (!state.curBookId) {
      // console.log('2---', state.notebooks)
      return state.notebooks[0] || {}
    }
    //如果没有得到curbookid,则返回数组中第一个对象

    return state.notebooks.find((notebook) => {
      // console.log('3---', notebook)
      // console.log(notebook,'notebook&curBookId',state.curBookId)
      return notebook.id === parseInt(state.curBookId)
    }) ||{}


  }
}
const mutations = {
  setCurBook(state, payload) {
    // console.log('setCurBook', payload)
    state.curBookId = payload.curBookId
    // console.log('setCurBook', state.curBookId )
  },
  setNotebooks(state, payload) {
    state.notebooks = payload.notebooks
    // console.log('notebookSet', state.notebooks)
  },
  addNotebook(state, payload) {
    state.notebooks.unshift(payload.notebook)
  },
  updateNotebook(state, payload) {
    let notebook = state.notebooks.find((note) => {
      return note.id === parseInt(payload.notebookId) || {}
    })
    notebook.title = payload.title
  },
  deleteNotebook(state, payload) {
    // console.log('deleteNotebook', payload)
    state.notebooks.splice(state.notebooks.indexOf(payload), 1)
  },
}
const actions = {
  getNotebooks({commit,state}) {
    /*少写return卡了几天的bug*/
    if(state.notebooks !==null){
      return Promise.resolve()
    }
    return Notebook.getAll().then(res => {
      commit('setNotebooks', {notebooks: res.data})
      // console.log('getNotebooks', res.data)
    })
  },
  addNotebook({commit}, payload) {
    Notebook.addNoteBooks({title: payload.title}).then(
      res => {
        res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
        commit('addNotebook', {notebook: res.data})
        Message.success(res.msg)

      }
    ).catch((err) => {
      console.error(err.data)
    })
  },
  updateNotebook({commit}, payload) {
    Notebook.updateNoteBooks(payload.notebookId, {title: payload.title}).then(
      (res) => {
        commit('updateNotebook', {notebookId: payload.notebookId, title: payload.title})
        // alert(res.msg)
        Message.success('成功修改为: ' + res.msg)
      }
    ).catch((err) => {
      console.error(err.data)
      // this.$message({showClose: true, message: '错误:' + err.msg, type: 'error'})
    })
  },
  deleteNotebook({commit}, payload) {
    Notebook.deleteNoteBooks(payload.id).then(
      (res) => {
        commit('deleteNotebook', payload)
        Message.success(res.msg)
      }
    ).catch((err) => {
      console.error(err)
    })
  }

}


export default {
  state,
  mutations,
  actions,
  getters
}
