<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes" :key="note.id" :data-id="note.id">
          <router-link :to="`/trash?notebookId=${note.notebookId}&noteId=${note.id}`">
            <span class="date">{{note.updatedAtFriendly}}</span>
            <span class="title">{{note.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-detail-ct">
        <div class="note-bar">
          <span> 创建日期: {{curTrashNote.createdAtFriendly}}</span>
          <span>|</span>
          <span> 更新日期: {{curTrashNote.updatedAtFriendly}}</span>
          <span>|</span>
          <span>所属笔记本:{{belongTo}}</span>
          <a class="btn action" @click="onRevertNote">恢复笔记</a>
          <a class="btn action" @click="onDeleteTrash">彻底删除</a>
        </div>
        <div class="note-title">
          <span>{{curTrashNote.title}}</span>
        </div>
        <div class="editor">
          <div class="preview markdown-body" v-html="previewContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  import trash from "@/api/trash.js";
  import MarkdownIt from 'markdown-it'

  let md = new MarkdownIt()


  export default {
    name: "TrashDetail",
    data() {
      return {
        msg: '回收站',
        // previewContent: '',
      }
    },
    methods: {
      ...mapMutations([
        'setCurTrashNoteId'
      ]),
      ...mapActions([
        'checkLogin', 'getTrash', 'getNotebooks', 'deleteTrash', 'revertNote'
      ]),
      onDeleteTrash() {

        this.$confirm('此操作将把笔记彻底删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteTrash({curTrashNoteId: this.curTrashNote.id})
            .then(() => {
              this.setCurTrashNoteId({curTrashNoteId: this.curTrashNote.id})
              if (this.curTrashNote.notebookId && this.curTrashNote.id) {
                this.$router.replace({path: `/trash?notebookId=${this.curTrashNote.notebookId}&noteId=${this.curTrashNote.id}`})
              } else {
                this.$router.replace({path: '/trash'})
              }
            })

          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      onRevertNote() {
        return this.revertNote({curTrashNoteId: this.curTrashNote.id})
          .then(() => {
            this.setCurTrashNoteId({curTrashNoteId: this.curTrashNote.id})
            console.log(this.curTrashNote)
            if (this.curTrashNote.notebookId && this.curTrashNote.id) {
              this.$router.replace({path: `/trash?notebookId=${this.curTrashNote.notebookId}&noteId=${this.curTrashNote.id}`})
            } else {
              this.$router.replace({path: '/trash'})
            }
          })
      }
    },
    computed: {
      ...mapGetters([
        'trashNotes',
        'curTrashNote',
        'belongTo',
      ]),
      previewContent() {
        return md.render(this.curTrashNote.content || '')
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.setCurTrashNoteId({curTrashNoteId: to.query.noteId})
      next()
    },
    created() {
      this.checkLogin({path: 'login'})
      this.getNotebooks().then(() => {
        return this.getTrash().then(() => {
          this.setCurTrashNoteId({curTrashNoteId: this.$route.query.noteId})
          if (this.curTrashNote.notebookId && this.curTrashNote.id) {
            this.$router.replace({path: `/trash?notebookId=${this.curTrashNote.notebookId}&noteId=${this.curTrashNote.id}`})
          } else{
            this.$router.replace({path: '/trash'})
          }
        })
      })

    },

  }
</script>

<style lang="less" scoped>
  @import url(../assets/css/note-sidebar.less);
  @import url(../assets/css/note-detail.less);

  #trash {
    display: flex;
    align-items: stretch;
    background-color: #fff;
    flex: 1;
  }

  .note-bar {
    .action {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;
    }
  }
</style>
