import {type Tile} from "@/utils/Three/tile/tile";

export class Render {
    private _tile: Tile;
    constructor(tile: Tile) {
        this._tile = tile;
    }

    get tile(): Tile {
        return this._tile;
    }

    set tile(value: Tile) {
        this._tile = value;
    }

    public meshByProp(propArr: number[], propName: string, vertexShader: string, fragmentShader: string) {
        const geometry = this.tile.getGeometry(1, 1)
        this.tile.setAttributes(geometry, propArr, propName, 1)
        const material = this.tile.getShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            opacity: 0.5,
            // wireframe: true,
        })
        return this.tile.mesh(geometry, material)
    }
}