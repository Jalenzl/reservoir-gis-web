<template>
  <div class="velocityThreshold-wrapper">
    <div class="velocityThreshold-content">
      <SideBarComp/>
      <div class="velocityThreshold-content-main">
        <HomeMain>
          <ThresholdOilVelocityLayer1 @getLayerNo="getLayerNo" v-if="layerNumber === 1"/>
          <ThresholdOilVelocityLayer3 @getLayerNo="getLayerNo" v-if="layerNumber === 3"/>
          <ThresholdOilVelocityLayer4 @getLayerNo="getLayerNo" v-if="layerNumber === 4"/>
          <ThresholdOilVelocityLayer6 @getLayerNo="getLayerNo" v-if="layerNumber === 6"/>
          <ThresholdOilVelocityLayer7 @getLayerNo="getLayerNo" v-if="layerNumber === 7"/>
        </HomeMain>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import SideBarComp from "@/components/home/SideBarComp.vue";
import HomeMain from "@/components/home/HomeMain.vue";
import ThresholdOilVelocityLayer1
  from "@/components/flowVelocity-thematic/threshold/oil/ThresholdOilVelocityLayer1.vue";
import ThresholdOilVelocityLayer3
  from "@/components/flowVelocity-thematic/threshold/oil/ThresholdOilVelocityLayer3.vue";
import ThresholdOilVelocityLayer4
  from "@/components/flowVelocity-thematic/threshold/oil/ThresholdOilVelocityLayer4.vue";
import ThresholdOilVelocityLayer6
  from "@/components/flowVelocity-thematic/threshold/oil/ThresholdOilVelocityLayer6.vue";
import ThresholdOilVelocityLayer7
  from "@/components/flowVelocity-thematic/threshold/oil/ThresholdOilVelocityLayer7.vue";


const layerNumber = ref(1);
const getLayerNo = layerNo => layerNumber.value = layerNo
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