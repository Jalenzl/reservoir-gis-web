import {GridFieldMap} from "@/utils/GridFieldMap/index";
import {Clock, ConstantProperty, Entity, JulianDate, PropertyBag, Viewer} from "cesium";
import {FeatureCollection} from "@turf/helpers";
import {post} from "@/utils/request";
import {getColor_pressure} from "@/utils/color/tileColorByPressure";
import {reactive, watch} from "vue";

type SampleData = interp.CesiumInterpolation.CesiumInterpSampleData
type Response = interp.CesiumInterpolation.CesiumInterpResponse
type Options = interp.CesiumInterpolation.CesiumInterpOptions


export class CesiumFieldMap extends GridFieldMap {
    constructor(public _viewer: Viewer, public _geoJson: FeatureCollection, public _clock: Clock, public _propName: string) {
        super(_viewer, _geoJson, _clock, _propName);
    }

    get clock(): Clock {
        return this._clock;
    }

    set clock(value: Clock) {
        this._clock = value;
    }

    get propName(): string {
        return this._propName;
    }

    set propName(value: string) {
        this._propName = value;
    }

    get viewer(): Viewer {
        return this._viewer;
    }

    set viewer(value: Viewer) {
        this._viewer = value;
    }

    get geoJson(): FeatureCollection {
        return this._geoJson;
    }

    set geoJson(value: FeatureCollection) {
        this._geoJson = value;
    }

    public async getInterpolatedData(sampleData: SampleData): Promise<Response | undefined> {
        try {
            return await post(
                "https://testserver.vip.cpolar.cn/api/v1/cesium/interpolation",
                JSON.stringify(sampleData)
            )
        } catch (e) {
            console.error(e)
        }
    }

    public update(propValArr: number[], options?: Options) {
        const tileNum: number = this.getTileNum()

        if (propValArr) {
            for (let i = 0; i < tileNum; i++) {
                let entity: Entity = this._viewer.entities.values[i]
                let propVal: number = propValArr[i]

                if (entity.polygon) {
                    // 赋材质
                    entity.polygon.material = getColor_pressure(1, propVal)
                    // 赋高度
                    entity.polygon.extrudedHeight = new ConstantProperty(propVal / 700)
                    // 赋描述
                    const pressureStr = String(propVal?.toFixed(2))
                    entity.description = new ConstantProperty("pressure:" + pressureStr + "kpa")
                    // 赋属性
                    let pb = new PropertyBag()
                    pb.addProperty(`${this._propName}`, propVal)

                    // 处理options选项
                    if (options) {

                        let dynamicOptions = reactive(options)

                        watch(dynamicOptions, (newOptions: Options) => {
                            // 根据options选项显示等值线范围内的值
                            const bottom = newOptions.bottom
                            const peak = newOptions.peak
                            if (bottom < peak) {
                                entity.show = propVal > (bottom || 0) && propVal < (peak || 10e6)
                            } else {
                                alert("等值线最大值必须大于最小值!")
                            }

                            // 是否显示边界
                            if (entity.polygon) {
                                if (options.outline) {
                                    entity.polygon.outline = new ConstantProperty(true)
                                } else {
                                    entity.polygon.outline = new ConstantProperty(false)
                                }
                            }
                        }, {deep: true, immediate: true})
                    }
                }
            }
        }
    }

    public async getCurrentPropValue(sampleData: SampleData): Promise<number[] | undefined> {
        sampleData.currentTime = JulianDate.toIso8601(this.clock.currentTime)
        try {
            const res: Response | undefined = await this.getInterpolatedData(sampleData)
            return res?.currentPropValArr
        } catch (e) {
            console.error(e)
        }
    }

}