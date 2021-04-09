import User from '@/api/authorise.js'
import router from '@/router/index.js'

const state = {
  user: null
}
const getters = {
  slug(state) {
    if (state.user === null) {
      return '未'
    } else {
      return state.user.username.charAt(0)
    }

  },
  username(state) {
    if (state.user === null) {
      return '未登录'
    } else {
      return state.user.username
    }
  }

}

const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}
const actions = {
  checkLogin({commit,state}, jump) {
    if(state.user!==null){
      return Promise.resolve()
    }
    return User.getInfo().then((res) => {
      if (!res.isLogin && router.history.current.path != '/login') {
        router.push({path: '/login'})
      }
    })
  },
  Login({commit}, {username, password}) {
    return User.login({username: username, password: password}).then((res) => {
      commit('setUser', res.data)
    })
  },
  loginOut(){
    return User.loginOut().then(()=>{
      router.replace({path:'/login'})
    })
  },
  Register({commit}, {username, password}) {
    return User.register({username: username, password: password}).then((res) => {
      commit('setUser', res.data)
      })
  },

}
export default {
  state,
  getters,
  mutations,
  actions
}
