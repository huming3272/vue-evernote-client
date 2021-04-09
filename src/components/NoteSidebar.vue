<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote">添加笔记</span>
    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{curBook.title}} <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id" :key="notebook.id">{{notebook.title}}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id" :data-id="note.id">
        <router-link :to="`/note?notebookId=${curBook.id}&noteId=${note.id}`">
          <span class="date">{{note.updatedAtFriendly}}</span>
          <span class="title">{{note.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import notes from '@/api/notes.js'
  // import notebooks from '@/api/notebooks.js'
  import Bus from "@/support/bus.js"
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    name: "NoteSidebar.vue",
    // props:['notes'],
    data() {
      return {
        // notebooks: [],
        // notes: [],
        // curBook: {},
      }
    },
    computed: {
      ...mapGetters([
        'notebooks',
        'notes',
        'curBook',
        'curBookId',
        'curNote'
      ]),
    },
    methods: {
      ...mapMutations([
        'setCurBook',
        'setCurNote',
      ]),
      ...mapActions([
        'getNotes', 'addNote', 'getNotebooks'
      ]),
      onAddNote() {
        this.addNote({notebookId: this.curBook.id, title: '新建笔记'}).then(() => {
          this.setCurNote({})
          this.$router.replace({path: `/note?notebookId=${this.curBook.id}&noteId=${this.curNote.id}`})
        })

      },
      handleCommand(notebookId) {

        if (notebookId === 'trash') {
          return this.$router.push({path: '/trash',})
        } else {
          // this.curBook = this.notebooks.find((notebook) => {
          //   return notebook.id === parseInt(notebookId)
          // })
          // this.$router.push({path: '/note', query: {notebookId}})

          this.$store.commit('setCurBook', {curBookId: notebookId})

          this.setCurNote({})
          //为了切换时默认选中第一个笔记
          this.getNotes({notebookId}).then(() => {
            if (this.curBook.id && this.curNote.id) {
              this.$router.replace({path: `/note?notebookId=${this.curBook.id}&noteId=${this.curNote.id}`})
            }
          })
          // console.log('side',notebookId)
          // notes.getAll(notebookId).then((res) => {
          //   this.notes = res.data
          //   // console.log('新的单个笔记', this.notes)
          //   this.$emit('update:notes',this.notes)
          // })


        }

      },
      // addNote() {
      //   console.log(this.curBook,{title:'新建笔记', content: ''})
      //   notes.addNote(this.curBook.id).then((res)=>{
      //     this.notes.unshift(res.data)
      //     this.$message({
      //       type: 'success',
      //       message: res.msg
      //     });
      //   }).catch((err)=>{
      //     console.error(err)
      //   })
      //
      // }
    },
    created() {

      this.getNotebooks()
        .then(() => {
          this.setCurBook({curBookId: this.$route.query.notebookId})
          return this.getNotes({notebookId: this.curBook.id})
            .then(() => {
              this.setCurNote({curNoteId: this.$route.query.noteId})
              // this.$router.replace({path:`/note?notebookId=${this.curBook.id}&noteId=${this.curNote.id}`})
              if (this.curBook.id && this.curNote.id) {
                this.$router.replace({path: `/note?notebookId=${this.curBook.id}&noteId=${this.curNote.id}`})
              }
            })
        })

    }
  }
</script>


<style lang="less" scoped>
  @import url(../assets/css/note-sidebar.less);

</style>

