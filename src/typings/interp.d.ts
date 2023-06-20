declare namespace interp{

    export namespace CesiumInterpolation{
        export declare interface CesiumInterpSampleData {
            timeArray: string[]
            propValArray: number[][]
            interpolationAlgorithm?: string
            currentTime: string
        }

        export declare interface CesiumInterpResponse {
            status: string | number
            currentPropValArr: number[]
        }

        export declare interface CesiumInterpOptions {
            bottom: number
            peak: number
            outline?: boolean
        }
    }
}



