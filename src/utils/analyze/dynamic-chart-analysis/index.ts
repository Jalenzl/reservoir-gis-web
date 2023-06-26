import {CesiumFieldMap} from "@/utils/GridFieldMap/CesiumFieldMap";
import {Clock, JulianDate} from "cesium";
import type {EChartsType} from "echarts";
import {createTimePropValChart, uniqueArr} from "@/utils/RandomUtils";

type SampleData = interp.CesiumInterpolation.CesiumInterpSampleData

export class DynamicChartAnalysis {

    private _cesiumFieldMap: CesiumFieldMap
    private _sampleData: SampleData
    private _canvas: HTMLCanvasElement
    private _myPropValTimeChart: EChartsType = null as any
    private _dynamicPressureInterval: any = null as any
    private _clock: Clock

    constructor(_canvas: HTMLCanvasElement, _cesiumFieldMap: CesiumFieldMap, _clock: Clock,  _sampleData: SampleData) {
        this._cesiumFieldMap = _cesiumFieldMap;
        this._sampleData = _sampleData;
        this._canvas = _canvas;
        this._clock = _clock;
    }

    get clock(): Clock {
        return this._clock;
    }

    set clock(value: Clock) {
        this._clock = value;
    }

    get cesiumFieldMap(): CesiumFieldMap {
        return this._cesiumFieldMap;
    }

    set cesiumFieldMap(value: CesiumFieldMap) {
        this._cesiumFieldMap = value;
    }

    get sampleData(): SampleData {
        return this._sampleData;
    }

    set sampleData(value: SampleData) {
        this._sampleData = value;
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    set canvas(value: HTMLCanvasElement) {
        this._canvas = value;
    }

    get myPropValTimeChart(): EChartsType {
        return this._myPropValTimeChart;
    }

    set myPropValTimeChart(value: EChartsType) {
        this._myPropValTimeChart = value;
    }

    get dynamicPressureInterval(): any {
        return this._dynamicPressureInterval;
    }

    set dynamicPressureInterval(value: any) {
        this._dynamicPressureInterval = value;
    }


    public async createDynamicChartByTileId(tileId: number) {
        const currentPropValArr: number[] | undefined = await this.cesiumFieldMap.getCurrentPropValue(this.sampleData)
        let data: any[][] = [[JulianDate.toIso8601(this.clock.currentTime).slice(0, 10), currentPropValArr![tileId - 1].toFixed(2)]]

        this.myPropValTimeChart = createTimePropValChart(this.canvas, data)

        const updateChart = () => {
            this.dynamicPressureInterval = setInterval(() => {
                this.cesiumFieldMap.getCurrentPropValue(this.sampleData).then((currentPropValArr: number[] | undefined) => {
                    data.push([JulianDate.toIso8601(this.clock.currentTime).slice(0, 10), currentPropValArr![tileId - 1].toFixed(2)])
                    data = uniqueArr(data)
                    this.myPropValTimeChart.setOption({
                        series: [{
                            data: data
                        }]
                    })
                })
            }, 300)
        }

        updateChart()

        let epsilon = this.cesiumFieldMap.viewer.clockViewModel.multiplier / 2
        let interval_i = setInterval(() => {
            if (JulianDate.equalsEpsilon(this.clock.currentTime, this.clock.stopTime, epsilon)) {
                this.myPropValTimeChart.setOption({
                    dataZoom: [
                        {
                            type: 'inside',
                            start: 0,
                            end: 20
                        },
                        {
                            start: 0,
                            end: 20
                        },
                    ]
                })
                clearInterval(interval_i)
                clearInterval(this.dynamicPressureInterval)
            }
        }, 300)
    }

    public async init(tileId: number) {
        await this.createDynamicChartByTileId(Number(tileId))
    }

    public destroyDynamicChart() {
        clearInterval(this.dynamicPressureInterval)
        if (this.myPropValTimeChart) {
            this.myPropValTimeChart.dispose()
        }
    }
}