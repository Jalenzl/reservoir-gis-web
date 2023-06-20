<template>
  <div class="cesiumContainer-comp1" id="cesiumContainer-comp1">
    <div class="toolbar" ref="toolbar"></div>
    <PressureColorBand v-show="colorBarSettings.isShow"/>
    <Transition name="fade">
      <div class="section-charts-container" v-show="chartsSettings.showCharts_SectionAnalysis">
        <div class="tittle-container">
          <h4 class="title">section analysis</h4>
        </div>
        <div class="sectionCharts" ref="sectionCharts"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import * as dat from "dat.gui"
import {ConstantProperty, JulianDate} from "cesium"
import {
  usePressureStore_l1t1,
  usePressureStore_l1t2,
  usePressureStore_l1t3,
  usePressureStore_l1t4,
  usePressureStore_l1t5,
  usePressureStore_l1t6,
  usePressureStore_l1t7,
  usePressureStore_l1t8,
} from "@/stores/pressure/pressureLayer1";
import {useSampleTime} from "@/stores/time/sampleTime";
import {computed, onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import {CesiumFieldMap} from "@/utils/GridFieldMap/CesiumFieldMap";
import {storeToRefs} from "pinia";
import PressureColorBand from "@/components/colorBand/pressureColorBand.vue";
import {CesiumTool} from "@/utils/CesiumTool";
import {GeoJsonTool} from "@/utils/GeoJsonTool";
import {SectionAnalysis} from "@/utils/analyze/section-analysis";
import {Render} from "@/utils/Render";


type sampleData = interp.CesiumInterpolation.CesiumInterpSampleData
type Options = interp.CesiumInterpolation.CesiumInterpOptions
type ChartsSettinngs = charts.ChartsSettings
type IMapInstance = map.IMapInstance

/*---------pinia------------*/
const pressureStore_l1t1 = usePressureStore_l1t1()
const pressureStore_l1t2 = usePressureStore_l1t2()
const pressureStore_l1t3 = usePressureStore_l1t3()
const pressureStore_l1t4 = usePressureStore_l1t4()
const pressureStore_l1t5 = usePressureStore_l1t5()
const pressureStore_l1t6 = usePressureStore_l1t6()
const pressureStore_l1t7 = usePressureStore_l1t7()
const pressureStore_l1t8 = usePressureStore_l1t8()

let {getData_l1t1} = pressureStore_l1t1
let {getData_l1t2} = pressureStore_l1t2
let {getData_l1t3} = pressureStore_l1t3
let {getData_l1t4} = pressureStore_l1t4
let {getData_l1t5} = pressureStore_l1t5
let {getData_l1t6} = pressureStore_l1t6
let {getData_l1t7} = pressureStore_l1t7
let {getData_l1t8} = pressureStore_l1t8

let {pressureArr_l1t1, position5_l1t1} = storeToRefs(pressureStore_l1t1)
let {pressureArr_l1t2} = storeToRefs(pressureStore_l1t2)
let {pressureArr_l1t3} = storeToRefs(pressureStore_l1t3)
let {pressureArr_l1t4} = storeToRefs(pressureStore_l1t4)
let {pressureArr_l1t5} = storeToRefs(pressureStore_l1t5)
let {pressureArr_l1t6} = storeToRefs(pressureStore_l1t6)
let {pressureArr_l1t7} = storeToRefs(pressureStore_l1t7)
let {pressureArr_l1t8} = storeToRefs(pressureStore_l1t8)

const sampleTime = useSampleTime()
let {timeArr} = storeToRefs(sampleTime)

/*----------dom----------*/
const toolbar = ref<HTMLElement | null>(null)
const sectionCharts = ref<HTMLElement | null>(null)


/*----------settings--------*/
const colorBarSettings = reactive({
  isShow: true,
})

const renderSettings = reactive({
  renderType: 2, // 1 for fixed time, 2 for time interpolation
})

const chartsSettings = reactive<ChartsSettinngs>({
  showCharts_SectionAnalysis: false,
  showCharts_DynamicPressure: false
})

onBeforeMount(async () => {
  await getData_l1t2()
  await getData_l1t3()
  await getData_l1t4()
  await getData_l1t5()
  await getData_l1t6()
  await getData_l1t7()
  await getData_l1t8()
})

onMounted(async () => {
  /*--------initializing map------------*/

  let {viewer, scene, globe, clock} = CesiumTool.initMap("cesiumContainer-comp1")
  const mapInstance: IMapInstance = {
    viewer,
    scene,
    globe,
    clock,
  }

  /*--------dealing with data---------*/

  const geojson = await getData_l1t1()

  //sample pressure array
  const pressrueArrList_l1: number[][] = [
    pressureArr_l1t1.value,
    pressureArr_l1t2.value,
    pressureArr_l1t3.value,
    pressureArr_l1t4.value,
    pressureArr_l1t5.value,
    pressureArr_l1t6.value,
    pressureArr_l1t7.value,
    pressureArr_l1t8.value,
  ]

  const cesiumFieldMap = new CesiumFieldMap(
      viewer, // viewer
      geojson, // geojson
      clock, // clock
      "pressure", // propName
  )

  const sampleData_l1: sampleData = {
    timeArray: timeArr.value,
    propValArray: pressrueArrList_l1,
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
  let staticRenderController = null
  let dynamicRenderController = null


  const render = new Render(viewer, clock)

  watch(
      renderSettings,
      (val) => {
        if (Number(val.renderType) === 1) {
          if (dynamicRenderController) {
            clearInterval(dynamicRenderController)
            viewer.entities.removeAll()
          }
          staticRenderController = render.renderByFixedTime(cesiumFieldMap, sampleData_l1, renderOptions)
        } else if (Number(val.renderType) === 2) {
          if (staticRenderController) {
            clearInterval(staticRenderController)
            viewer.entities.removeAll()
          }
          dynamicRenderController = render.renderByTimeInterpolation(cesiumFieldMap, sampleData_l1, renderOptions)
        }
      },
      {immediate: true}
  )
  // const dynamicRenderController = render.renderByTimeInterpolation(cesiumFieldMap, sampleData_l1, renderOptions)
  // const staticRenderController = render.renderByFixedTime(cesiumFieldMap, sampleData_l1, renderOptions)


  /*----------section analysis------------*/
  let handler = null
  let mySectionChart = null
  const startSectionAnalysis = async () => {
    const sectionAnalysis: SectionAnalysis = new SectionAnalysis(viewer, clock, geojson, sampleData_l1)
    await sectionAnalysis.init(position5_l1t1.value, sectionCharts.value as HTMLCanvasElement, handler)
    mySectionChart = sectionAnalysis.mySectionChart
  }


  /*--------------viewModel-----------------*/
  const viewModel = {
    showExtrudedHeight() {
      CesiumTool.showExtrudedHeight(cesiumFieldMap, sampleData_l1)
    },
    hideExtrudedHeight() {
      CesiumTool.hideExtrudedHeight(cesiumFieldMap)
    },
    initSectionAnalysis() {
      chartsSettings.showCharts_SectionAnalysis = true
      startSectionAnalysis()
    },
    stopSectionAnalysis() {
      if (handler) {
        viewer.screenSpaceEventHandler.removeInputAction(handler)
      }

      if (mySectionChart) {
        mySectionChart.dispose()
      }
    }
  }

  /*---------------gui----------------*/

  const gui = new dat.GUI({autoPlace: false, width: 300})

  // 调整工具位置到cesiumContainer容器左上
  toolbar.value.appendChild(gui.domElement)

  // 添加目录层级
  const settings2DFolder = gui.addFolder('2D Settings')
  const sectionAnalysis = gui.addFolder('Section Analysis')

  settings2DFolder
      .add(renderSettings, "renderType", {
        "fixedTime": 1,
        "timeInterpolation": 2,
      })
  settings2DFolder
      .add(renderOptions, "bottom")
      .min(0)
      .max(32000)
      .step(10)
      .name("调整等值线下界")
      .onChange(() => {
        if (renderOptions.bottom >= renderOptions.peak) {
          renderOptions.bottom = 0
        }
      })

  settings2DFolder
      .add(renderOptions, "peak")
      .min(0)
      .max(32000)
      .step(10)
      .name("调整等值线上界")
      .onChange(() => {
        if (renderOptions.bottom >= renderOptions.peak) {
          renderOptions.peak = 32000
        }
      })
  sectionAnalysis
      .add(viewModel, 'initSectionAnalysis')
      .name('start section analysis')
      .onChange(() => {
        viewModel.hideExtrudedHeight()
      })
  sectionAnalysis
      .add(viewModel, 'stopSectionAnalysis')
      .name('stop section analysis')
      .onChange(() => {
        chartsSettings.showCharts_SectionAnalysis = false
        viewModel.showExtrudedHeight()
      })
  gui
      .add(renderOptions, "outline")
      .name("是否显示网格边框线")

  gui
      .add(colorBarSettings, "isShow")
      .name("是否显示图例")

})

</script>

<style scoped lang="scss">
$bright-white-font: rgba(248, 249, 249, 1);
$bright-white-bg: rgba(248, 249, 249, 0.9);

.cesiumContainer-comp1 {
  position: relative;
  width: 100%;
  height: 99%;

  .toolbar {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 100;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .section-charts-container {
    position: absolute;
    bottom: 88px;
    right: 10px;
    z-index: 1;

    .tittle-container {
      margin: -12px auto;

      .title {
        text-align: center;
        color: $bright-white-font;
      }
    }

    .sectionCharts {
      width: 30vw;
      height: 30vh;
      margin-bottom: 10px;
      background-color: $bright-white-bg;
    }

    .dynamicCharts {
      width: 30vw;
      height: 30vh;
      margin-bottom: 10px;
      background-color: $bright-white-bg;
    }
  }
}
</style>