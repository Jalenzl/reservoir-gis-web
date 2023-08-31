<template>
  <div class="cesiumContainer-threshold-water6" id="cesiumContainer-threshold-water6">
    <div class="toolbar" ref="toolbar"></div>
    <VelocityWaterColorBand />
  </div>
</template>

<script setup lang="ts">
import * as dat from "dat.gui"
import {CesiumFieldMap} from "@/utils/GridFieldMap/CesiumFieldMap";
import {storeToRefs} from "pinia";
import {onMounted, reactive, ref, watch} from "vue";
import VelocityWaterColorBand from "@/components/colorBand/VelocityWaterColorBand.vue";
import {CesiumTool} from "@/utils/CesiumTool";
import {usePressureStore_l1t1} from "@/stores/pressure/pressureLayer1";
import {useSampleTime} from "@/stores/time/sampleTime";
import {Position} from "@turf/helpers/dist/js/lib/geojson";
import {Cartesian3, JulianDate} from "cesium";
import {featureEach} from "@turf/meta";
import {post} from "@/utils/request";
import {Render} from "@/utils/Render";
import { ElLoading } from 'element-plus'

type sampleData = interp.CesiumInterpolation.CesiumInterpSampleData
type Options = interp.CesiumInterpolation.CesiumInterpOptions
type IMapInstance = map.IMapInstance
type RenderOption = interp.CesiumInterpolation.CesiumInterpRenderOptions

/*----------dom----------*/
const toolbar = ref<HTMLElement | null>(null)

/*---------pinia------------*/
const pressureStore_l1t1 = usePressureStore_l1t1()
let {getData_l1t1} = pressureStore_l1t1
const sampleTime = useSampleTime()
let {timeArr_layer6} = storeToRefs(sampleTime)

/*----------layer&type picker-----------*/
const picker = reactive({
  layerNo: 6,
  type: "water",
})
const emit = defineEmits(["getPicker"])
const emitPicker = () => {
  emit("getPicker", picker)
}

