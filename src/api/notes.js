import request from '@/support/request.js'
import friendlyDate from "@/support/until.js";

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId'
}
let notesRequest = {
  getAll(notebookId) {
    return new Promise((resolve, reject) => {
      request(URL.GET.replace(':notebookId', notebookId)).then((res) => {
        // console.log(res)
        res.data.map((ele) => {
          ele.createdAtFriendly = friendlyDate(ele.createdAt)
          ele.updatedAtFriendly = friendlyDate(ele.updatedAt)
          return ele
        })
        res.data.sort((ele1, ele2) => {
          return   Date.parse(ele2.updatedAt)-Date.parse(ele1.updatedAt)
        })
        resolve(res)
      }).catch((err) => {
        console.error(err)
        reject(err)
      })
    })
  },
  addNote(notebookId, {title = '', content = ''} = {title, content}) {
    return new Promise((resolve, reject) => {
      request(URL.ADD.replace(':notebookId', notebookId), 'POST', {title, content}).then(
        (res) => {
          res.data.createdAtFriendly = friendlyDate(res.data.createdAt)
          res.data.updatedAtFriendly = friendlyDate(res.data.updateAt)
          resolve(res)
        }
      ).catch(
        (err) => {
          console.error(err)
          reject(err)
        }
      )
    })
  },
  updateNote(noteId,{title='',content=''}={title:'',content:''}){
    return request(URL.UPDATE.replace(':noteId',noteId),'PATCH',{title,content})
  },
  deleteNote(noteId){
    return request(URL.DELETE.replace(':noteId',noteId),'DELETE')
  }

}

export default notesRequest
