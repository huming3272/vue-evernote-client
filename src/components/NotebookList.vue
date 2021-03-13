<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" :to="{name: 'note', params: { noteId: notebook.id }} "
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

  export default {
    name: "msgbooks",
    data() {
      return {
        notebooks: []
      }
    },
    created() {
      authorise.getInfo().then(res => {
        if (!res.isLogin && this.$router.history.current.path != '/login') {
          this.$router.push({name: 'login'})
        }
      })
      notebooks.getAll().then(res => {
        this.notebooks = res.data
        console.log(this.notebooks)
      })

      // window.notebooks = notebooks
    },
    methods: {
      onCreate(notebook) {

        this.$prompt('请输入笔记本标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: '笔记本标题不能为空，且不超过30个字符'
        }).then(({value}) => {
          notebooks.addNoteBooks({title: value}).then(
            res => {
              res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
              this.notebooks.unshift(res.data)
            }
          ).catch((err) => {
            console.error(err.data)
          })
          this.$message({
            type: 'success',
            message: '标题为: ' + value
          });

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
          inputPattern: /^.{1,35}$/,
          inputValue: notebook.title,
          // inputErrorMessage: '笔记本标题不能为空，且不超过30个字符'
        }).then(({value}) => {
          this.$message({
            type: 'success',
            message: '成功修改为: ' + value
          });
          notebooks.updateNoteBooks(notebook.id, {title: value}).then(
            (res) => {
              notebook.title = value
              // alert(res.msg)
            }
          ).catch((err) => {
            console.error(err.data)
            // this.$message({showClose: true, message: '错误:' + err.msg, type: 'error'})
          })
        }).catch((res) => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });

          console.log(res)
        });
        // let title = window.prompt('修改标题',notebook.title)
        // if (title.trim() === '') {
        //   alert('请输入修改内容')
        // }
        // notebooks.updateNoteBooks(notebook.id,{title:title}).then(
        //   (res) =>{
        //     notebook.title = title
        //     alert(res.msg)
        //   }
        // )
      },
      onDelete(notebook) {
        this.$confirm('即将删除笔记本标题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          notebooks.deleteNoteBooks(notebook.id).then(
            (res) => {
              this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
              this.$message({
                type: 'success',
                message: res.msg,
              });
            }
          ).catch((err)=>{
            console.log(err)
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        // notebooks.deleteNoteBooks(notebook.id).then(
        //   (res) => {
        //     this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
        //     alert(res.msg)
        //   }
        // )
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url(../assets/css/notebook-list.less);
</style>