onMounted(async () => {
  /*--------initializing map------------*/
  let {viewer, scene, globe, clock} = CesiumTool.initMap("cesiumContainer-threshold-water6")
  const mapInstance: IMapInstance = {
    viewer,
    scene,
    globe,
    clock,
  }

  /*----------------loading---------------*/
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  /*--------dealing with data---------*/
  const pressure_l1t1_jsonData = await getData_l1t1()

  // get coordinates&position5 data
  let coordinatesArr = reactive<Position[][]>([])
  let position5Arr = reactive<Cartesian3[][]>([])
  featureEach(pressure_l1t1_jsonData, currentFeature => {
    let cordTempArr = []
    let position5Temp = null
    currentFeature.geometry.coordinates[0][0].forEach(item => {
      cordTempArr.push(...item)
      position5Temp = Cartesian3.fromDegreesArray(cordTempArr)
    })
    coordinatesArr.push(cordTempArr)
    position5Arr.push(position5Temp)
  })

  // get velocity data
  const getVelocityData = async (time, layer, type) => {
    try {
      const res = await post('https://fastapi.vip.cpolar.cn/api/v1/clacFlowVelocity', {
        "layer": layer,
        "time": time
      })
      if (type === 'water') {
        return res.velocity_water
      } else if (type === 'oil') {
        return res.velocity_oil
      }
    } catch (e) {
      console.log(e)
    }
  }

  // layer1
  let vWaterArr_l6t1 = reactive<number[]>([])
  let vWaterArr_l6t2 = reactive<number[]>([])
  let vWaterArr_l6t3 = reactive<number[]>([])
  let vWaterArr_l6t4 = reactive<number[]>([])
  let vWaterArr_l6t5 = reactive<number[]>([])
  let vWaterArr_l6t6 = reactive<number[]>([])
  let vWaterArr_l6t7 = reactive<number[]>([])
  let vWaterArr_l6t8 = reactive<number[]>([])
  let vWaterArr_l6t9 = reactive<number[]>([])

  vWaterArr_l6t1.push(...await getVelocityData(1, 6, 'water'))
  vWaterArr_l6t2.push(...await getVelocityData(2, 6, 'water'))
  vWaterArr_l6t3.push(...await getVelocityData(3, 6, 'water'))
  vWaterArr_l6t4.push(...await getVelocityData(4, 6, 'water'))
  vWaterArr_l6t5.push(...await getVelocityData(5, 6, 'water'))
  vWaterArr_l6t6.push(...await getVelocityData(6, 6, 'water'))
  vWaterArr_l6t7.push(...await getVelocityData(7, 6, 'water'))
  vWaterArr_l6t8.push(...await getVelocityData(8, 6, 'water'))
  vWaterArr_l6t9.push(...await getVelocityData(9, 6, 'water'))

  featureEach(pressure_l1t1_jsonData, (currentFeature, featureIndex) => {
    currentFeature.properties.pressure = vWaterArr_l6t1[featureIndex]
  })

  //sample velocity array
  const vWaterArrList_l6: number[][] = [
    vWaterArr_l6t1,
    vWaterArr_l6t2,
    vWaterArr_l6t3,
    vWaterArr_l6t4,
    vWaterArr_l6t5,
    vWaterArr_l6t6,
    vWaterArr_l6t7,
    vWaterArr_l6t8,
    vWaterArr_l6t9,
  ]

  const cesiumFieldMap = new CesiumFieldMap(
      viewer, // viewer
      pressure_l1t1_jsonData, // geojson
      clock, // clock
      "v_water", // propName
  )

  const sampleData_l6: sampleData = {
    timeArray: timeArr_layer6.value,
    propValArray: vWaterArrList_l6,
    interpolationAlgorithm: "LAGRANGE",
    currentTime: JulianDate.toIso8601(clock.currentTime)
  }

  /*-------------dealing with render settings----------*/
  const contourOptions = reactive<Options>({ // 等高线设置
    bottom: 0,
    peak: 2.0,
    outline: false,
  })

  const renderOptions: RenderOption = {
    rangeArr: [0.18, 0.36, 0.54, 0.72, 0.90, 1.08, 1.26, 1.44, 1.62, 1.80],
    extrudedRatio: 0.05,
    unit: "m/day",
  }

  /*--------------rendering-----------------*/
  const mainRendering = () => {
    const render = new Render(viewer, clock)
    let dynamicRenderController = render.renderByTimeInterpolation(cesiumFieldMap, sampleData_l6, contourOptions, renderOptions)
  }

  loading.close()
  mainRendering()

  /*---------------gui----------------*/

  const gui = new dat.GUI({autoPlace: false, width: 300})

  // 调整工具位置到cesiumContainer容器左上
  toolbar.value.appendChild(gui.domElement)

  // 阈值显示功能
  gui
      .add(contourOptions, "bottom")
      .min(0)
      .max(2.0)
      .step(0.01)
      .name("调整等值线下界")
      .onChange(() => {
        if (contourOptions.bottom >= contourOptions.peak) {
          contourOptions.bottom = 0
        }
      })

  gui
      .add(contourOptions, "peak")
      .min(0)
      .max(2.0)
      .step(0.01)
      .name("调整等值线上界")
      .onChange(() => {
        if (contourOptions.bottom >= contourOptions.peak) {
          contourOptions.peak = 1.0
        }
      })

  gui
      .add(contourOptions, "outline")
      .name("是否显示网格边框线")

  gui
      .add(picker, "layerNo", {
        "layer1": 1,
        "layer3": 3,
        "layer4": 4,
        "layer6": 6,
        "layer7": 7,
      })
      .name("选择层数")
      .onChange(() => {
        emitPicker()
      })

  gui
      .add(picker, "type", {
        "water": "water",
        "oil": "oil",
      })
      .name("选择流速类型")
      .onChange(() => {
        emitPicker()
      })
})

</script>

<style scoped lang="scss">
.cesiumContainer-threshold-water6 {
  position: relative;
  width: 100%;
  height: 99%;

  .toolbar {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 100;
  }
}
</style>