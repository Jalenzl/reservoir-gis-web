<template>
  <div class="pressureFieldMap-wrapper">
    <div class="pressureFieldMap-content">
      <SideBarComp/>
      <div class="pressureFieldMap-content-main">
        <HomeMain>
          <PressureLayer1 @getLayerNo="getLayerNo" v-if="layerNumber === 1"/>
          <PressureLayer3 @getLayerNo="getLayerNo" v-if="layerNumber === 3"/>
          <PressureLayer4 @getLayerNo="getLayerNo" v-if="layerNumber === 4"/>
          <PressureLayer6 @getLayerNo="getLayerNo" v-if="layerNumber === 6"/>
          <PressureLayer7 @getLayerNo="getLayerNo" v-if="layerNumber === 7"/>
        </HomeMain>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import SideBarComp from "@/components/home/SideBarComp.vue";
import HomeMain from "@/components/home/HomeMain.vue";
import PressureLayer1 from "@/components/pressure-fieldmaps/PressureLayer1.vue";
import PressureLayer3 from "@/components/pressure-fieldmaps/PressureLayer3.vue";
import PressureLayer4 from "@/components/pressure-fieldmaps/PressureLayer4.vue";
import PressureLayer6 from "@/components/pressure-fieldmaps/PressureLayer6.vue";
import PressureLayer7 from "@/components/pressure-fieldmaps/PressureLayer7.vue";


const layerNumber = ref(1);
const getLayerNo = layerNo => layerNumber.value = layerNo
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