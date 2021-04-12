<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main">
            <img :src="img" alt="">
          </div>
          <div class="form">
            <h3 @click="showRegister">创建账户</h3>
            <transition name="slide">
              <div v-show="isShowRegister" class="register">
                <input type="text" v-model="register.username" placeholder="用户名">
                <input type="password" v-model="register.password" placeholder="密码">
                <p v-bind:class="{error: register.isError}"> {{register.notice}}</p>
                <div class="button" @click="onRegister">创建账号</div>
              </div>
            </transition>

            <h3 @click="showLogin">登录</h3>
            <transition name="slide">
              <div v-show="isShowLogin" class="login">
                <input type="text" v-model="login.username" placeholder="输入用户名">
                <input type="password" v-model="login.password" placeholder="密码">
                <p v-bind:class="{error: login.isError}"> {{login.notice}}</p>
                <div class="button" @click="onLogin"> 登录</div>
              </div>
            </transition>
          </div>
        </div>
        <div class="modal-container2">
          <div class="main">
            <img :src="img" alt="">
            <div class="form">
              <h3 @click="showRegister">创建账户</h3>
              <transition name="slide">
                <div v-show="isShowRegister" class="register">
                  <input type="text" v-model="register.username" placeholder="用户名">
                  <input type="password" v-model="register.password" placeholder="密码">
                  <p v-bind:class="{error: register.isError}"> {{register.notice}}</p>
                  <div class="button" @click="onRegister">创建账号</div>
                </div>
              </transition>

              <h3 @click="showLogin">登录</h3>
              <transition name="slide">
                <div v-show="isShowLogin" class="login">
                  <input type="text" v-model="login.username" placeholder="输入用户名">
                  <input type="password" v-model="login.password" placeholder="密码">
                  <p v-bind:class="{error: login.isError}"> {{login.notice}}</p>
                  <div class="button" @click="onLogin"> 登录</div>
                </div>
              </transition>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import authorise from '@/api/authorise.js'
  import Bus from '@/support/bus.js'
  import {mapGetters, mapActions} from 'vuex'
  import driftingBottle from '@/assets/img/bottle.jpg'

  export default {
    data() {
      return {
        img: driftingBottle,
        isShowLogin: true,
        isShowRegister: false,
        login: {
          username: '',
          password: '',
          notice: '输入用户名和密码',
          isError: false
        },
        register: {
          username: '',
          password: '',
          notice: '创建账号后，请记住用户名和密码',
          isError: false
        }
      }
    },

    methods: {
      ...mapActions([
        'Login', 'Register'
      ]),
      showLogin() {
        this.isShowLogin = true
        this.isShowRegister = false
      },
      showRegister() {
        this.isShowLogin = false
        this.isShowRegister = true
      },

      checkUserName(username) {
        return /^[\w\u4e00-\u9fa5]{3,15}$/.test(username)
      },
      checkPassword(password) {
        return /^.{6,16}$/.test(password)
        //RegExp.test()用来确认括号内的字符串是否包含符合规则中的值
      },
      onRegister() {
        if (!this.checkUserName(this.register.username)) {
          this.register.isError = true
          this.register.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
          return
        }
        if (!this.checkPassword(this.register.password)) {
          this.register.isError = true
          this.register.notice = '密码长度为6~16个字符'
          return
        }

        this.Register({
          username: this.register.username,
          password: this.register.password
        }).then(res => {
          console.log('register', res)
          this.register.isError = false
          this.register.notice = ''
          this.$router.push({path: '/notebooks'})
        }).catch(
          (data) => {
            this.register.isError = true
            this.register.notice = data.msg
          }
        )
      },
      onLogin() {
        //默认账户密码hunger 123456
        if (!this.checkUserName(this.login.username)) {
          this.login.isError = true
          this.login.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
          return
        }
        if (!this.checkPassword(this.login.password)) {
          this.login.isError = true
          this.login.notice = '密码长度为6~16个字符'
          return
        }
        this.login.isError = false
        this.login.notice = ''

        console.log(`start login..., username: ${this.login.username} , password: ${this.login.password}`)
        this.Login({
          username: this.login.username,
          password: this.login.password
        }).then(() => {
          // Bus.$emit('userInfo',{username:this.login.username})
          this.$router.push({path: '/notebooks'})
        }).catch(
          (data) => {
            this.login.isError = true
            this.login.notice = data.msg
          }
        )

      },
      doit() {
        if (this.isShowRegister) {
          this.onRegister()
          return
        }
        if (this.isShowLogin) {
          this.onLogin()
          return
        }
      }
    },
    mounted() {
      document.body.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          this.doit()
        }
      }, false)
    }

  }

