<template>
  <div class="velocityThreshold-wrapper">
    <div class="velocityThreshold-content">
      <SideBarComp/>
      <div class="velocityThreshold-content-main">
        <HomeMain>
          <ThresholdOilVelocityLayer1 />
        </HomeMain>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBarComp from "@/components/home/SideBarComp.vue";
import HomeMain from "@/components/home/HomeMain.vue";
import ThresholdOilVelocityLayer1
  from "@/components/flowVelocity-thematic/threshold/oil/ThresholdOilVelocityLayer1.vue";

</script>

<style scoped lang="scss">
.velocityThreshold-content {
  display: flex;

  &-main {
    flex: 1;
    padding: 10px;
    height: 100vh;
  }
}
</style>