<template>
  <div class="app-container">
    <div class="edit-form">
      <el-form :model="formInline">
        <el-row :gutter="25">
          <el-col :span="8">
            <el-form-item label="作者:">
              <el-input v-model="formInline.author" placeholder="作者"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="日期:">
              <div class="block-group">
                <el-date-picker
                  v-model="formInline.display_time"
                  type="datetime"
                  placeholder="选择日期时间"
                  >
                </el-date-picker>
              </div> 
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="评分:">
              <div class="block-group">
                <el-rate 
                  v-model="formInline.importance"
                  :colors="colors"
                >
                </el-rate> 
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="详细内容">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="formInline.content_short">
          </el-input>
        </el-form-item>
        <el-form-item class="btn-group">
          <el-button type="primary">保存更改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script >

import { fetchArticle } from '@/api/table'

const defaultForm = {
  id: undefined,
  title: '', // 标题
  author: '', // 作者
  display_time: '', // 日期
  content_short: '', // 内容摘要
  importance: null, // 评分
}

export default {
  name: 'Edit',
  data() {
    return {
      formInline: Object.assign({}, defaultForm),
      colors: ['#99A9BF', '#F7BA2A', '#f00']
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fatchList(id)
  },
  methods: {
    fatchList(id) {
      fetchArticle(id).then( response => {
        this.formInline = response.data
      })
    }
  }
}
</script>

<style lang="scss" scope>
.edit-form{
  background:#fff;padding:10px 20px;
  .block-group{
    width:100%;display:inline-block;position: relative;
  }
  .btn-group{
    text-align: right;
  }
  .el-date-editor.el-input{width:100%}
}

</style>
