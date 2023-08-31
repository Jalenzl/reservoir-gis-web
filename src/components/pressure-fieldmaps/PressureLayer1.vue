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
    <Transition name="fade">
      <div class="section-charts-container" v-show="chartsSettings.showCharts_DynamicPressure">
        <div class="tittle-container">
          <h4 class="title">Dynamic Pressure</h4>
        </div>
        <div class="dynamicCharts" ref="dynamicCharts"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import * as dat from "dat.gui"
import {Cartesian3, JulianDate, ConstantProperty} from "cesium"
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
import {onMounted, reactive, ref, watch} from "vue";
import {CesiumFieldMap} from "@/utils/GridFieldMap/CesiumFieldMap";
import {storeToRefs} from "pinia";
import PressureColorBand from "@/components/colorBand/PressureColorBand.vue";
import {CesiumTool} from "@/utils/CesiumTool";
import {GeoJsonTool} from "@/utils/GeoJsonTool";
import {SectionAnalysis} from "@/utils/analyze/section-analysis";
import {Render} from "@/utils/Render";
import type {Position} from "@turf/helpers/dist/js/lib/geojson";
import {featureEach} from "@turf/meta";
import {IsolineAnalysis} from "@/utils/analyze/isoline-analysis";
import {DynamicChartAnalysis} from "@/utils/analyze/dynamic-chart-analysis";

type sampleData = interp.CesiumInterpolation.CesiumInterpSampleData
type Options = interp.CesiumInterpolation.CesiumInterpOptions
type ChartsSettinngs = charts.ChartsSettings
type IMapInstance = map.IMapInstance
type IsobandInterpolationData = analyze.isolineAnalysis.IsobandInterpolationData
type RenderOption = interp.CesiumInterpolation.CesiumInterpRenderOptions

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

const sampleTime = useSampleTime()
let {timeArr} = storeToRefs(sampleTime)

/*----------dom----------*/
const toolbar = ref<HTMLElement | null>(null)
const sectionCharts = ref<HTMLElement | null>(null)
const dynamicCharts = ref<HTMLElement | null>(null)


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

