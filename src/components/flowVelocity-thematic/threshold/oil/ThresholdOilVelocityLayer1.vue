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
type ChartsSettinngs = charts.ChartsSettings
type IMapInstance = map.IMapInstance
type IsobandInterpolationData = analyze.isolineAnalysis.IsobandInterpolationData

/*----------dom----------*/
const toolbar = ref<HTMLElement | null>(null)

/*---------pinia------------*/
const pressureStore_l1t1 = usePressureStore_l1t1()
let {getData_l1t1} = pressureStore_l1t1

/*----------settings--------*/
const renderSettings = reactive({
  renderType: 2, // 1 for fixed time, 2 for time interpolation
})

const sampleTime = useSampleTime()
let {timeArr} = storeToRefs(sampleTime)

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

  // layer1
  let vOilArr_l1t1 = reactive<number[]>([])
  let vOilArr_l1t2 = reactive<number[]>([])
  let vOilArr_l1t3 = reactive<number[]>([])
  let vOilArr_l1t4 = reactive<number[]>([])
  let vOilArr_l1t5 = reactive<number[]>([])
  let vOilArr_l1t6 = reactive<number[]>([])
  let vOilArr_l1t7 = reactive<number[]>([])
  let vOilArr_l1t8 = reactive<number[]>([])

  vOilArr_l1t1.push(...await getVelocityData(1, 1, 'oil'))
  vOilArr_l1t2.push(...await getVelocityData(2, 1, 'oil'))
  vOilArr_l1t3.push(...await getVelocityData(3, 1, 'oil'))
  vOilArr_l1t4.push(...await getVelocityData(4, 1, 'oil'))
  vOilArr_l1t5.push(...await getVelocityData(5, 1, 'oil'))
  vOilArr_l1t6.push(...await getVelocityData(6, 1, 'oil'))
  vOilArr_l1t7.push(...await getVelocityData(7, 1, 'oil'))
  vOilArr_l1t8.push(...await getVelocityData(8, 1, 'oil'))

  //sample velocity array
  const vOilArrList_l1: number[][] = [
    vOilArr_l1t1,
    vOilArr_l1t2,
    vOilArr_l1t3,
    vOilArr_l1t4,
    vOilArr_l1t5,
    vOilArr_l1t6,
    vOilArr_l1t7,
    vOilArr_l1t8,
  ]

  const cesiumFieldMap = new CesiumFieldMap(
      viewer, // viewer
      pressure_l1t1_jsonData, // geojson
      clock, // clock
      "v_oil", // propName
  )

  const sampleData_l1: sampleData = {
    timeArray: timeArr.value,
    propValArray: vOilArrList_l1,
    interpolationAlgorithm: "LAGRANGE",
    currentTime: JulianDate.toIso8601(clock.currentTime)
  }

  /*-------------dealing with render settings----------*/
  const renderOptions = reactive<Options>({ // 等高线设置
    bottom: 0,
    peak: 32000,
    outline: false,
  })

  /*--------------rendering-----------------*/
  const mainRendering = () => {
    const render = new Render(viewer, clock)
    let staticRenderController = null
    let dynamicRenderController = null

    watch(
        renderSettings,
        (val) => {
          const rangeArr = [0.010, 0.021, 0.041, 0.062, 0.083, 0.104, 0.124, 0.145, 0.166, 0.187]
          if (Number(val.renderType) === 1) {
            if (dynamicRenderController) {
              clearInterval(dynamicRenderController)
              viewer.entities.removeAll()
            }
            staticRenderController = render.renderByFixedTime(cesiumFieldMap, sampleData_l1, renderOptions, 0.01)
          } else if (Number(val.renderType) === 2) {
            if (staticRenderController) {
              clearInterval(staticRenderController)
              viewer.entities.removeAll()
            }
            dynamicRenderController = render.renderByTimeInterpolation(cesiumFieldMap, sampleData_l1, renderOptions, 0.01, rangeArr)
          }
        },
        {immediate: true}
    )

  }

  mainRendering()
})

</script>

<style scoped lang="scss">

</style>