<template>
  <div class="velocityThreshold-wrapper">
    <div class="velocityThreshold-content">
      <SideBarComp/>
      <div class="velocityThreshold-content-main">
        <HomeMain>
          <ThresholdOilVelocityLayer1 @getPicker="getPicker" v-if="layerNumber == 1 && type == 'oil'"/>
          <ThresholdOilVelocityLayer3 @getPicker="getPicker" v-if="layerNumber == 3 && type == 'oil'"/>
          <ThresholdOilVelocityLayer4 @getPicker="getPicker" v-if="layerNumber == 4 && type == 'oil'"/>
          <ThresholdOilVelocityLayer6 @getPicker="getPicker" v-if="layerNumber == 6 && type == 'oil'"/>
          <ThresholdOilVelocityLayer7 @getPicker="getPicker" v-if="layerNumber == 7 && type == 'oil'"/>
          <ThresholdWaterVelocityLayer1 @getPicker="getPicker" v-if="layerNumber == 1 && type == 'water'"/>
          <ThresholdWaterVelocityLayer3 @getPicker="getPicker" v-if="layerNumber == 3 && type == 'water'"/>
          <ThresholdWaterVelocityLayer4 @getPicker="getPicker" v-if="layerNumber == 4 && type == 'water'"/>
          <ThresholdWaterVelocityLayer6 @getPicker="getPicker" v-if="layerNumber == 6 && type == 'water'"/>
          <ThresholdWaterVelocityLayer7 @getPicker="getPicker" v-if="layerNumber == 7 && type == 'water'"/>
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
import ThresholdWaterVelocityLayer1
  from "@/components/flowVelocity-thematic/threshold/water/ThresholdWaterVelocityLayer1.vue";
import ThresholdWaterVelocityLayer3
  from "@/components/flowVelocity-thematic/threshold/water/ThresholdWaterVelocityLayer3.vue";
import ThresholdWaterVelocityLayer4
  from "@/components/flowVelocity-thematic/threshold/water/ThresholdWaterVelocityLayer4.vue";
import ThresholdWaterVelocityLayer6
  from "@/components/flowVelocity-thematic/threshold/water/ThresholdWaterVelocityLayer6.vue";
import ThresholdWaterVelocityLayer7
  from "@/components/flowVelocity-thematic/threshold/water/ThresholdWaterVelocityLayer7.vue";


const layerNumber = ref(1);
const type = ref("oil");
const getPicker = picker => {
  layerNumber.value = picker.layerNo
  type.value = picker.type
}
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