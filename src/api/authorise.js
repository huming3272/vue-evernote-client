import request from '@/support/request.js'

let URL = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGINOUT: '/auth/logout',
  GET_INFO: '/auth'
}
let authorise = {
  register({username,password}){
    return request(URL.REGISTER,'POST',{username,password})
  },
  login({username,password}){
    return request(URL.LOGIN,'POST',{username,password})
  },
  loginOut(){
    return request(URL.LOGINOUT)
  //  注销操作
  },
  getInfo(){
    return request(URL.GET_INFO)
  }
}
export default authorise
