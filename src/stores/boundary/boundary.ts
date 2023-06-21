import {defineStore} from 'pinia'
import {get} from '@/utils/request'
import {FeatureCollection} from "@turf/helpers";

export const useBoundaryStore = defineStore('boundary', () => {
    // get boundary line
    const getBoundaryLine = async (): Promise<FeatureCollection> => {
        const url = '/boundary/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=boundary%3Aboundary_line&maxFeatures=50&outputFormat=application%2Fjson'
       return await get<FeatureCollection>(url)
    }

    const getBoundaryFace = async (): Promise<FeatureCollection> => {
      const url = '/boundary/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=boundary%3Aboundary_face&maxFeatures=50&outputFormat=application%2Fjson'
        return await get<FeatureCollection>(url)
    }

    return { getBoundaryLine, getBoundaryFace }
})