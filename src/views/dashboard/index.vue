<template>
  <div class="dashboard-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
    <div class="chart-bg">
      <line-chart :chart-data="lineChartData"></line-chart>
    </div>
    <div class="table-bg">
      <h4>最新发的布文章列表</h4>
      <table-list class="table-list"></table-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import TableList from './components/table'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165, 120, 161, 104, 105, 160],
    actualData: [120, 82, 91, 154, 162, 140, 145, 82, 51, 154, 102, 180]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140, 192, 166, 144, 100, 130],
    actualData: [180, 160, 151, 106, 145, 150, 80, 60, 161, 106, 85, 150]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100, 170, 121, 104, 105, 140],
    actualData: [120, 90, 100, 138, 142, 130, 130, 90, 121, 124, 172, 90]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 167, 15, 121, 104, 59, 100],
    actualData: [120, 82, 91, 154, 162, 140, 130, 180, 101, 88, 105, 190]
  }
}

export default {
  name: 'Dashboard',
  components: {
    PanelGroup, LineChart, TableList
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-bg{
  background-color: #fff;padding-top: 20px;
}
.table-bg{
  background-color: #fff;padding:10px 30px 30px;margin:30px 0;
  h4{color:#565656}
}
.dashboard {
  &-container {
    margin: 30px;
  }
}
</style>
