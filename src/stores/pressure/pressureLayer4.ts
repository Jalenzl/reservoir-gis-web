import {defineStore} from 'pinia'
import {get} from '@/utils/request'
import {reactive} from "vue";
import {Cartesian3} from "cesium";
import {FeatureCollection} from "@turf/helpers";
import type {Position} from "@turf/helpers";

export const usePressureStore_l4t1 = defineStore('pressure_l4t1', () => {
    let pressureArr_l4t1: number[] = reactive([])
    let coordinates_l4t1: Position[][] = reactive([])
    let position5_l4t1: Cartesian3[][] = reactive([])
    let pressure_l4t1_jsonData: FeatureCollection = reactive({})

    const getData_l4t1 = async () => {
        // 获取并存入geojson数据
        const pressure_l4t1_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l4_t1_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l4t1_jsonData = await get<FeatureCollection>(pressure_l4t1_jsonUrl)
            for (let i = 0; i < pressure_l4t1_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l4t1_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l4t1.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l4t1.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l4t1.push(positions5Temp)
            }

            return pressure_l4t1_jsonData

        } catch (e) {
            console.error(e)
        }

    }

    return {position5_l4t1, pressureArr_l4t1, coordinates_l4t1, getData_l4t1}
})

export const usePressureStore_l4t2 = defineStore('pressure_l4t2', () => {
    let pressureArr_l4t2: number[] = reactive([])
    let coordinates_l4t2: Position[][] = reactive([])
    let position5_l4t2: Cartesian3[][] = reactive([])
    let pressure_l4t2_jsonData: FeatureCollection = reactive({})

    const getData_l4t2 = async () => {
        // 获取并存入geojson数据
        const pressure_l4t2_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l4_t2_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l4t2_jsonData = await get<FeatureCollection>(pressure_l4t2_jsonUrl)
            for (let i = 0; i < pressure_l4t2_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l4t2_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l4t2.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l4t2.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l4t2.push(positions5Temp)
            }

            return pressure_l4t2_jsonData

        } catch (e) {
            console.error(e)
        }
    }

    return {position5_l4t2, pressureArr_l4t2, coordinates_l4t2, getData_l4t2}
})

export const usePressureStore_l4t3 = defineStore('pressure_l4t3', () => {
    let pressureArr_l4t3: number[] = reactive([])
    let coordinates_l4t3: Position[][] = reactive([])
    let position5_l4t3: Cartesian3[][] = reactive([])
    let pressure_l4t3_jsonData: FeatureCollection = reactive({})

    const getData_l4t3 = async () => {
        // 获取并存入geojson数据
        const pressure_l4t3_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l4_t3_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l4t3_jsonData = await get<FeatureCollection>(pressure_l4t3_jsonUrl)
            for (let i = 0; i < pressure_l4t3_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l4t3_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l4t3.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l4t3.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l4t3.push(positions5Temp)
            }

            return pressure_l4t3_jsonData

        } catch (e) {
            console.error(e)
        }
    }

    return {position5_l4t3, pressureArr_l4t3, coordinates_l4t3, getData_l4t3}
})

export const usePressureStore_l4t4 = defineStore('pressure_l4t4', () => {
    let pressureArr_l4t4: number[] = reactive([])
    let coordinates_l4t4: Position[][] = reactive([])
    let position5_l4t4: Cartesian3[][] = reactive([])
    let pressure_l4t4_jsonData: FeatureCollection = reactive({})

    const getData_l4t4 = async () => {
        // 获取并存入geojson数据
        const pressure_l4t4_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l4_t4_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l4t4_jsonData = await get<FeatureCollection>(pressure_l4t4_jsonUrl)
            for (let i = 0; i < pressure_l4t4_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l4t4_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l4t4.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l4t4.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l4t4.push(positions5Temp)
            }

            return pressure_l4t4_jsonData

        } catch (e) {
            console.error(e)
        }
    }

    return {position5_l4t4, pressureArr_l4t4, coordinates_l4t4, getData_l4t4}
})

