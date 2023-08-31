import {Color} from "cesium";

interface ColorBand {
    [colorNum: string]: Color
}


class ColorSettings_pressure {
    public colorBand: ColorBand
    private _alpha: number

    constructor(_alpha: number) {
        this._alpha = _alpha
        this.colorBand = {
            // 对应压力从大到小
            color1: new Color(255 / 255, 0 / 255, 0 / 255, this._alpha),
            color2: new Color(255 / 255, 125 / 255, 0 / 255, this._alpha),
            color3: new Color(255 / 255, 236 / 255, 0 / 255, this._alpha),
            color4: new Color(163 / 255, 255 / 255, 0 / 255, this._alpha),
            color5: new Color(52 / 255, 255 / 255, 0 / 255, this._alpha),
            color6: new Color(0 / 255, 255 / 255, 57 / 255, this._alpha),
            color7: new Color(0 / 255, 255 / 255, 168 / 255, this._alpha),
            color8: new Color(0 / 255, 231 / 255, 255 / 255, this._alpha),
            color9: new Color(0 / 255, 120 / 255, 255 / 255, this._alpha),
            color10: new Color(0 / 255, 0 / 255, 255 / 255, this._alpha),
        }
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        this._alpha = value;
    }
}

export const getColor_pressure = (alpha: number, prop: number, rangeArr: number[] = [7084, 9749, 12413, 15078, 17743, 20407, 23072, 25737, 28401]) => {
    const colorSettings = new ColorSettings_pressure(alpha)
    const colorHash = {}
    // @ts-ignore
    let color = colorHash[prop]
    if (!color) {
        if (prop >= rangeArr[8]) {
            color = colorSettings.colorBand.color1
        } else if (prop >= rangeArr[7] && prop <= rangeArr[8]) {
            color = colorSettings.colorBand.color2
        } else if (prop >= rangeArr[6] && prop <= rangeArr[7]) {
            color = colorSettings.colorBand.color3
        } else if (prop >= rangeArr[5] && prop <= rangeArr[6]) {
            color = colorSettings.colorBand.color4
        } else if (prop >= rangeArr[4] && prop <= rangeArr[5]) {
            color = colorSettings.colorBand.color5
        } else if (prop >= rangeArr[3] && prop <= rangeArr[4]) {
            color = colorSettings.colorBand.color6
        } else if (prop >= rangeArr[2] && prop <= rangeArr[3]) {
            color = colorSettings.colorBand.color7
        } else if (prop >= rangeArr[1] && prop <= rangeArr[2]) {
            color = colorSettings.colorBand.color8
        } else if (prop >= rangeArr[0] && prop <= rangeArr[1]) {
            color = colorSettings.colorBand.color9
        } else if (prop <= rangeArr[0]) {
            color = colorSettings.colorBand.color10
        }
        // @ts-ignore
        colorHash[prop] = color

        return color
    }
}