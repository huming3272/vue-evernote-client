<template>
  <div class="note-sidebar ":class="fold?'do-fold':''">
    <div class="fold" @click="fold=!fold">
      <i :class="fold?'el-icon-arrow-right':'el-icon-arrow-left'"></i>
    </div>
    <span class="btn add-note" @click="onAddNote">添加笔记</span>
    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{curBook.title?curBook.title:'暂无笔记'}} <i class="iconfont icon-down" v-show=curBook.title></i>
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
        fold: true,
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
        }
      },
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
  .do-fold{
    left: 0px !important;
  }

  .fold{
    i{
      font-size: 18px;
      color:#333;
    }
    display:none;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 20px;
    position:absolute;
    right: -21px;
    top: 44px;
    background: #eee;
  }
  @media screen and (max-width: 820px){
    .fold{
      display: flex !important;
    }
    .do-fold{
      left: -230px !important;
    }
    .note-sidebar{
      width: 230px;
      position: absolute !important;
    }
  }
</style>

