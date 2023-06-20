import {FeatureCollection, Feature, Position, polygon, Polygon, point, featureCollection as FfeatureCollection} from "@turf/helpers"
import {featureEach} from "@turf/meta";
import {featureOf} from "@turf/invariant";
import {centroid} from "@turf/turf";
import type {CesiumFieldMap} from "@/utils/GridFieldMap/CesiumFieldMap";

type SampleData = interp.CesiumInterpolation.CesiumInterpSampleData

export class GeoJsonTool {
    public static getPropValue(geojson: FeatureCollection, propName: string): number[] {
        let propValArr: number[] = [];
        featureEach(geojson, (feature: Feature) => {
            propValArr.push(feature.properties[propName]);
        })
        return propValArr;
    }

    public static async getCentroid(cesiumFiledMap: CesiumFieldMap, sampleData: SampleData, coordinatesArr: Position[][], tileNum: number): FeatureCollection { // 获取各网格中心点经纬度坐标数组
        let locationArr: any[] = []

        for (let i = 0; i < tileNum; i++) {
            // 获取网格中心坐标
            let point1: Position = [coordinatesArr[i][0], coordinatesArr[i][1]]
            let point2: Position = [coordinatesArr[i][2], coordinatesArr[i][3]]
            let point3: Position = [coordinatesArr[i][4], coordinatesArr[i][5]]
            let point4: Position = [coordinatesArr[i][6], coordinatesArr[i][7]]
            let point5: Position = [coordinatesArr[i][8], coordinatesArr[i][9]]
            const ipolygon: Feature<Polygon> = polygon([[point1, point2, point3, point4, point5]])
            const icentroid = centroid(ipolygon).geometry.coordinates

            // 获取featureCollection
            const location: Feature<Polygon> = point(icentroid, {
                name: `tileLocation${i}`
            })
            featureOf(location, 'Point', `tileLocation${i}`)
            locationArr.push(location)
        }

        const featureCollection = FfeatureCollection(locationArr)

        // 获取pointGrid
        const currrentPropArr = await cesiumFiledMap.getCurrentPropValue(sampleData)

        for (let i = 0; i < tileNum; i++) {
            if (currrentPropArr) {
                featureCollection.features[i].properties.pressure = currrentPropArr[i]
            }
        }

        return featureCollection

    }
}