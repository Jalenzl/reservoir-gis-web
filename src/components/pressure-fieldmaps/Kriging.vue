<template>
  <canvas id="krigingCanvas" ref="krigingCanvas" style="display: none"></canvas>
  <div class="kriging-cesium-container" id="krigingCesiumContainer">
    <div class="toolbar" ref="toolbar"></div>
    <PressureGradientColorBand />
  </div>
</template>

<script setup lang="ts">
import * as dat from "dat.gui"
import {onMounted, reactive, ref, watch} from "vue";
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
import {useBoundaryStore} from "@/stores/boundary/boundary";
import {WGS84_GeoJson} from "@/utils/GeoJsonTool/WGS84_GeoJson";
import {KrigingFieldMap} from "@/utils/GridFieldMap/KrigingFieldMap";
import {useSampleTime} from "@/stores/time/sampleTime";
import {CesiumTool} from "@/utils/CesiumTool";
import {storeToRefs} from "pinia";
import {FeatureCollection, Position} from "@turf/helpers/dist/js/lib/geojson";
import {Cartesian3, JulianDate} from "cesium";
import {featureEach} from "@turf/meta";
import PressureGradientColorBand from "@/components/colorBand/PressureGradientColorBand.vue";

type sampleData = interp.CesiumInterpolation.CesiumInterpSampleData

/*---------pinia------------*/
const pressureStore_l1t1 = usePressureStore_l1t1()
const pressureStore_l1t2 = usePressureStore_l1t2()
const pressureStore_l1t3 = usePressureStore_l1t3()
const pressureStore_l1t4 = usePressureStore_l1t4()
const pressureStore_l1t5 = usePressureStore_l1t5()
const pressureStore_l1t6 = usePressureStore_l1t6()
const pressureStore_l1t7 = usePressureStore_l1t7()
const pressureStore_l1t8 = usePressureStore_l1t8()
const boundaryStore = useBoundaryStore()
const sampleTime = useSampleTime()

let {getData_l1t1} = pressureStore_l1t1
let {getData_l1t2} = pressureStore_l1t2
let {getData_l1t3} = pressureStore_l1t3
let {getData_l1t4} = pressureStore_l1t4
let {getData_l1t5} = pressureStore_l1t5
let {getData_l1t6} = pressureStore_l1t6
let {getData_l1t7} = pressureStore_l1t7
let {getData_l1t8} = pressureStore_l1t8
let {getBoundaryLine} = boundaryStore

let {timeArr} = storeToRefs(sampleTime)

const krigingCanvas = ref<HTMLCanvasElement | null>(null)
const toolbar = ref<HTMLDivElement | null>(null)

onMounted(async () => {
  /*--------initializing map------------*/

  let {viewer, scene, globe, clock} = CesiumTool.initMap("krigingCesiumContainer")
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

  const sampleData_l1: sampleData = {
    timeArray: timeArr.value,
    propValArray: pressrueArrList_l1,
    interpolationAlgorithm: "LAGRANGE",
    currentTime: JulianDate.toIso8601(clock.currentTime)
  }

  /*------------kriging interpolation-------------*/
  let renderController = null
  const gridBoundaryLine = await getBoundaryLine()
  const krigingFieldMap_l1: KrigingFieldMap = new KrigingFieldMap(
      viewer,
      krigingCanvas.value as HTMLCanvasElement,
      gridBoundaryLine,
      pressure_l1t1_jsonData,
      "boundary_line_01",
      "pressure"
  );

  const startKrigingInterpolation = async (krigingFieldMap: KrigingFieldMap, geoJson: FeatureCollection, sampleData: sampleData) => {
    viewer.entities.removeAll()
    if (renderController) {
      clearInterval(renderController)
    }

    const getPropGeoJson = async () => {
      let featureArr = []
      const coordArr = WGS84_GeoJson.getCoordinates(geoJson);
      const value = await CesiumTool.getCurrentPropValue(clock, sampleData)

      coordArr.forEach((item, index) => {
        let lng = [];
        let lat = [];
        item.forEach((item2) => {
          lng.push(item2[0]);
          lat.push(item2[1]);
        });
        const geojson = new WGS84_GeoJson(lng, lat);
        const multiPolygon = geojson.createMultiPolygon(
            "pressure",
            value![index]
        );
        featureArr.push(multiPolygon);
      })
      return WGS84_GeoJson.createFeatureCollection(featureArr);
    }

    const R = () => {
      const animationViewModel = viewer.animation.viewModel;
      let currentTime = ref(animationViewModel.timeLabel);
      renderController = setInterval(() => {
        currentTime.value = animationViewModel.timeLabel;
      }, 33);

      krigingFieldMap.init();

      watch(currentTime, async (newVal, oldVal) => {
        if (newVal !== oldVal) {
          const propGeoJson = await getPropGeoJson();
          krigingFieldMap.update(propGeoJson);
        }
      });
    }

    R()
  }

  const stopKrigingInterpolation = (...krigingFieldMap: KrigingFieldMap[]) => {
    clearInterval(renderController);
    krigingFieldMap.forEach(item => {
      item.destroy()
    })
  }

  // await startKrigingInterpolation(krigingFieldMap_l1, pressure_l1t1_jsonData, sampleData_l1)

  /*---------------GUI object------------*/
  const GUI_Object = {
    renderLayerNum: 0,
    start () {
      switch (this.renderLayerNum) {
        case 1:
          startKrigingInterpolation(krigingFieldMap_l1, pressure_l1t1_jsonData, sampleData_l1)
          break
      }
    },
    stop() {
      stopKrigingInterpolation([krigingFieldMap_l1])
    }
  }

  /*-----------------GUI-----------------*/
  const initGUI = () => {
    const gui = new dat.GUI({autoPlace: false, width: 300})

    // 调整工具位置到cesiumContainer容器左上
    toolbar.value.appendChild(gui.domElement)

    gui
        .add(GUI_Object, "renderLayerNum", {
          "layer1": 1,
        })
        .name("选择插值层数")
        .onChange(() => {
          GUI_Object.start()
        })
  }

  initGUI()
})

</script>

<style scoped lang="scss">
.kriging-cesium-container {
  position: relative;
  width: 100vw;
  height: 99vh;

  .toolbar {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 100;
  }
}
</style>