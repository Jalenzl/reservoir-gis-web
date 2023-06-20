import {
    ScreenSpaceEventHandler,
    Scene,
    Cartesian3,
    Viewer,
    Clock,
    Cartesian2,
    ScreenSpaceEventType,
    defined,
    Entity,
    Color
} from "cesium"
import {CesiumFieldMap} from "@/utils/GridFieldMap/CesiumFieldMap";
import {FeatureCollection} from "@turf/helpers"
import {CesiumTool} from "@/utils/CesiumTool";
import {deepClone, createSectionChart} from "@/utils/RandomUtils";
import type {EChartsType} from "echarts"

type SampleData = interp.CesiumInterpolation.CesiumInterpSampleData;

export class SectionAnalysis {
    private _viewer: Viewer = null as any
    private _mySectionChart: any = null
    private _clock: Clock = null as any
    private _geojson: FeatureCollection = null as any
    private _sampleData: SampleData = null as any

    constructor(viewer: Viewer, clock: Clock, geojson: FeatureCollection, sampleData: SampleData) {
        this._viewer = viewer
        this._clock = clock
        this._geojson = geojson
        this._sampleData = sampleData
    }

    get viewer(): Viewer {
        return this._viewer;
    }

    set viewer(value: Viewer) {
        this._viewer = value;
    }

    get mySectionChart(): any {
        return this._mySectionChart;
    }

    set mySectionChart(value: any) {
        this._mySectionChart = value;
    }

    get clock(): Clock {
        return this._clock;
    }

    set clock(value: Clock) {
        this._clock = value;
    }

    get geojson(): FeatureCollection {
        return this._geojson;
    }

    set geojson(value: FeatureCollection) {
        this._geojson = value;
    }

    get sampleData(): SampleData {
        return this._sampleData;
    }

    set sampleData(value: SampleData) {
        this._sampleData = value;
    }

