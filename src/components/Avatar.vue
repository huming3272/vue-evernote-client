<template>
  <div>
    <span :title="username">{{slug}}</span>
  </div>
</template>

<script>
  import authorise from "@/api/authorise.js"
  import {mapActions,mapGetters} from 'vuex'
  import Bus from '@/support/bus.js'
  export default {
    name: "Avatar",
    data() {
      return {
        // user: {
        //   username: ''
        // },
      }
    },
    computed:{
      // slug(){
      //   return this.user.username.charAt(0)
      // }
      ...mapGetters([
        'slug','username'
      ])
    },
    methods:{
      ...mapActions([
        'checkLogin'
      ])
    },
    created(){
      Bus.$on('userInfo',(userInfo)=>{
          this.user.username = userInfo.username
      })
      this.checkLogin({path:'/login'})
      // authorise.getInfo().then(res=>{
      //   if(!res.isLogin&&this.$router.history.current.path!='/login'){
      //     this.$router.push({path: '/login'})
      //     //如果没有登录就让页面跳回登录页
      //   }
      //     this.user.username = res.data.username || '未登录'
      //   console.log(res)
      // })
    }
  }
</script>

<style scoped>
  span {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
    background: #6600AA;
    color: #fff;
    text-shadow: 1px 0 1px #795c19;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 18px;
    margin-top: 15px;
  }
</style>
