import request from '@/support/request.js'
import friendlyDate from '@/support/until.js'

const URL = {
  GET: '/notebooks',
  // GET: '/notebooks22',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}
const notebooks = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      request(URL.GET).then(
        (res) => {
          res.data.map(
            (ele) => {
              ele.friendlyCreatedAt = friendlyDate(ele.createdAt)
            }
          )
          res.data = res.data.sort(
            (ele1,ele2)=>{
              return Date.parse(ele2.createdAt) - Date.parse(ele1.createdAt)
            }
        )
          // console.log(res.data, 'fr')
          resolve(res)
        }
      ).catch((err) => {
        reject(err)
      })

    })

  },
  addNoteBooks: ({title = ''} = {title: ''}) => {
    return request(URL.ADD, 'POST', {title})
  },
  updateNoteBooks: (id, {title = ''} = {title: ''}) => {
    return request(URL.UPDATE.replace(':id', id), 'PATCH', {title})
  },
  deleteNoteBooks: (id) => {
    return request(URL.DELETE.replace(':id', id), 'DELETE')
  }
}
window.notebooks = notebooks
export default notebooks
