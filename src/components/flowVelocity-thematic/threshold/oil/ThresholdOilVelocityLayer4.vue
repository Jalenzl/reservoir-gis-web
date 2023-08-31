<template>
  <div class="cesiumContainer-threshold" id="cesiumContainer-threshold">
    <div class="toolbar" ref="toolbar"></div>
    <VelocityOilColorBand/>
  </div>
</template>

<script setup lang="ts">
import * as dat from "dat.gui"
import {CesiumFieldMap} from "@/utils/GridFieldMap/CesiumFieldMap";
import {storeToRefs} from "pinia";
import {onMounted, reactive, ref, watch} from "vue";
import VelocityOilColorBand from "@/components/colorBand/VelocityOilColorBand.vue";
import {CesiumTool} from "@/utils/CesiumTool";
import {usePressureStore_l1t1} from "@/stores/pressure/pressureLayer1";
import {useSampleTime} from "@/stores/time/sampleTime";
import {Position} from "@turf/helpers/dist/js/lib/geojson";
import {Cartesian3, JulianDate} from "cesium";
import {featureEach} from "@turf/meta";
import {post} from "@/utils/request";
import {Render} from "@/utils/Render";

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
let {timeArr} = storeToRefs(sampleTime)

/*----------settings--------*/
const renderSettings = reactive({
  renderType: 2, // 1 for fixed time, 2 for time interpolation
})

/*----------layer picker-----------*/
const layerPicker = reactive({
  layerNo: 4,
})
const emit = defineEmits(["getLayerNo"])
const emitLayerNo = () => {
  emit("getLayerNo", Number(layerPicker.layerNo))
}

onMounted(async () => {
  /*--------initializing map------------*/
  let {viewer, scene, globe, clock} = CesiumTool.initMap("cesiumContainer-threshold")
  const mapInstance: IMapInstance = {
    viewer,
    scene,
    globe,
    clock,
  }

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

  // layer3
  let vOilArr_l4t1 = reactive<number[]>([])
  let vOilArr_l4t2 = reactive<number[]>([])
  let vOilArr_l4t3 = reactive<number[]>([])
  let vOilArr_l4t4 = reactive<number[]>([])
  let vOilArr_l4t5 = reactive<number[]>([])
  let vOilArr_l4t6 = reactive<number[]>([])
  let vOilArr_l4t7 = reactive<number[]>([])
  let vOilArr_l4t8 = reactive<number[]>([])

  vOilArr_l4t1.push(...await getVelocityData(1, 4, 'oil'))
  vOilArr_l4t2.push(...await getVelocityData(2, 4, 'oil'))
  vOilArr_l4t3.push(...await getVelocityData(3, 4, 'oil'))
  vOilArr_l4t4.push(...await getVelocityData(4, 4, 'oil'))
  vOilArr_l4t5.push(...await getVelocityData(5, 4, 'oil'))
  vOilArr_l4t6.push(...await getVelocityData(6, 4, 'oil'))
  vOilArr_l4t7.push(...await getVelocityData(7, 4, 'oil'))
  vOilArr_l4t8.push(...await getVelocityData(8, 4, 'oil'))

  featureEach(pressure_l1t1_jsonData, (currentFeature, featureIndex) => {
    currentFeature.properties.pressure = vOilArr_l4t1[featureIndex]
  })

  //sample velocity array
  const vOilArrList_l4: number[][] = [
    vOilArr_l4t1,
    vOilArr_l4t2,
    vOilArr_l4t3,
    vOilArr_l4t4,
    vOilArr_l4t5,
    vOilArr_l4t6,
    vOilArr_l4t7,
    vOilArr_l4t8,
  ]

  const cesiumFieldMap = new CesiumFieldMap(
      viewer, // viewer
      pressure_l1t1_jsonData, // geojson
      clock, // clock
      "v_oil", // propName
  )

  const sampleData_l4: sampleData = {
    timeArray: timeArr.value,
    propValArray: vOilArrList_l4,
    interpolationAlgorithm: "LAGRANGE",
    currentTime: JulianDate.toIso8601(clock.currentTime)
  }

  /*-------------dealing with render settings----------*/
  const contourOptions = reactive<Options>({ // 等高线设置
    bottom: 0,
    peak: 1.0,
    outline: false,
  })

  const renderOptions: RenderOption = {
    rangeArr: [0.010, 0.021, 0.041, 0.062, 0.083, 0.104, 0.124, 0.145, 0.166, 0.187],
    extrudedRatio: 0.003,
    unit: "m/day",
  }

  /*--------------rendering-----------------*/
  const mainRendering = () => {
    const render = new Render(viewer, clock)
    let staticRenderController = null
    let dynamicRenderController = null

    watch(
        renderSettings,
        (val) => {

          if (Number(val.renderType) === 1) {
            if (dynamicRenderController) {
              clearInterval(dynamicRenderController)
              viewer.entities.removeAll()
            }
            staticRenderController = render.renderByFixedTime(cesiumFieldMap, sampleData_l4, contourOptions, renderOptions)
          } else if (Number(val.renderType) === 2) {
            if (staticRenderController) {
              clearInterval(staticRenderController)
              viewer.entities.removeAll()
            }
            dynamicRenderController = render.renderByTimeInterpolation(cesiumFieldMap, sampleData_l4, contourOptions, renderOptions)
          }
        },
        {immediate: true}
    )

  }

  mainRendering()

  /*---------------gui----------------*/

  const gui = new dat.GUI({autoPlace: false, width: 300})

  // 调整工具位置到cesiumContainer容器左上
  toolbar.value.appendChild(gui.domElement)

  // 阈值显示功能
  gui
      .add(contourOptions, "bottom")
      .min(0)
      .max(1.0)
      .step(0.001)
      .name("调整等值线下界")
      .onChange(() => {
        if (contourOptions.bottom >= contourOptions.peak) {
          contourOptions.bottom = 0
        }
      })

  gui
      .add(contourOptions, "peak")
      .min(0)
      .max(1.0)
      .step(0.001)
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
      .add(layerPicker, "layerNo", {
        "layer1": 1,
        "layer3": 3,
        "layer4": 4,
        "layer6": 6,
        "layer7": 7,
      })
      .name("选择层数")
      .onChange(() => {
        emitLayerNo()
      })
})

</script>

<style scoped lang="scss">
.cesiumContainer-threshold {
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