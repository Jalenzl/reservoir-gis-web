import {FeatureCollection, Feature, featureCollection} from "@turf/helpers";
import type {CesiumFieldMap} from "@/utils/GridFieldMap/CesiumFieldMap";
import {post} from "@/utils/request";
import {flatten, buffer, intersect} from "@turf/turf";
import {useBoundaryStore} from "@/stores/boundary/boundary";
import {
    GeoJsonDataSource,
    Color,
    DataSource,
    Entity,
    LabelGraphics,
    ConstantProperty,
    LabelStyle,
    Cartesian2,
    ColorMaterialProperty,
    Cartesian3
} from "cesium";

type IsobandInterpolationData = analyze.isolineAnalysis.IsobandInterpolationData
type Response = analyze.isolineAnalysis.IsobandResponse

const boundaryStore = useBoundaryStore()
let {getBoundaryFace} = boundaryStore


export class IsolineAnalysis {
    private _cesiumFieldMap: CesiumFieldMap
    private _isobandInterpolationData: IsobandInterpolationData

    constructor(_cesiumFieldMap: CesiumFieldMap, _isobandInterpolationData: IsobandInterpolationData) {
        this._cesiumFieldMap = _cesiumFieldMap;
        this._isobandInterpolationData = _isobandInterpolationData;
    }

    get cesiumFieldMap(): CesiumFieldMap {
        return this._cesiumFieldMap;
    }

    set cesiumFieldMap(value: CesiumFieldMap) {
        this._cesiumFieldMap = value;
    }

    get isobandInterpolationData(): IsobandInterpolationData {
        return this._isobandInterpolationData;
    }

    set isobandInterpolationData(value: IsobandInterpolationData) {
        this._isobandInterpolationData = value;
    }

    public async getIsobands(): Promise<FeatureCollection> {
        return await post<FeatureCollection>(
            'https://testserver.vip.cpolar.cn/api/v1/analyze/isoband',
            JSON.stringify(this.isobandInterpolationData)
        )
    }

    public async init() {
        const res: Response = await this.getIsobands()
        let isobands = res.isoband
        // 根据区块形状对插值面的等值线进行裁切 获取插值面的等值线geojson
        isobands = flatten(isobands)
        let boundary: FeatureCollection = await getBoundaryFace()
        boundary = flatten(boundary)

        let features: FeatureCollection = []
        isobands.features.forEach((isoband: Feature) => {
            boundary.features.forEach((boundary: Feature) => {
                let intersection = null
                try {
                    intersection = intersect(isoband, boundary)
                } catch (e) {
                    isoband = buffer(isoband, 0)
                    intersection = intersect(isoband, boundary)
                }
                if (intersection) {
                    intersection.properties = isoband.properties
                    features.push(intersection)
                }
            })
        })
        const intersection = featureCollection(features)

        // 绘制等值线
        let dataSourcePromise = this.cesiumFieldMap.viewer.dataSources.add(GeoJsonDataSource.load(intersection, {
            clampToGround: false,
            stroke: Color.BLACK,
            strokeWidth: 5,
            // fill: Cesium.Color.BLACK.withAlpha(0.5),
        }));
        let dataSource: DataSource = await dataSourcePromise;
        let entities = dataSource.entities.values;

        const getMaxExtrudedHeight = () => {
            let extrudedHeightArr = []
            for (let i = 0; i < this.cesiumFieldMap.getTileNum(); i++) {
                let entity = this.cesiumFieldMap.viewer.entities.values[i]
                let extrudedHeight = entity.polygon!.extrudedHeight!.getValue(this.cesiumFieldMap.clock.currentTime)
                extrudedHeightArr.push(extrudedHeight)
            }
            return Math.max(...extrudedHeightArr)
        }
        let maxExtrudedHeight = getMaxExtrudedHeight()

        entities.forEach((entity: Entity, index: number) => {
            entity.name = `isoline${index}`
            let propVal = entity.properties![this.cesiumFieldMap.propName].getValue().substring(0, 7)
            const label: LabelGraphics = new LabelGraphics({
                text: new ConstantProperty(propVal),
                font: new ConstantProperty('300 10px sans-serif'),
                style: LabelStyle.FILL_AND_OUTLINE,
                fillColor: Color.BLACK,
                outlineColor: Color.BLACK,
                outlineWidth: 3,
                // verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cartesian3(0, 0, 10),
                // disableDepthTestDistance: Number.POSITIVE_INFINITY,
                scale: 5,
                show: true,
            })
            entity.polygon!.height = new ConstantProperty(maxExtrudedHeight)
            entity.polygon!.material = new ColorMaterialProperty(new Color(0 / 255, 0 / 255, 0 / 255, 0))
            entity.label = label
        })
    }

    public removeAllIsolines() {
        this.cesiumFieldMap.viewer.dataSources.removeAll()
    }
}