</script>

<style lang="less" scoped>
  /*<style  scoped>*/
  .modal-mask {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 800px;
    height: 500px;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    display: flex;

    .main {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      background: #226DDD;

      img {
        width: 100%;
        height: auto;
      }
    }

    .form {
      width: 270px;
      border-left: 1px solid #ccc;
      overflow: hidden;

      h3 {
        padding: 10px 20px;
        margin-top: -1px;
        font-weight: normal;
        font-size: 16px;
        border-top: 1px solid #eee;
        cursor: pointer;

        &:nth-of-type(2) {
          border-bottom: 1px solid #eee;
        }
      }

      .button {
        background-color: #226DDD;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-weight: bold;
        color: #fff;
        border-radius: 4px;
        margin-top: 18px;
        cursor: pointer;
      }

      .login, .register {
        padding: 0px 20px;
        border-top: 1px solid #eee;
        /*height: 0;*/
        overflow: hidden;
        transition: all .4s;


        input {
          display: block;
          width: 100%;
          height: 35px;
          line-height: 35px;
          padding: 0 6px;
          border-radius: 4px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 14px;
          margin-top: 10px;
        }

        input:focus {
          border: 3px solid #9dcaf8;
        }

        p {
          font-size: 12px;
          margin-top: 10px;
          color: #444;
        }

        .error {
          color: red;
        }
      }

      .slide-enter-active, .slide-leave-active {
        height: 170px;
      }

      .slide-enter, .slide-leave-to {

        height: 0px;
      }

    }
  }

  .modal-container2 {
    display: none;
    width: 100%;
    height: 100%;
    margin: 0px auto;

    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    justify-content:center;
    align-items: center;

    .main {
      position:relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      background: #226DDD;
      height: 80vh;

      img {
        width: auto;
        height: 80%;
        position:absolute;
        z-index:0;
      }
      .form {
        width: 270px;
        border-left: 1px solid #ccc;

        position:relative;
        z-index:1;
        overflow: hidden;
        background: rgba(255,255,255,0.5);
        h3 {
          padding: 10px 20px;
          margin-top: -1px;
          font-weight: normal;
          font-size: 16px;
          border-top: 1px solid #eee;
          cursor: pointer;

          &:nth-of-type(2) {
            border-bottom: 1px solid #eee;
          }
        }

        .button {
          background-color: #226DDD;
          height: 36px;
          line-height: 36px;
          text-align: center;
          font-weight: bold;
          color: #fff;
          border-radius: 4px;
          margin: 18px 0 0 0;
          cursor: pointer;
        }

        .login, .register {
          padding:0 20px 20px 20px;
          border-top: 1px solid #eee;
          /*height: 0;*/
          overflow: hidden;
          transition: all .4s;


          input {
            display: block;
            width: 100%;
            height: 35px;
            line-height: 35px;
            padding: 0 6px;
            border-radius: 4px;
            border: 1px solid #ccc;
            outline: none;
            font-size: 14px;
            margin-top: 10px;
          }

          input:focus {
            border: 3px solid #9dcaf8;
          }

          p {
            font-size: 12px;
            margin-top: 10px;
            color: #444;
          }

          .error {
            color: red;
          }
        }

        .slide-enter-active, .slide-leave-active {
          height: 191px;
        }

        .slide-enter, .slide-leave-to {
          height: 0px;
          padding-bottom:0px;
        }
      }
    }


  }
  @media screen and (max-width: 820px) {

    .modal-container {
      display: none;
    }

    .modal-container2 {
      display: flex;
    }
  }

</style>

