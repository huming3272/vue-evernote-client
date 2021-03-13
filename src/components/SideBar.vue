<template>
  <div id="sidebar">
    <Avatar></Avatar>
    <div class="icons">
      <router-link to="/note/1" title="笔记"><i class="iconfont icon-note"></i></router-link>
      <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i></router-link>
      <router-link to="/trash/" title="回收站"><i class="iconfont icon-trash"></i></router-link>
    </div>
    <div class="logout" @click="logOut">
      <i class="iconfont icon-logout"></i>
    </div>
  </div>
</template>

<script>
  import Avatar from '@/components/Avatar.vue'
  import authorise from '@/api/authorise.js'

  export default {
    name: 'SlideBar',
    data() {
      return {}
    },
    components: {
      Avatar
    },
    mounted() {
      console.log('sideBar启动了')
    },
    methods: {
      logOut() {
        authorise.loginOut().then(() => {
          this.$router.push({name: 'login'})
        })


      }
    }
  }

</script>

<style lang="less" scoped>

  #sidebar {
    position: relative;
    position: fixed;
    height: 100vh;
    width: 56px;
    text-align: center;
    background-color: #2c333c;
    border: 1px solid yellow;

    .icons {
      margin-top: 15px;


      a {
        padding: 6px 0;
        display: block;
      }

      .router-link-active {
        background-color: #5e6266;
      }


    }


    .logout {
      position: absolute;
      bottom: 20px;
      width: 100%;
      text-align: center;
      cursor: pointer;
    }

    .iconfont {
      color: #fff;
    }
  }


</style>
