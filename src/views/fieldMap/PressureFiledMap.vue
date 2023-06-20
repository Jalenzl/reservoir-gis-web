<template>
  <div class="pressureFieldMap-wrapper">
<!--    <HeaderComp/>-->
    <div class="pressureFieldMap-content">
      <SideBarComp/>
      <div class="pressureFieldMap-content-main">
        <HomeMain>
          <PressureLayer1/>
        </HomeMain>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import HeaderComp from "@/components/home/HeaderComp.vue";
import SideBarComp from "@/components/home/SideBarComp.vue";
import HomeMain from "@/components/home/HomeMain.vue";
import PressureLayer1 from "@/components/pressure-fieldmaps/PressureLayer1.vue";
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