import axios from 'axios'
import baseURLConfig from './config-baseURL.js'
//默认api
console.log(baseURLConfig)

//修改axios默认配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//修改请求头的post编码
axios.defaults.baseURL = baseURLConfig.baseURL
//使用默认请求头
axios.defaults.withCredentials = true
// 是否跨域
let request = function(url, type = 'GET', data = {}) {
  //设定默认的type为GET,如果有实参就设为实参的值
  return new Promise((resolve, reject) => {
    //定义axios需要的配置
    let option = {
      url,
      method: type,
      validateStatus(status) {
        return (status >=200 && status < 300) || status === 400
      }
    }
    //如果请求是get就赋值给option.params
    if(type.toLowerCase() === 'get') {
      option.params = data
    }else {
      //不然请求就是post，赋值给option.data
      option.data = data
      // console.log('request',option.data)
    }
    axios(option).then(res => {
      //使用axios根据参数发送请求
      if(res.status === 200) {
        resolve(res.data)
      //  axios传入状态码为200时，运行resolve传入返回值
      }else {
        //不然请求失败，报个错运行reject
        console.error(res.data)
        reject(res.data)
      }
    }).catch(err=>{
      //promise中出错时用promise.catch捕捉
      console.error({msg: '网络异常'})
      reject({msg: '网络异常'})
    })
  })
}

export default request
// request('/auth/login', 'POST', {username: 'hunger', password: '123456'})
//   .then(data=>{
//     console.log(data)
//   })
