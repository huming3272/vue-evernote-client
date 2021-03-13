<template>
  <div>
    {{msg}}||{{$route.params.noteId}}
  </div>
</template>

<script>
  import authorise from '@/api/authorise.js'
  export default {
    name: "TrashDetail",
    data() {
      return {
        msg: '回收站'
      }
    },
    created(){
      authorise.getInfo().then(res=>{
        if(!res.isLogin&&this.$router.history.current.path!='/login'){
          this.$router.push({name: 'login'})
        }
      })
    }
  }
</script>

<style scoped>

</style>
