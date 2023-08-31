import {ref, watch} from "vue";
import {GeoJsonTool} from "@/utils/GeoJsonTool";
import {JulianDate} from "cesium";
import type {CesiumFieldMap} from "@/utils/GridFieldMap/CesiumFieldMap";
import type {Viewer, Clock} from "cesium";


type SampleData = interp.CesiumInterpolation.CesiumInterpSampleData
type Options = interp.CesiumInterpolation.CesiumInterpOptions
type RenderOptions = interp.CesiumInterpolation.CesiumInterpRenderOptions

export class Render {
    constructor(public _viewer: Viewer, public _clock: Clock) {
        this._clock = _clock
        this._viewer = _viewer
    }

    get viewer(): Viewer {
        return this._viewer;
    }

    set viewer(value: Viewer) {
        this._viewer = value;
    }

    get clock(): Clock {
        return this._clock;
    }

    set clock(value: Clock) {
        this._clock = value;
    }

    public renderByTimeInterpolation(cesiumFieldMap: CesiumFieldMap, sampleData: SampleData, options: Options, renderOptions: RenderOptions): ReturnType<typeof setInterval> {
        const animationViewModel = this.viewer.animation.viewModel;
        let currentTime = ref<string>(animationViewModel.timeLabel);
        const renderController: ReturnType<typeof setInterval> = setInterval(() => {
            currentTime.value = animationViewModel.timeLabel;
        }, 300);

        const firstTickPressure = GeoJsonTool.getPropValue(cesiumFieldMap.geoJson, "pressure")
        cesiumFieldMap.init(firstTickPressure, options)
        cesiumFieldMap.addWell()

        watch(currentTime, async (newVal, oldVal) => {

            if (newVal !== oldVal) {

                sampleData.currentTime = JulianDate.toIso8601(this._clock.currentTime)

                try {
                    const res = await cesiumFieldMap.getInterpolatedData(sampleData)
                    const propValArr = res?.currentPropValArr.map((item: number) => item < 0 ? 0 : item)
                    if (propValArr) {
                        cesiumFieldMap.update(propValArr, options, renderOptions)
                    }
                } catch (e) {
                    console.error(e)
                }

            }
        })

        return renderController

    }

    public renderByFixedTime(cesiumFieldMap: CesiumFieldMap, sampleData: SampleData, options: Options, renderOptions: RenderOptions): ReturnType<typeof setInterval> {
        const animationViewModel = this.viewer.animation.viewModel;
        let currentTime = ref(animationViewModel.timeLabel);
        const renderController = setInterval(() => {
            currentTime.value = animationViewModel.timeLabel;
        }, 300);

        const firstTickPressure = GeoJsonTool.getPropValue(cesiumFieldMap.geoJson, "pressure")
        cesiumFieldMap.init(firstTickPressure, options)
        cesiumFieldMap.addWell()

        watch(currentTime, () => {
            const timeArr: string[] = sampleData.timeArray
            const propValArrList: number[][] = sampleData.propValArray
            const epsilon = this.viewer.clockViewModel.multiplier / 5
            timeArr.forEach((time :string, index: number) => {
                if (JulianDate.equalsEpsilon(this.clock.currentTime, JulianDate.fromIso8601(time), epsilon)) {
                   cesiumFieldMap.update(propValArrList[index], options, renderOptions)
                }
            })
        })

        return renderController
    }
}