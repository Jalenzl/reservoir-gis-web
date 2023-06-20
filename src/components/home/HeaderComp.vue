<!-- 主页Hear部分 -->
<template>
  <div class="header">
    <div class="header-logo">
      <span>油藏勘探开发空间数据可视化共享分析系统</span>
    </div>
    <div class="header-content">
      <div class="header-content-left"></div>
      <div class="header-content-right"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ccc;
  background-color: aliceblue;
  display: flex;

  &-logo {
    width: 400px;
    color: dodgerblue;
    font-weight: bold;
    padding-left: 20px;
    font-size: 18px;

    span {
      padding-left: 20px;
    }
  }

  &-content {
    flex: 1;
    display: flex;

    &-left {
      flex: 1;
    }

    &-right {
      width: 200px;
    }
  }
}
</style>