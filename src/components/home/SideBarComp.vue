<template>
  <div class="sidebar">
    <el-radio-group
        v-model="isCollapse"
        style="margin-bottom: 10px; margin-left: 10px; margin-top: 10px; width: 170px"
        v-show="isShow"
    >
      <el-radio-button :label="false">expand</el-radio-button>
      <el-radio-button :label="true" @click="hideButton">collapse</el-radio-button>
    </el-radio-group>
    <el-menu
        default-active="2"
        class="el-menu-vertical"
        :router=true
        :collapse="isCollapse"
        @open="handleOpen"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <DataBoard/>
          </el-icon>
          <span>属性场图展示</span>
        </template>
        <el-menu-item index="/pressureFiledMap">压力</el-menu-item>
        <el-menu-item index="/thematic2">属性2</el-menu-item>
        <el-menu-item index="1-3">属性3</el-menu-item>
        <el-menu-item index="1-4">属性4</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <document/>
          </el-icon>
          <span>数据查询</span>
        </template>
        <el-menu-item index="/table1">压力</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <TrendCharts/>
          </el-icon>
          <span>专题图表</span>
        </template>
        <el-menu-item index="/table1">流场分析</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon>
            <Setting/>
          </el-icon>
          <span>专题分析</span>
        </template>
        <el-menu-item index="/krigingPressureFiledMap">克里金插值动态场图</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {
  Document,
  Setting,
  TrendCharts,
  DataBoard
} from '@element-plus/icons-vue'
import {ref} from "vue";

const isCollapse = ref(true)
let isShow = ref(false)

const showButton = () => {
  setTimeout(() => {
    isShow.value = true
  }, 300)
  isCollapse.value = false
}
const hideButton = () => {
  isShow.value = false
}
const handleOpen = () => {
  showButton()
}

</script>

<style scoped lang="scss">
.sidebar {
  min-height: calc(100vh - 60px);

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
    height: 100vh;
  }

}
</style>