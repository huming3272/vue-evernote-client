import trash from '@/api/trash.js'
import router from '@/router/index.js'
const state = {
  trashNotes: null,
  curTrashNoteId: null
}
const getters = {
  trashNotes: state => state.trashNotes || [],
  curTrashNote:(state,getters)=>{
    if(!state.curTrashNoteId){

      return getters.trashNotes[0] || {}
    }
    return state.trashNotes.find((note)=>{
      return note.id === parseInt(state.curTrashNoteId)
    }) || {}
  },
  belongTo:(state,getters,rootState,rootGetters)=>{
    let notebook = rootGetters.notebooks.find((note)=>{
      return note.id === parseInt(getters.curTrashNote.notebookId) })|| {}
    return notebook.title || ''
  }
}
const mutations = {
  setTrashNotes(state,payload){
    state.trashNotes = payload.trashNotes
  },
  setCurTrashNoteId(state,payload){
    state.curTrashNoteId = payload.curTrashNoteId
    // console.log('setCurTrashNoteId',state.curTrashNoteId)
  },
  delTrash(state,payload){
    state.trashNotes = state.trashNotes.filter((note)=>{

      return note.id !== parseInt(payload)
    })
  }
}
const actions = {
  getTrash({commit}){
    return trash.getAll().then((res)=>{
      commit('setTrashNotes',{trashNotes:res.data})
    })
  },
  deleteTrash({commit,state},payload){
    return trash.deleteNote(payload.curTrashNoteId).then(()=>{
      commit('delTrash',payload.curTrashNoteId)
      // router.replace({path:'/trash'})
    })
  },
  revertNote({commit},payload){
    return trash.revertNote(payload.curTrashNoteId).then(()=>{
      commit('delTrash',payload.curTrashNoteId)
      // router.replace({path:'/trash'})
    })
  }
}

export default{
  state,getters,mutations,actions
}
