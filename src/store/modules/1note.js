/*老师代码*/
import note from '@/api/notes.js'
import {Message} from 'element-ui'

const state = {
  notes:null,
  curNoteId:null
}
const getters = {
  notes:(state)=>{return state.notes||[]},
  curNote:(state)=>{
    if(!Array.isArray(notes)){return {}}
    if(!state.curNoteId){return notes[0]||{}}
    return state.notes.find((note)=>{
      return note.id === parseInt(state.curNoteId)
    })
  }
}
const mutations = {
  setNotes:(state,{notes})=>{
    state.notes = notes
  },
  setCurNoteId:(state,{curNoteId})=>{
    state.curNoteId = curNoteId
  },
  addNote:(state,{notes})=>{
    state.notes.unshift(notes)
  }

}
const actions = {
  getNotes({commit},{notebookId}){
    note.getAll(notebookId).then((res) => {
      commit('setNotes',{notes:res.data})
      commit('setCurNoteId',{curNoteId:notebookId})
    })
  },
  addNote({commit},{curNoteId}){
    note.addNote(curNoteId).then((res)=>{
      commit('addNote',{notes:res.data})
      Message.success(res.msg)
    }).catch((err)=>{
      console.error(err)
    })
  }
}

export default{
    state,getters,mutations,actions
}
