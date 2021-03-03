<template>
  <div>
    {{msg}}||{{$route.params.noteId}}
  </div>
</template>

<script>
  export default {
    name: "TrashDetail",
    data() {
      return {
        msg: '回收站'
      }
    }
  }
</script>

<style scoped>

</style>
