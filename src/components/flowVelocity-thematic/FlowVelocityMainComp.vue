<template>
  <div class="wrapper">
    <div class="three-container">
      <div class="selector">
        <el-select class="selector-layer m-4" v-model="layerValue" value-key="id" placeholder="Select Layer(layer1)"
                   @change="layerChange">
          <el-option
              v-for="item in layerOptions"
              :key="item.id"
              :label="item.label"
              :value="item"
              :disabled="item.disabled"
          />
        </el-select>
        <el-select class="selector-time m-4" v-model="timeValue" value-key="id" placeholder="Select Time(1989-01-01)"
                   @change="timeChange">
          <el-option
              v-for="item in timeOptions"
              :key="item.id"
              :label="item.label"
              :value="item"
              :disabled="item.disabled"
          />
        </el-select>
        <el-select class="selector-time m-4" v-model="typeValue" value-key="id" placeholder="Select Type(oil)"
                   @change="typeChange">
          <el-option
              v-for="item in typeOptions"
              :key="item.id"
              :label="item.label"
              :value="item"
              :disabled="item.disabled"
          />
        </el-select>
        <el-button type="primary" plain @click="goThreshold">查看流速阈值</el-button>
      </div>
      <VelocityFiledMap :velocityProp="velocityProp"/>
    </div>
    <div class="vector-plot-container">
      <Suspense>
        <VelocityVectorPlot :velocityProp="velocityProp"/>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import VelocityFiledMap from "@/components/flowVelocity-thematic/VelocityFiledMap.vue";
import VelocityVectorPlot from "@/components/flowVelocity-thematic/VelocityVectorPlot.vue";

const velocityProp = reactive({
  type: "oil",
  layer: 1,
  time: 1,
})
/*------selector-------*/
type layerOption = {
  id: number;
  layer: number;
  label: string;
  disabled?: boolean;
};

type timeOption = {
  id: number;
  time: number;
  label: string;
  disabled?: boolean;
};

type typeOption = {
  id: number;
  type: string;
  label: string;
  disabled?: boolean;
};

const layerValue = ref<layerOption>();
const timeValue = ref<timeOption>();
const typeValue = ref<typeOption>();
const layerOptions = ref([
  {id: 1, layer: 1, label: "layer 1"},
  {id: 2, layer: 2, label: "layer 2", disabled: true},
  {id: 3, layer: 3, label: "layer 3"},
  {id: 4, layer: 4, label: "layer 4"},
  {id: 5, layer: 5, label: "layer 5", disabled: true},
  {id: 6, layer: 6, label: "layer 6"},
  {id: 7, layer: 7, label: "layer 7"},
])
const timeOptions = ref([
  {id: 1, time: 1, label: "1989-01-01"},
  {id: 2, time: 2, label: "1989-03-01"},
  {id: 3, time: 3, label: "1989-08-01"},
  {id: 4, time: 4, label: "1990-02-01"},
  {id: 5, time: 5, label: "1991-01-01"},
  {id: 6, time: 6, label: "1992-11-01"},
  {id: 7, time: 7, label: "1995-08-01"},
  {id: 8, time: 8, label: "1997-12-01"},
])
const typeOptions = ref([
  {id: 1, type: "water", label: "water"},
  {id: 2, type: "oil", label: "oil"},
])

const timeChange = (option: timeOption) => velocityProp.time = option.time
const layerChange = (option: layerOption) => velocityProp.layer = option.layer
const typeChange = (option: typeOption) => velocityProp.type = option.type

/*------router-------*/
const router = useRouter()
const goThreshold = () => router.push({path: '/flowVectorThematicMap/threshold'})
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  position: relative;

  .three-container {
    width: 30%;
    height: 100%;
    position: absolute;
  }

  .vector-plot-container {
    width: 50%;
    height: 100%;
    position: absolute;
    left: 40%;
    top: 10px
  }
}

</style>