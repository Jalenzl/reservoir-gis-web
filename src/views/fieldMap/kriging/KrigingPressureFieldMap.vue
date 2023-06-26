<template>
  <div class="pressureFieldMap-wrapper">
    <div class="pressureFieldMap-content">
      <SideBarComp/>
      <div class="pressureFieldMap-content-main">
        <HomeMain>
          <KrigingLayer1 @getLayerNo="getLayerNo" v-if="layerNumber === 1"/>
          <KrigingLayer3 @getLayerNo="getLayerNo" v-if="layerNumber === 3"/>
          <KrigingLayer4 @getLayerNo="getLayerNo" v-if="layerNumber === 4"/>
          <KrigingLayer6 @getLayerNo="getLayerNo" v-if="layerNumber === 6"/>
          <KrigingLayer7 @getLayerNo="getLayerNo" v-if="layerNumber === 7"/>
        </HomeMain>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import SideBarComp from "@/components/home/SideBarComp.vue";
import HomeMain from "@/components/home/HomeMain.vue";
import KrigingLayer1 from "@/components/pressure-fieldmaps/kriging/KrigingLayer1.vue";
import KrigingLayer3 from "@/components/pressure-fieldmaps/kriging/KrigingLayer3.vue";
import KrigingLayer4 from "@/components/pressure-fieldmaps/kriging/KrigingLayer4.vue";
import KrigingLayer6 from "@/components/pressure-fieldmaps/kriging/KrigingLayer6.vue";
import KrigingLayer7 from "@/components/pressure-fieldmaps/kriging/KrigingLayer7.vue";

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