/*----------layer picker-----------*/
const layerPicker = reactive({
  layerNo: 1,
})
const emit = defineEmits(["getLayerNo"])
const emitLayerNo = () => {
  emit("getLayerNo", Number(layerPicker.layerNo))
}

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

  const pressure_l1t1_jsonData = await getData_l1t1()
  const pressure_l1t2_jsonData = await getData_l1t2()
  const pressure_l1t3_jsonData = await getData_l1t3()
  const pressure_l1t4_jsonData = await getData_l1t4()
  const pressure_l1t5_jsonData = await getData_l1t5()
  const pressure_l1t6_jsonData = await getData_l1t6()
  const pressure_l1t7_jsonData = await getData_l1t7()
  const pressure_l1t8_jsonData = await getData_l1t8()


  //get pressure data & coordinates5 position5 data

  let coordinatesArr = reactive<Position[][]>([])
  let position5Arr = reactive<Cartesian3[][]>([])

  // layer1
  let pressureArr_l1t1 = reactive<number[]>([])
  let pressureArr_l1t2 = reactive<number[]>([])
  let pressureArr_l1t3 = reactive<number[]>([])
  let pressureArr_l1t4 = reactive<number[]>([])
  let pressureArr_l1t5 = reactive<number[]>([])
  let pressureArr_l1t6 = reactive<number[]>([])
  let pressureArr_l1t7 = reactive<number[]>([])
  let pressureArr_l1t8 = reactive<number[]>([])

  // get l1t1 pressure data & coordinates data
  featureEach(pressure_l1t1_jsonData, currentFeature => {
    pressureArr_l1t1.push(currentFeature.properties.pressure)
    let cordTempArr = []
    let position5Temp = null
    currentFeature.geometry.coordinates[0][0].forEach(item => {
      cordTempArr.push(...item)
      position5Temp = Cartesian3.fromDegreesArray(cordTempArr)
    })
    coordinatesArr.push(cordTempArr)
    position5Arr.push(position5Temp)
  })

  // get l1t2 pressure data
  featureEach(pressure_l1t2_jsonData, currentFeature => {
    pressureArr_l1t2.push(currentFeature.properties.pressure)
  })

  // get l1t3 pressure data
  featureEach(pressure_l1t3_jsonData, currentFeature => {
    pressureArr_l1t3.push(currentFeature.properties.pressure)
  })

  // get l1t4 pressure data
  featureEach(pressure_l1t4_jsonData, currentFeature => {
    pressureArr_l1t4.push(currentFeature.properties.pressure)
  })

  // get l1t5 pressure data
  featureEach(pressure_l1t5_jsonData, currentFeature => {
    pressureArr_l1t5.push(currentFeature.properties.pressure)
  })

  // get l1t6 pressure data
  featureEach(pressure_l1t6_jsonData, currentFeature => {
    pressureArr_l1t6.push(currentFeature.properties.pressure)
  })

  // get l1t7 pressure data
  featureEach(pressure_l1t7_jsonData, currentFeature => {
    pressureArr_l1t7.push(currentFeature.properties.pressure)
  })

  // get l1t8 pressure data
  featureEach(pressure_l1t8_jsonData, currentFeature => {
    pressureArr_l1t8.push(currentFeature.properties.pressure)
  })

  // tileNum
  let tileNum = pressureArr_l1t1.length

  //sample pressure array
  const pressrueArrList_l1: number[][] = [
    pressureArr_l1t1,
    pressureArr_l1t2,
    pressureArr_l1t3,
    pressureArr_l1t4,
    pressureArr_l1t5,
    pressureArr_l1t6,
    pressureArr_l1t7,
    pressureArr_l1t8,
  ]

  const cesiumFieldMap = new CesiumFieldMap(
      viewer, // viewer
      pressure_l1t1_jsonData, // geojson
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
  const contourOptions = reactive<Options>({ // 等高线设置
    bottom: 0,
    peak: 32000,
    outline: false,
  })

  const renderOptions: RenderOption = {
    rangeArr: [10621, 12432, 13000, 14600, 16770, 18940, 21110, 23279, 25449, 27619],
    extrudedRatio: 700,
    unit: "kpa",
  }

  /*--------------rendering-----------------*/
  const mainRendering = () => {
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
            staticRenderController = render.renderByFixedTime(cesiumFieldMap, sampleData_l1, contourOptions, renderOptions)
          } else if (Number(val.renderType) === 2) {
            if (staticRenderController) {
              clearInterval(staticRenderController)
              viewer.entities.removeAll()
            }
            dynamicRenderController = render.renderByTimeInterpolation(cesiumFieldMap, sampleData_l1, contourOptions, renderOptions)
          }
        },
        {immediate: true}
    )
  }

  mainRendering()
  // const dynamicRenderController = render.renderByTimeInterpolation(cesiumFieldMap, sampleData_l1, renderOptions)
  // const staticRenderController = render.renderByFixedTime(cesiumFieldMap, sampleData_l1, renderOptions)


  /*----------section analysis------------*/
  let handler = null
  let mySectionChart = null
  const startSectionAnalysis = async () => {
    const sectionAnalysis: SectionAnalysis = new SectionAnalysis(viewer, clock, pressure_l1t1_jsonData, sampleData_l1)
    await sectionAnalysis.init(position5Arr, sectionCharts.value as HTMLCanvasElement, handler)
    mySectionChart = sectionAnalysis.mySectionChart
  }

  /*-----------isoline analysis--------------*/
  let dynamicIsolineController = null

  const startIsolineAnalysis = async () => {
    const centoidPoints = await GeoJsonTool.getCentroid(cesiumFieldMap, sampleData_l1, coordinatesArr, cesiumFieldMap.getTileNum())
    const isolineInterpData: IsobandInterpolationData = {
      centroidPoints: centoidPoints,
      cellSize: 0.0001,
      propertyName: "pressure",
    }
    const isolineAnalysis = new IsolineAnalysis(cesiumFieldMap, isolineInterpData)

    await isolineAnalysis.init()
  }

  const startDynamicIsoline = () => {
    dynamicIsolineController = setInterval(async () => {
      startIsolineAnalysis().then(() => {
        if (viewer.dataSources.length > 1) {
          viewer.dataSources.remove(viewer.dataSources.get(0))
        }
      })
    }, 1000)
  }

  const stopDynamicIsoline = () => {
    clearInterval(dynamicIsolineController)
    setTimeout(() => { // 去除所有entity前必须先等待前一次绘制完成 这里预留300ms
      while (viewer.dataSources.length > 0) {
        viewer.dataSources.removeAll()
      }
    }, 300)
  }

  /*---------dynamic chart analysis----------*/
  const dynamicChartAnalysis = new DynamicChartAnalysis(dynamicCharts.value as HTMLCanvasElement, cesiumFieldMap, clock, sampleData_l1)
  const startDynamicChartAnalysis = async () => {
    chartsSettings.showCharts_DynamicPressure = true
    await dynamicChartAnalysis.init(viewModel.dynamicChartId)
  }

  const stopDynamicChartAnalysis = () => {
    dynamicChartAnalysis.destroyDynamicChart()
    chartsSettings.showCharts_DynamicPressure = false
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
    },
    startDynamicIsoline,
    stopDynamicIsoline,
    dynamicChartId: 1,
    startDynamicChartAnalysis,
    stopDynamicChartAnalysis,
  }

  /*---------------gui----------------*/

  const gui = new dat.GUI({autoPlace: false, width: 300})

  // 调整工具位置到cesiumContainer容器左上
  toolbar.value.appendChild(gui.domElement)

  // 添加目录层级
  const settings2DFolder = gui.addFolder('2D Settings')
  const sectionAnalysisFolder = gui.addFolder('Section Analysis')
  const isolineAnalysisFolder = gui.addFolder('Isoline Analysis')
  const dynamicChartAnalysisFolder = gui.addFolder('Dynamic Chart Analysis')

  settings2DFolder
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
  settings2DFolder
      .add(renderSettings, "renderType", {
        "fixedTime": 1,
        "timeInterpolation": 2,
      })
  settings2DFolder
      .add(contourOptions, "bottom")
      .min(0)
      .max(32000)
      .step(10)
      .name("调整等值线下界")
      .onChange(() => {
        if (contourOptions.bottom >= contourOptions.peak) {
          contourOptions.bottom = 0
        }
      })

  settings2DFolder
      .add(contourOptions, "peak")
      .min(0)
      .max(32000)
      .step(10)
      .name("调整等值线上界")
      .onChange(() => {
        if (contourOptions.bottom >= contourOptions.peak) {
          contourOptions.peak = 32000
        }
      })
  sectionAnalysisFolder
      .add(viewModel, 'initSectionAnalysis')
      .name('start section analysis')
      .onChange(() => {
        viewModel.hideExtrudedHeight()
      })
  sectionAnalysisFolder
      .add(viewModel, 'stopSectionAnalysis')
      .name('stop section analysis')
      .onChange(() => {
        chartsSettings.showCharts_SectionAnalysis = false
        viewModel.showExtrudedHeight()
      })
  isolineAnalysisFolder
      .add(viewModel, 'startDynamicIsoline')
      .name('动态计算等值线')
  isolineAnalysisFolder
      .add(viewModel, 'stopDynamicIsoline')
      .name('停止计算等值线')
      .onChange(() => {
        stopDynamicIsoline()
      })
  dynamicChartAnalysisFolder
      .add(viewModel, 'dynamicChartId', {
        '102×38i': '527',
        '102×39i': '678',
        '102×17p': '203',
        '102×18p': '123',
      })
      .name('选择井位')
  dynamicChartAnalysisFolder
      .add(viewModel, 'startDynamicChartAnalysis')
      .name('开始绘制')
      .onChange(() => {
        let entity = viewer.entities.getById(String(viewModel.dynamicChartId))
        entity.polygon.outline = new ConstantProperty(true)
        entity.polygon.outlineWidth = new ConstantProperty(100)
      })
  dynamicChartAnalysisFolder
      .add(viewModel, 'stopDynamicChartAnalysis')
      .name('停止绘制')
      .onChange(() => {
        let entity = viewer.entities.getById(String(viewModel.dynamicChartId))
        entity.polygon.outline = new ConstantProperty(false)
      })
  gui
      .add(contourOptions, "outline")
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