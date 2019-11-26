<template>
  <div class="app-container">
    <div class="edit-form">
      <el-form :model="formInline">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="作者:">
              <el-input v-model="formInline.user" placeholder="作者"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="日期:">
              <el-date-picker
                v-model="formInline.date"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="评分:">
              <div class="rate-group">
                <el-rate 
                  v-model="formInline.rateVal"
                  :colors="formInline.colors"
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
            v-model="textarea">
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
export default {
  name: 'Edit',
  data() {
    return {
      formInline: {
        user: '',
        date: '',
        textarea: '',
        rateVal: null,
        colors: ['#99A9BF', '#F7BA2A', '#f00'] 
      }
    }
  }
}
</script>

<style lang="scss" scope>
.edit-form{
  background:#fff;padding:10px 20px;
  .rate-group{
    width:100%;display:block
  }
  .btn-group{
    text-align: right;
  }
}
</style>
