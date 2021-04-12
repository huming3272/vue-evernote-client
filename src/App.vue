<template>
  <div id="app">
    <SideBar></SideBar>
    <router-view class="some"/>
  </div>
</template>

<script>
  import SideBar from '@/components/SideBar.vue'

  export default {
    name: 'App',
    data() {
      return {}
    },
    components: {
      SideBar
    }
  }
</script>

<style>
  @import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';
  @import url("//unpkg.com/element-ui@2.15.1/lib/theme-chalk/index.css");
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #app {
    display: flex;
    align-items: stretch;
  }

  .some {
    /*margin-left: 57px;*/
  }

  html, body, #app {
    height: 100%;
  }

  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 14px;
    background-color: #eee;
  }

  a {
    text-decoration: none;
    color: #444;
  }

  ul, li {
    list-style: none;
  }

  .btn {
    color: #666;
    font-size: 12px;
    padding: 2px 4px;
    background-color: #fff;
    box-shadow: 0px 0px 2px 0px #ccc;
    border: none;
    cursor: pointer;
    display: inline-block;
  }

  @media screen and (max-width:820px){
    .el-message{
      width: 280px !important;
      max-width: 300px !important;
      min-width: 0 !important;
    }
    .el-message-box{
      width: 300px !important;
    }
  }
</style >
