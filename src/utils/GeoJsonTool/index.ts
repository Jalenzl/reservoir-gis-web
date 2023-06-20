import {FeatureCollection, Feature, Position} from "@turf/helpers"
import {featureEach} from "@turf/meta";

export class GeoJsonTool {
    public static getPropValue(geojson: FeatureCollection, propName: string): number[] {
        let propValArr: number[] = [];
        featureEach(geojson, (feature: Feature) => {
            propValArr.push(feature.properties[propName]);
        })
        return propValArr;
    }
}