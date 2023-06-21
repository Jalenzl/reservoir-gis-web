declare namespace analyze {
    import {FeatureCollection} from "@turf/helpers";

    export namespace  isolineAnalysis {
        export declare interface IsobandInterpolationData {
            centroidPoints: FeatureCollection
            cellSize: number
            propertyName: string
        }

        export declare interface IsobandResponse {
            status: string | number
            isoband: FeatureCollection
        }
    }
}