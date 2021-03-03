<template>
    <div>
      {{msg}}{{$route.params.noteId}}
    </div>
</template>

<script>
    export default {
        name: "NoteDetail",
        data(){
          return {
            msg: '笔记本详情'
          }
        }
    }
</script>

<style scoped>

</style>
