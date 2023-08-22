<template>
  <div class="pressureFieldMap-wrapper">
    <div class="pressureFieldMap-content">
      <SideBarComp/>
      <div class="pressureFieldMap-content-main">
        <HomeMain>
          <FlowVelocityMainComp />
        </HomeMain>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeMain from "@/components/home/HomeMain.vue";
import SideBarComp from "@/components/home/SideBarComp.vue";
import FlowVelocityMainComp from "@/components/flowVelocity-thematic/FlowVelocityMainComp.vue";
</script>

<style scoped lang="scss">
.pressureFieldMap-content {
  display: flex;

  &-main {
    flex: 1;
    padding: 10px;
    height: 100vh;
  }
}
</style>