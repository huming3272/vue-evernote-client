<template>
  <div id="sidebar" :class="fold?'fold-sidebar':''">
    <div class="fold" @click="fold=!fold">
      <i :class="fold?'el-icon-arrow-right':'el-icon-arrow-left'"></i>
    </div>
    <Avatar></Avatar>
    <div class="icons">
      <router-link to="/note" title="笔记"><i class="iconfont icon-note"></i></router-link>
      <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i></router-link>
      <router-link to="/trash" title="回收站"><i class="iconfont icon-trash"></i></router-link>
    </div>
    <div class="logout" @click="logOut">
      <i class="iconfont icon-logout"></i>
    </div>
  </div>
</template>

<script>
  import Avatar from '@/components/Avatar.vue'
  import authorise from '@/api/authorise.js'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'SlideBar',
    data() {
      return {
        fold: true
      }
    },
    components: {
      Avatar
    },
    mounted() {
      // console.log('sideBar启动了')
    },
    methods: {
      // logOut() {
      //   authorise.loginOut().then(() => {
      //     this.$router.push({name: 'login'})
      //   })
      // }
      ...mapActions([
        'loginOut'
      ]),
      logOut() {

        this.$confirm('此操作将注销账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loginOut()
          this.$message({
            type: 'success',
            message: '注销成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销'
          });
        });
      }
    }
  }

</script>

<style lang="less" scoped>


  .fold-sidebar {
    margin: 0;
  }

  #sidebar {
    position: relative;

    left: 0;
    /*position: fixed;*/
    z-index: 10;
    height: 100vh;
    width: 56px;
    text-align: center;
    margin-left: 0;
    transition: all 0.5s;
    background: #226DDD;
    /*border: 1px solid yellow;*/

    .icons {
      margin-top: 15px;

      a {
        padding: 6px 0;
        display: block;
      }

      .router-link-active {
        background-color: #0044AA;
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

    .fold {
      i {
        font-size: 18px;
        color: #eee;
      }

      display: none;
      /*display: flex;*/
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 20px;
      position: absolute;
      right: -20px;
      top: 0;
      background: #226DDD;
    }
  }

  @media screen and (max-width: 820px) {

    .fold-sidebar {
      left: -56px !important;
    }

    #sidebar {
      position: absolute !important;
    }

    .fold {
      display: flex !important;
    }
  }

</style>
