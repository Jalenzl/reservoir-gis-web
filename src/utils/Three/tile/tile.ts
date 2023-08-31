import {
    BufferAttribute,
    BufferGeometry, Material,
    Mesh,
    PlaneGeometry,
    RawShaderMaterial,
    type ShaderMaterialParameters
} from 'three';
import {type FeatureCollection} from "@turf/helpers";

export class Tile {
    private _width: number;
    private _height: number;
    private _center: number[];
    private _tileId: number;
    constructor(center: number[], tileId: number) {
        this._width = 0.05;
        this._height = 0.05;
        this._center = center;
        this._tileId = tileId;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get center(): number[] {
        return this._center;
    }

    set center(value: number[]) {
        this._center = value;
    }

    get tileId(): number {
        return this._tileId;
    }

    set tileId(value: number) {
        this._tileId = value;
    }

    public getGeometry(widthSegments?: number, heightSegments?: number): PlaneGeometry {
        const geometry: PlaneGeometry = new PlaneGeometry(this.width, this.height, widthSegments, heightSegments);
        geometry.translate(this.center[0], this.center[1], this.center[2]);
        geometry.rotateX(-Math.PI / 2)

        return geometry;
    }

    public getShaderMaterial(options: ShaderMaterialParameters) {
        return new RawShaderMaterial(options)
    }

    public setAttributes(geometry: FeatureCollection, propArr: number[], propName: string, itemSize: number) {
        const count = geometry.attributes.position.count;
        const attribute = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            let prop1st = propArr[this.tileId - 1];
            let prop2nd = propArr[this.tileId];
            let step = (prop2nd - prop1st) / count;
            attribute[i] = prop1st + step * i;
            // attribute[i] = prop1st;
        }
        geometry.setAttribute(propName, new BufferAttribute(attribute, itemSize));
    }

    public mesh(geometry: BufferGeometry, material: Material): Mesh {
        return new Mesh(geometry, material);
    }
}