import request from '@/support/request.js'
import friendlyDate from "@/support/until";

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm',
}

let trashRequest = {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then((res) => {
        // console.log(res)
        res.data.map((note) => {
          note.createdAtFriendly = friendlyDate(note.createdAt)
          note.updatedAtFriendly = friendlyDate(note.updatedAt)
          return note
        })
        res.data.sort((ele1, ele2) => {
          return   Date.parse(ele2.createdAt)-Date.parse(ele1.createdAt)
        })
        resolve(res)
      }).catch((err) => {
        console.error(err)
        reject(err)
      })
    })
  },
  revertNote(noteId){
    return request(URL.REVERT.replace(':noteId',noteId),'PATCH')
  },
  deleteNote(noteId){
    return request(URL.DELETE.replace(':noteId',noteId),'DELETE')
  },
}
export default trashRequest
