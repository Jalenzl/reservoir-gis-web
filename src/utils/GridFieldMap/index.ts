import {FeatureCollection, Feature, Position} from "@turf/helpers"
import {featureEach, coordEach} from "@turf/meta"
import {
    Viewer,
    Cartesian2,
    Cartesian3,
    PolygonHierarchy,
    LabelStyle,
    Color,
    VerticalOrigin,
    JulianDate,
    Clock
} from "cesium"
import {getColor_pressure} from "@/utils/color/tileColorByProp";
import {CesiumTool} from "@/utils/CesiumTool";

type Options = interp.CesiumInterpolation.CesiumInterpOptions

export class GridFieldMap {
    constructor(public _viewer: Viewer, public _clock: Clock, public _geoJson: FeatureCollection, public _propName: string) {
        this._geoJson = _geoJson;
        this._viewer = _viewer;
        this._propName = _propName;
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

    public getTileNum = (): number => {
        return this._geoJson.features.length
    }

    public getPropValue(propName: string): number[] {
        let propValArr: number[] = [];
        featureEach(this._geoJson, (feature: Feature) => {
            propValArr.push(feature.properties[propName]);
        })
        return propValArr;
    }

    public getCartesian3Position(): Cartesian3[][] {
        let positionArr: Cartesian3[][] = []
        featureEach(this._geoJson, (feature: Feature) => {
            let coordTempArr: number[] = []
            coordEach(feature, (coord: Position) => {
                coordTempArr.push(...coord)
            })
            let position5: Cartesian3[] = Cartesian3.fromDegreesArray(coordTempArr)
            positionArr.push(position5)
        })
        return positionArr
    }

    public getLngLatCoordinates(): Position[][] {
        let coordArr: Position[] = []
        featureEach(this._geoJson, (feature: Feature) => {
            let coordTempArr: number[] = []
            coordEach(feature, (coord: Position) => {
                coordTempArr.push(coord)
            })
            coordArr.push(coordTempArr)
        })
        return coordArr
    }


    public init(propValArr: number[], options: Options) {
        const tileNum: number = this.getTileNum()
        if (!this._viewer.entities.getById("1")) { // 当entity中没有其它tile时 执行init 否则不执行 防止重复添加
            for (let i = 0; i < tileNum; i++) {
                let propVal: number = propValArr[i]
                let position5 = this.getCartesian3Position()
                let material = getColor_pressure(1, propVal)
                this._viewer.entities.add({
                    id: `${i + 1}`,
                    name: `tile${i + 1}`,
                    polygon: {
                        hierarchy: new PolygonHierarchy(position5[i]),
                        height: 2,
                        outline: options.outline,
                        show: true,
                        extrudedHeight: propVal / 700,
                        material: material,
                    }
                })
            }
        }
    }

    public destory() {
        this._viewer.entities.removeAll()
    }

    public addWell() {
        this._viewer.entities.add({
            id: "well_i1",
            name: "well_i1",
            position: Cartesian3.fromDegrees(118.556734385, 37.52835994, 50),
            label: {
                text: '102×38i',
                font: '500 15px sans-serif',
                fillColor: Color.WHITE,
                style: LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                verticalOrigin: VerticalOrigin.BOTTOM,
                pixelOffset: new Cartesian2(0, 0),
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
        })

        this._viewer.entities.add({
            id: "well_i2",
            name: "well_i2",
            position: Cartesian3.fromDegrees(118.559783345, 37.52878738, 50),
            label: {
                text: '102×39i',
                font: '500 15px sans-serif',
                fillColor: Color.WHITE,
                style: LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                verticalOrigin: VerticalOrigin.BOTTOM,
                pixelOffset: new Cartesian2(0, -5),
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
        })

        this._viewer.entities.add({
            id: "well_p1",
            name: "well_p1",
            position: Cartesian3.fromDegrees(118.55817169, 37.52679262, 50),
            label: {
                text: '102×17p',
                font: '500 15px sans-serif',
                fillColor: Color.WHITE,
                style: LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                verticalOrigin: VerticalOrigin.BOTTOM,
                pixelOffset: new Cartesian2(0, -5),
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
        })

        this._viewer.entities.add({
            id: "well_p2",
            name: "well_p2",
            position: Cartesian3.fromDegrees(118.56122596, 37.52636516, 50),
            label: {
                text: '102×18p',
                font: '500 15px sans-serif',
                fillColor: Color.WHITE,
                style: LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                verticalOrigin: VerticalOrigin.BOTTOM,
                pixelOffset: new Cartesian2(0, -5),
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
        })
    }

}