<template>
    <div>
      笔记本详情页面{{msg}}
    </div>
</template>

<script>
  import authorise from '@/api/authorise.js'
    export default {
        name: "NoteDetail",
        data(){
          return {
            msg: '笔记本详情'
          }
        },
      created(){
        authorise.getInfo().then(res=>{
          if(!res.isLogin&&this.$router.history.current.path!='/login'){
            this.$router.push({name: 'login'})
          }
        })
        console.log('note',this.$router)
      },
      mounted(){

      }
    }
</script>

<style scoped>

</style>
