import {defineStore} from 'pinia'
import {get} from '@/utils/request'
import {reactive} from "vue";
import {Cartesian3} from "cesium";
import {FeatureCollection} from "@turf/helpers";
import type {Position} from "@turf/helpers";

export const usePressureStore_l1t1 = defineStore('pressure_l1t1', () => {
    let pressureArr_l1t1: number[] = reactive([])
    let coordinates_l1t1: Position[][] = reactive([])
    let position5_l1t1: Cartesian3[][] = reactive([])
    let pressure_l1t1_jsonData: FeatureCollection = reactive({})

    const getData_l1t1 = async () => {
        // 获取并存入geojson数据
        const pressure_l1t1_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l1_t1_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l1t1_jsonData = await get<FeatureCollection>(pressure_l1t1_jsonUrl)
            for (let i = 0; i < pressure_l1t1_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l1t1_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l1t1.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l1t1.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l1t1.push(positions5Temp)
            }

            return pressure_l1t1_jsonData

        } catch (e) {
            console.error(e)
        }

    }

    return {position5_l1t1, pressureArr_l1t1, coordinates_l1t1, getData_l1t1}
})

export const usePressureStore_l1t2 = defineStore('pressure_l1t2', () => {
    let pressureArr_l1t2: number[] = reactive([])
    let coordinates_l1t2: Position[][] = reactive([])
    let position5_l1t2: Cartesian3[][] = reactive([])
    let pressure_l1t2_jsonData: FeatureCollection = reactive({})

    const getData_l1t2 = async () => {
        // 获取并存入geojson数据
        const pressure_l1t2_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l1_t2_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l1t2_jsonData = await get<FeatureCollection>(pressure_l1t2_jsonUrl)
            for (let i = 0; i < pressure_l1t2_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l1t2_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l1t2.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l1t2.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l1t2.push(positions5Temp)
            }

            return pressure_l1t2_jsonData

        } catch (e) {
            console.error(e)
        }

    }

    return {position5_l1t2, pressureArr_l1t2, coordinates_l1t2, getData_l1t2}
})

export const usePressureStore_l1t3 = defineStore('pressure_l1t3', () => {
    let pressureArr_l1t3: number[] = reactive([])
    let coordinates_l1t3: Position[][] = reactive([])
    let position5_l1t3: Cartesian3[][] = reactive([])
    let pressure_l1t3_jsonData: FeatureCollection = reactive({})

    const getData_l1t3 = async () => {
        // 获取并存入geojson数据
        const pressure_l1t3_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l1_t3_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l1t3_jsonData = await get<FeatureCollection>(pressure_l1t3_jsonUrl)
            for (let i = 0; i < pressure_l1t3_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l1t3_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l1t3.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l1t3.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l1t3.push(positions5Temp)
            }

            return pressure_l1t3_jsonData

        } catch (e) {
            console.error(e)
        }

    }

    // setTimeout(() => {
    //     console.log(pressureArr_l1t3)
    // }, 500)

    return {position5_l1t3, pressureArr_l1t3, coordinates_l1t3, getData_l1t3}
})

export const usePressureStore_l1t4 = defineStore('pressure_l1t4', () => {
    let pressureArr_l1t4: number[] = reactive([])
    let coordinates_l1t4: Position[][] = reactive([])
    let position5_l1t4: Cartesian3[][] = reactive([])
    let pressure_l1t4_jsonData: FeatureCollection = reactive({})

    const getData_l1t4 = async () => {
        // 获取并存入geojson数据
        const pressure_l1t4_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l1_t4_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l1t4_jsonData = await get<FeatureCollection>(pressure_l1t4_jsonUrl)
            for (let i = 0; i < pressure_l1t4_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l1t4_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l1t4.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l1t4.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l1t4.push(positions5Temp)
            }

            return pressure_l1t4_jsonData

        } catch (e) {
            console.error(e)
        }

    }

    return {position5_l1t4, pressureArr_l1t4, coordinates_l1t4, getData_l1t4}
})

export const usePressureStore_l1t5 = defineStore('pressure_l1t5', () => {
    let pressureArr_l1t5: number[] = reactive([])
    let coordinates_l1t5: Position[][] = reactive([])
    let position5_l1t5: Cartesian3[][] = reactive([])
    let pressure_l1t5_jsonData: FeatureCollection = reactive({})

    const getData_l1t5 = async () => {
        // 获取并存入geojson数据
        const pressure_l1t5_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l1_t5_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l1t5_jsonData = await get<FeatureCollection>(pressure_l1t5_jsonUrl)
            for (let i = 0; i < pressure_l1t5_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l1t5_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l1t5.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l1t5.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l1t5.push(positions5Temp)
            }

            return pressure_l1t5_jsonData

        } catch (e) {
            console.error(e)
        }

    }

    return {position5_l1t5, pressureArr_l1t5, coordinates_l1t5, getData_l1t5}
})

export const usePressureStore_l1t6 = defineStore('pressure_l1t6', () => {
    let pressureArr_l1t6: number[] = reactive([])
    let coordinates_l1t6: Position[][] = reactive([])
    let position5_l1t6: Cartesian3[][] = reactive([])
    let pressure_l1t6_jsonData: FeatureCollection = reactive({})

    const getData_l1t6 = async () => {
        // 获取并存入geojson数据
        const pressure_l1t6_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l1_t6_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l1t6_jsonData = await get<FeatureCollection>(pressure_l1t6_jsonUrl)
            for (let i = 0; i < pressure_l1t6_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l1t6_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l1t6.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l1t6.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l1t6.push(positions5Temp)
            }

            return pressure_l1t6_jsonData

        } catch (e) {
            console.error(e)
        }

    }

    return {position5_l1t6, pressureArr_l1t6, coordinates_l1t6, getData_l1t6}
})

export const usePressureStore_l1t7 = defineStore('pressure_l1t7', () => {
    let pressureArr_l1t7: number[] = reactive([])
    let coordinates_l1t7: Position[][] = reactive([])
    let position5_l1t7: Cartesian3[][] = reactive([])
    let pressure_l1t7_jsonData: FeatureCollection = reactive({})

    const getData_l1t7 = async () => {
        // 获取并存入geojson数据
        const pressure_l1t7_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l1_t7_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l1t7_jsonData = await get<FeatureCollection>(pressure_l1t7_jsonUrl)
            for (let i = 0; i < pressure_l1t7_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l1t7_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l1t7.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l1t7.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l1t7.push(positions5Temp)
            }

            return pressure_l1t7_jsonData

        } catch (e) {
            console.error(e)
        }

    }

    return {position5_l1t7, pressureArr_l1t7, coordinates_l1t7, getData_l1t7}
})

export const usePressureStore_l1t8 = defineStore('pressure_l1t8', () => {
    let pressureArr_l1t8: number[] = reactive([])
    let coordinates_l1t8: Position[][] = reactive([])
    let position5_l1t8: Cartesian3[][] = reactive([])
    let pressure_l1t8_jsonData: FeatureCollection = reactive({})

    const getData_l1t8 = async () => {
        // 获取并存入geojson数据
        const pressure_l1t8_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l1_t8_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l1t8_jsonData = await get<FeatureCollection>(pressure_l1t8_jsonUrl)
            for (let i = 0; i < pressure_l1t8_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l1t8_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l1t8.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l1t8.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l1t8.push(positions5Temp)
            }

            return pressure_l1t8_jsonData

        } catch (e) {
            console.error(e)
        }

    }

    return {position5_l1t8, pressureArr_l1t8, coordinates_l1t8, getData_l1t8}
})

