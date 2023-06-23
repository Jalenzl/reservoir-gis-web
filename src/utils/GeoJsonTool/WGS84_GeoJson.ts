import {multiLineString, featureCollection, multiPolygon} from '@turf/turf';
import type {FeatureCollection, Feature} from "@turf/helpers";

export class WGS84_GeoJson {
    private _lng: number[];
    private _lat: number[];

    constructor(lng: number[], lat: number[]) {
        this._lng = lng;
        this._lat = lat;
    }

    get lng(): number[] {
        return this._lng;
    }

    set lng(value: number[]) {
        this._lng = value;
    }

    get lat(): number[] {
        return this._lat;
    }

    set lat(value: number[]) {
        this._lat = value;
    }

    createMultiLineString(propName: string, propValue: any): FeatureCollection {
        let coordinates = [];
        for (let i = 0; i < this.lng.length; i++) {
            coordinates.push([this.lng[i], this.lat[i]]);
        }
        const feature = multiLineString(
            [[
                coordinates
            ]]
        );
        if (propName && propValue) {
            feature.properties[propName] = propValue;
        }
        return feature;
    }

    createMultiPolygon(propName: string, propValue: any): FeatureCollection {
        let coordinates = [];
        for (let i = 0; i < this.lng.length; i++) {
            coordinates.push([this.lng[i], this.lat[i]]);
        }
        const feature = multiPolygon(
            [[
                coordinates
            ]]
        );
        if (propName && propValue) {
            feature.properties[propName] = propValue;
        }
        return feature;
    }

    static createFeatureCollection(features: Feature[]): FeatureCollection {
        return featureCollection(features);
    }

    static getCoordinates(geoJson: FeatureCollection) {
        let coordinates: number[][] = [];
        geoJson.features.forEach((feature: Feature) => {
            feature.geometry.coordinates.forEach((coordinate: number[][]) => {
                coordinates.push(coordinate[0]);
            })
        });
        return coordinates;
    }
}