export const usePressureStore_l4t5 = defineStore('pressure_l4t5', () => {
    let pressureArr_l4t5: number[] = reactive([])
    let coordinates_l4t5: Position[][] = reactive([])
    let position5_l4t5: Cartesian3[][] = reactive([])
    let pressure_l4t5_jsonData: FeatureCollection = reactive({})

    const getData_l4t5 = async () => {
        // 获取并存入geojson数据
        const pressure_l4t5_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l4_t5_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l4t5_jsonData = await get<FeatureCollection>(pressure_l4t5_jsonUrl)
            for (let i = 0; i < pressure_l4t5_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l4t5_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l4t5.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l4t5.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l4t5.push(positions5Temp)
            }

            return pressure_l4t5_jsonData

        } catch (e) {
            console.error(e)
        }
    }

    return {position5_l4t5, pressureArr_l4t5, coordinates_l4t5, getData_l4t5}
})

export const usePressureStore_l4t6 = defineStore('pressure_l4t6', () => {
    let pressureArr_l4t6: number[] = reactive([])
    let coordinates_l4t6: Position[][] = reactive([])
    let position5_l4t6: Cartesian3[][] = reactive([])
    let pressure_l4t6_jsonData: FeatureCollection = reactive({})

    const getData_l4t6 = async () => {
        // 获取并存入geojson数据
        const pressure_l4t6_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l4_t6_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l4t6_jsonData = await get<FeatureCollection>(pressure_l4t6_jsonUrl)
            for (let i = 0; i < pressure_l4t6_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l4t6_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l4t6.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l4t6.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l4t6.push(positions5Temp)
            }

            return pressure_l4t6_jsonData

        } catch (e) {
            console.error(e)
        }
    }

    return {position5_l4t6, pressureArr_l4t6, coordinates_l4t6, getData_l4t6}
})

export const usePressureStore_l4t7 = defineStore('pressure_l4t7', () => {
    let pressureArr_l4t7: number[] = reactive([])
    let coordinates_l4t7: Position[][] = reactive([])
    let position5_l4t7: Cartesian3[][] = reactive([])
    let pressure_l4t7_jsonData: FeatureCollection = reactive({})

    const getData_l4t7 = async () => {
        // 获取并存入geojson数据
        const pressure_l4t7_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l4_t7_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l4t7_jsonData = await get<FeatureCollection>(pressure_l4t7_jsonUrl)
            for (let i = 0; i < pressure_l4t7_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l4t7_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l4t7.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l4t7.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l4t7.push(positions5Temp)
            }

            return pressure_l4t7_jsonData

        } catch (e) {
            console.error(e)
        }
    }

    return {position5_l4t7, pressureArr_l4t7, coordinates_l4t7, getData_l4t7}
})

export const usePressureStore_l4t8 = defineStore('pressure_l4t8', () => {
    let pressureArr_l4t8: number[] = reactive([])
    let coordinates_l4t8: Position[][] = reactive([])
    let position5_l4t8: Cartesian3[][] = reactive([])
    let pressure_l4t8_jsonData: FeatureCollection = reactive({})

    const getData_l4t8 = async () => {
        // 获取并存入geojson数据
        const pressure_l4t8_jsonUrl = "/pressure/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pressure%3Apressure_l4_t8_vector&maxFeatures=5000&outputFormat=application%2Fjson"
        try {
            pressure_l4t8_jsonData = await get<FeatureCollection>(pressure_l4t8_jsonUrl)
            for (let i = 0; i < pressure_l4t8_jsonData.totalFeatures; i++) {
                // 获取并存入坐标 压力数据
                const ifeature = pressure_l4t8_jsonData.features[i]
                let pressure = ifeature.properties.pressure
                pressureArr_l4t8.push(pressure)
                let coordinatesTemp: Position = []
                ifeature.geometry.coordinates[0].forEach((lnglat: Position[][]) => {
                    coordinatesTemp.push(lnglat[0][0], lnglat[0][1])
                    coordinatesTemp.push(lnglat[1][0], lnglat[1][1])
                    coordinatesTemp.push(lnglat[2][0], lnglat[2][1])
                    coordinatesTemp.push(lnglat[3][0], lnglat[3][1])
                    coordinatesTemp.push(lnglat[4][0], lnglat[4][1])
                })
                coordinates_l4t8.push(coordinatesTemp)
                // 获取 EPSG:4326参考系 笛卡尔坐标系 下的多边形顶点坐标position5
                let positions5Temp: Cartesian3[] = Cartesian3.fromDegreesArray(coordinatesTemp)
                position5_l4t8.push(positions5Temp)
            }

            return pressure_l4t8_jsonData

        } catch (e) {
            console.error(e)
        }
    }

    return {position5_l4t8, pressureArr_l4t8, coordinates_l4t8, getData_l4t8}
})