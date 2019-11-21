<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content bg-purple" @click="handleSetLineChartData('newVisitis')">1</div>
      </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple" @click="handleSetLineChartData('messages')">2</div>
      </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple" @click="handleSetLineChartData('purchases')">3</div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple" @click="handleSetLineChartData('shoppings')">4</div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'PanelGroup',
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>