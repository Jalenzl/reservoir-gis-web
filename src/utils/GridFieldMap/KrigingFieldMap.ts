import {CallbackProperty, Cartesian3, ImageMaterialProperty, Viewer} from "cesium";
import {krigingInterpByProp} from "@/utils/interpolation/space-interpolation/kriging/krigingInterp";
import {coordEach} from "@turf/turf";
import type {FeatureCollection} from "@turf/helpers";

/**
 * @class
 * @desc 用于创建kriging插值后的属性值场图
 * @param {Viewer} viewer cesium viewer
 * @param {HTMLCanvasElement} canvas canvas element
 * @param {FeatureCollection} boundary boundary geoJson
 * @param {FeatureCollection} prop property geoJson
 * @param {string} id filed map entity id
 * @param {string} propName property name
 *
 */
export class KrigingFieldMap {
    private _viewer: Viewer;
    private _canvas: HTMLCanvasElement;
    private _boundary: FeatureCollection;
    private _prop: FeatureCollection;
    private _id: string;
    private _propName: string;

    constructor(viewer: Viewer, canvas: HTMLCanvasElement, boundary: FeatureCollection, prop: FeatureCollection, id: string, propName: string) {
        this._viewer = viewer;
        this._canvas = canvas;
        this._boundary = boundary;
        this._prop = prop;
        this._id = id;
        this._propName = propName;
    }

    get viewer(): Viewer {
        return this._viewer;
    }

    set viewer(value: Viewer) {
        this._viewer = value;
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    set canvas(value: HTMLCanvasElement) {
        this._canvas = value;
    }

    get boundary(): FeatureCollection {
        return this._boundary;
    }

    set boundary(value: FeatureCollection) {
        this._boundary = value;
    }

    get prop(): FeatureCollection {
        return this._prop;
    }

    set prop(value: FeatureCollection) {
        this._prop = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get propName(): string {
        return this._propName;
    }

    set propName(value: string) {
        this._propName = value;
    }

    private _changeMaterial(prop: FeatureCollection) {
        // @ts-ignore
        (this.viewer.entities.getById(this.id)).polygon.material = new ImageMaterialProperty({
            image: new CallbackProperty(() => {
                return krigingInterpByProp(this.canvas, this.boundary, prop, this.propName)
            }, false)
        })
    }

    /**
     * @func
     * @desc 获取输入的geoJson data经过kriging插值后jpeg格式的texture
     * @param {FeatureCollection} prop property geoJson data
     */
    getRawTextureImg(prop = this.prop): string {
        return krigingInterpByProp(this.canvas, this.boundary, prop, this.propName)
    }

    /**
     * @func
     * @desc 获取输入的geoJson data经过kriging插值后ImageMaterialProperty格式的material
     * @param {FeatureCollection} prop property geoJson data
     */
    getMaterial(prop: FeatureCollection = this.prop) {
        if (prop) {
            return new ImageMaterialProperty({
                image: this.getRawTextureImg(prop),
            })
        } else {
            // @ts-ignore
            return this.viewer.entities.getById(this.id).polygon.material
        }
    }

    /**
     * @func
     * @desc 初始化场图 形状为输入的geoJson 材质为半透明白色
     */
    init(prop = this.prop) {
        let boundaryCoords: number[] = []
        coordEach(this.boundary, function (currentCoord: number[]) {
            boundaryCoords.push(...currentCoord)
        })
        this.viewer.entities.add({
            name: 'grid_boundary',
            id: this.id,
            polygon: {
                hierarchy: Cartesian3.fromDegreesArray(boundaryCoords),
                material: new ImageMaterialProperty({
                    image: this.getRawTextureImg(prop),
                }),
            }
        })
    }

    /**
     * @func
     * @desc 根据不同时刻属性值geoJson数据绘制场图
     * @param {FeatureCollection} prop property geoJson data
     */
    update(prop: FeatureCollection = this.prop) {
        if (this.viewer.entities.getById(this.id)) {
            this._changeMaterial(prop);
        }
    }

    /**
     * @func
     * @desc 删除类实例对应viewer中的field map entity
     */
    destroy() {
        if (this.viewer.entities.getById(this.id)) {
            this.viewer.entities.removeById(this.id)
        }
    }
}