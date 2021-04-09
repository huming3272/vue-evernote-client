<template>
  <div id="note" class="detail">
    <NoteSidebar @update:notes="val => notes = val"></NoteSidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请创建后并选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: {{curNote.createdAtFriendly}}</span>
          <span> 更新日期: {{curNote.updatedAtFriendly}}</span>
          <span> {{statusText}}</span>
          <span :class="{previewType:true,editor:isShowPreview,pre:!isShowPreview}">{{preview}}</span>
          <span class="iconfont el-icon-delete" @click="onDeleteNote"></span>
          <i class="iconfont" :class="isShowPreview ? 'el-icon-edit':'el-icon-view'" @click="previewSwitch"></i>
        </div>
        <div class="note-title">
          <input type="text" v-model:value="curNote.title" @input="onUpdateNote" @keydown="statusText='正在输入...'"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="isShowPreview" v-model:value="curNote.content" @input="onUpdateNote"
                    @keydown="statusText='正在输入...'" placeholder="输入内容, 支持 markdown 语法"></textarea>
<!--          <codemirror v-show="isShowPreview" :options="cmOptions" v-model="curNote.content" @input="onUpdateNote" @inputRead="statusText='正在输入...'"-->
<!--                     placeholder="输入内容, 支持 markdown 语法"></codemirror>-->
          <div class="preview markdown-body" v-html="previewContent" v-show="!isShowPreview">
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import authorise from '@/api/authorise.js';
  import NoteSidebar from "@/components/NoteSidebar.vue";
  import Bus from '@/support/bus.js'
  import _ from 'lodash'
  import notes from '@/api/notes.js'
  import MarkdownIt from 'markdown-it'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import { codemirror } from 'vue-codemirror'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/mode/markdown/markdown.js'
  import 'codemirror/theme/neat.css'

  let md = new MarkdownIt()

  export default {
    name: "NoteDetail",
    components: {
      NoteSidebar,
      codemirror
    },
    data() {
      return {
        // curNote: {},
        // notes: [],
        statusText: '笔记未改动',
        preview: '编辑模式',
        isShowPreview: true,
        cmOptions:{
          tabSize:4,
          mode:'text/x-markdown',
          theme:'neat',
          lineNumbers:false,
          line: true,
        },
      }
    },
    computed: {
      previewContent() {
        return md.render(this.curNote.content || '')
      },
      ...mapGetters([
        'notes', 'curNote','curBook'
      ])
    },

    methods: {
      ...mapMutations([
        'setCurNote'
      ]),
      ...mapActions([
        'updateNote', 'deleteNote',
      ]),
      // deleteNote() {
      //   notes.deleteNote(this.curNote.id).then((res) => {
      //     this.notes.splice(this.notes.indexOf(this.curNote), 1)
      //     this.$message({
      //       type: 'success',
      //       message: res.msg
      //     });
      //     this.$router.replace({path: '/note'})
      //   }).catch((err) => {
      //     console.error(err)
      //   })
      // },
      onDeleteNote() {

          this.$confirm('此操作将把此笔记放入回收站, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteNote({noteId: this.curNote.id}).then(()=>{
              this.setCurNote({})
              //因为使用了删除选项，之前选中的那个笔记不存在于列表中，所以默认传入空对象，计算后取数组中第0个的属性
              if(this.curBook.id&&this.curNote.id) {
                this.$router.replace({path: `/note?notebookId=${this.curBook.id}&noteId=${this.curNote.id}`})
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

      onUpdateNote: _.debounce(function () {
        if(!this.curNote.id){
          console.log('已拦截')
          return
        }
        this.updateNote({
          noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content,
        })
          this.statusText = '已保存'

          , 300
      })
      ,
      previewSwitch() {
        console.log('编辑',this.curNote.content)
        this.isShowPreview = !this.isShowPreview
        this.preview = this.isShowPreview ? '编辑模式' : '预览模式'
      }
    }
    ,
    beforeRouteUpdate(to, from, next) {
      // console.log('to',to)
      // console.log('from',from)

      //因为NoteDetails的this.notes是对notesidebar的this.notes的引用，内存地址相同，
      // 所以修改this.curNote等于修改notesidebar的this.notes
      // this.curNote = this.notes.find((notebook) => {
      //   // console.log(notebook, '---', to.query.noteId)
      //   return notebook.id === parseInt(to.query.noteId)
      // }) || {}
      this.isShowPreview = true
      this.setCurNote({curNoteId: to.query.noteId})

      next()
    },

    created() {
      // authorise.getInfo().then(res => {
      //   if (!res.isLogin && this.$router.history.current.path != '/login') {
      //     // this.$router.push({name: 'login'})
      //     this.$router.push({path: '/login'})
      //   }
      // })


      // Bus.$once('notes', (val) => {
      //   this.curNote = val.find((notebook) => {
      //     return notebook.id === parseInt(this.$route.query.noteId)
      //   }) || {}
      //   // console.log('note有没有detail',val)
      // })


    },
  }
</script>

<style lang='less' scoped>
  @import url(../assets/css/note-detail.less);

  #note {
    display: flex;
    align-items: stretch;
    background-color: #fff;
    flex: 1;
  }
</style>