    public async init(position5: Cartesian3[][], sectionChartsDOM: HTMLElement, handler: ScreenSpaceEventHandler) {
        interface ChartData {
            sectionPressureArr: number[],
            sectionDistanceArr: string[]
        }

        const scene: Scene = this.viewer.scene

        let mySectionChart: EChartsType = null as any
        handler = new ScreenSpaceEventHandler(scene.canvas)

        let positions: any[] = []
        let cartesian = null
        let lerpData = new Cartesian3()
        let lerpDataArr = []
        let sectionArr: any = []
        let sectionPressureArr: number[] = []
        let sectionDistanceArr: string[] = []

        // let preArrCurrent = []
        let positionArrX = []
        let positionArrY = []
        let positionArrVec2: Cartesian2[] = []

        let clickNum = 0
        let chartData: ChartData = {
            sectionPressureArr: [],
            sectionDistanceArr: []
        }

        try {
            const cesiumFiledMap = new CesiumFieldMap(this.viewer, this.geojson, this.clock, "pressure")
            const tileNum: number = cesiumFiledMap.getTileNum()
            // 获取当前时间的属性值插值数据
            const currentPropVal: number[] | undefined = await cesiumFiledMap.getCurrentPropValue(this.sampleData)
            // 获取每个网格去除z坐标的vec2 position5数组
            const positionArrVec2: Cartesian2[][] = CesiumTool.getVec2Position5(position5).positionArrVec2

            const getSectionData = (position0: Cartesian3, position1: Cartesian3) => {
                for (let i = 0; i <= 10; i++) {
                    // 获取两点间插值点P的坐标
                    Cartesian3.lerp(position0, position1, i / 10, lerpData)
                    lerpDataArr.push(lerpData.clone())

                    // 获取插值点P到起点的距离
                    let distance: string = Cartesian2.distance(position0, lerpData).toFixed(2)

                    // 获取插值点所在网格的压力值
                    for (let j = 0; j < tileNum; j++) { // 判断各插值点P是否在网格内

                        // 网格的边向量
                        let vec_01: Cartesian2 = new Cartesian2()
                        let vec_12: Cartesian2 = new Cartesian2()
                        let vec_23: Cartesian2 = new Cartesian2()
                        let vec_30: Cartesian2 = new Cartesian2()

                        Cartesian2.subtract(positionArrVec2[j][1], positionArrVec2[j][0], vec_01)
                        Cartesian2.subtract(positionArrVec2[j][2], positionArrVec2[j][1], vec_12)
                        Cartesian2.subtract(positionArrVec2[j][3], positionArrVec2[j][2], vec_23)
                        Cartesian2.subtract(positionArrVec2[j][0], positionArrVec2[j][3], vec_30)

                        // 插值点P到网格各顶点的向量
                        let vec_0P: Cartesian2 = new Cartesian2()
                        let vec_1P: Cartesian2 = new Cartesian2()
                        let vec_2P: Cartesian2 = new Cartesian2()
                        let vec_3P: Cartesian2 = new Cartesian2()

                        Cartesian2.subtract(lerpData, positionArrVec2[j][0], vec_0P)
                        Cartesian2.subtract(lerpData, positionArrVec2[j][1], vec_1P)
                        Cartesian2.subtract(lerpData, positionArrVec2[j][2], vec_2P)
                        Cartesian2.subtract(lerpData, positionArrVec2[j][3], vec_3P)

                        // 向量叉乘
                        let cross1: number = Cartesian2.cross(vec_01, vec_0P)
                        let cross2: number = Cartesian2.cross(vec_12, vec_1P)
                        let cross3: number = Cartesian2.cross(vec_23, vec_2P)
                        let cross4: number = Cartesian2.cross(vec_30, vec_3P)

                        // 判断叉乘结果是否同号
                        if (
                            (cross1 > 0 && cross2 > 0 && cross3 > 0 && cross4 > 0) ||
                            (cross1 < 0 && cross2 < 0 && cross3 < 0 && cross4 < 0)
                        ) {
                            sectionPressureArr.push(currentPropVal![j])
                            sectionDistanceArr.push(distance)
                            let res = {
                                paramVal: currentPropVal![j],
                                distance,
                            }
                            sectionArr.push(res)
                        }
                    }
                }
                return { sectionArr, sectionPressureArr, sectionDistanceArr }
            }

            handler.setInputAction((movement: any) => {
                cartesian = scene.pickPosition(movement.position)
                if (defined(cartesian)) {
                    positions.push(cartesian.clone())
                }

                clickNum++ // 点击次数

                if (positions.length >= 2) { // 绘制剖切线
                    const sectionLine: Entity = this.viewer.entities.add({
                        polyline: {
                            positions: positions,
                            width: 4,
                            material: Color.DIMGRAY,
                        }
                    })

                    let {
                        sectionPressureArr,
                        sectionDistanceArr
                    } = getSectionData(positions[clickNum - 2], positions[clickNum - 1])

                    chartData.sectionDistanceArr = deepClone(chartData.sectionDistanceArr).concat(sectionDistanceArr.slice(-11))
                    chartData.sectionPressureArr = deepClone(chartData.sectionPressureArr).concat(sectionPressureArr.slice(-11))

                    if (chartData.sectionDistanceArr.length > 11) {
                        let indexN
                        chartData.sectionDistanceArr.forEach((item, index) => {
                            if (index >= 11 * (clickNum - 2)) {
                                indexN = chartData.sectionDistanceArr.length - 12
                                // console.log(item, chartData.profileDistanceArr[indexN])
                                let itemN = String((Number(item) + Number(chartData.sectionDistanceArr[indexN])).toFixed(2))
                                chartData.sectionDistanceArr.splice(index, 1, itemN)
                            }
                        })
                    }

                    // 绘制图表
                    mySectionChart = createSectionChart(sectionChartsDOM as HTMLCanvasElement, chartData.sectionDistanceArr, chartData.sectionPressureArr)
                }
            }, ScreenSpaceEventType.LEFT_CLICK)

            handler.setInputAction(() => {
                handler.destroy()
            }, ScreenSpaceEventType.RIGHT_CLICK)
        } catch (e) {
            console.error(e)
        }
    }
}