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

export const getColor_pressure = (alpha: number, prop: number) => {
    const colorSettings = new ColorSettings_pressure(alpha)
    const colorHash = {}
    // @ts-ignore
    let color = colorHash[prop]
    if (!color) {
        if (prop >= 28401) {
            color = colorSettings.colorBand.color1
        } else if (prop >= 25737 && prop <= 28401) {
            color = colorSettings.colorBand.color2
        } else if (prop >= 23072 && prop <= 25737) {
            color = colorSettings.colorBand.color3
        } else if (prop >= 20407 && prop <= 23072) {
            color = colorSettings.colorBand.color4
        } else if (prop >= 17743 && prop <= 20407) {
            color = colorSettings.colorBand.color5
        } else if (prop >= 15078 && prop <= 17743) {
            color = colorSettings.colorBand.color6
        } else if (prop >= 12413 && prop <= 15078) {
            color = colorSettings.colorBand.color7
        } else if (prop >= 9749 && prop <= 12413) {
            color = colorSettings.colorBand.color8
        } else if (prop >= 7084 && prop <= 9749) {
            color = colorSettings.colorBand.color9
        } else if (prop <= 7084) {
            color = colorSettings.colorBand.color10
        }
        // @ts-ignore
        colorHash[prop] = color

        return color
    }
}