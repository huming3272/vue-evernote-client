<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <!--          "{name: 'note', query: { noteId: notebook.id }}"-->
          <router-link v-for="notebook in notebooks" :to="`/note?notebookId=${notebook.id}`"
                       :data-uid="notebook.id" :key="notebook.id" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{notebook.friendlyCreatedAt}}</span>
            </div>
          </router-link>
        </div>
      </div>

    </main>

  </div>
</template>

<script>
  import notebooks from '@/api/notebooks.js'
  import authorise from '@/api/authorise.js'
  import friendlyDate from '@/support/until.js'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "notebookList",
    data() {
      return {

      }
    },
    computed:{
      ...mapGetters([
        'notebooks'
      ])
    },
    created() {
      // authorise.getInfo().then(res => {
      //   if (!res.isLogin && this.$router.history.current.path != '/login') {
      //     this.$router.push({path: '/login'})
      //   }
      // })


        this.getNotebooks()


      // window.notebooks = notebooks
    },
    methods: {
      ...mapActions([
        'getNotebooks',
        'addNotebook',
        'updateNotebook',
        'deleteNotebook',

      ]),
      onCreate(notebook) {
        this.$prompt('请输入笔记本标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: '笔记本标题不能为空，且不超过30个字符'
        }).then(({value}) => {
          this.addNotebook({title:value})
        }).catch((res) => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
          console.log(res)
        });
      },
      onEdit(notebook) {
        let resMsg = ''
        this.$prompt('请输入笔记本标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,30}$/,
          inputValue: notebook.title,
          // inputErrorMessage: '笔记本标题不能为空，且不超过30个字符'
        }).then(({value}) => {

          this.updateNotebook({notebookId:notebook.id,title:value})
        }).catch((res) => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });

          console.log(res)
        });

      },
      onDelete(notebook) {
        this.$confirm('即将删除笔记本标题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {

          this.deleteNotebook(notebook)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    }
  }
</script>

<style lang="less" scoped>
  @import url(../assets/css/notebook-list.less);
</style>
