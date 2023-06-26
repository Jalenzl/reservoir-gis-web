import kriging from '@/utils/interpolation/space-interpolation/kriging/kriging.js';
import {bbox as t_bbox, bboxPolygon as t_bboxPolygon, centroid as t_centroid, coordEach, featureEach} from "@turf/turf";
import type {FeatureCollection} from "@turf/helpers";

export const krigingInterpByProp = (canvas: HTMLCanvasElement, boundaryGeoJson: FeatureCollection, propGeoJson: FeatureCollection, propName: string): string => {
    // 1. get grid boundary
    const bbox = t_bbox(boundaryGeoJson);
    const bboxPolygon = t_bboxPolygon(bbox);
    const minX = bbox[0];
    const maxX = bbox[2];
    const minY = bbox[1];
    const maxY = bbox[3];

    // 2. get grid coord and value data
    let lngArr: any[] = [];
    let latArr: any[] = [];
    let valueArr: any[] = [];

    featureEach(propGeoJson, function (currentFeature, currentIndex) { // 每隔40个点取一个样本点
        if (currentIndex % 40 === 0) {
            const value = currentFeature.properties[propName];
            valueArr.push(value);
            const centroid = t_centroid(currentFeature);
            coordEach(centroid, function (currentCoord) {
                lngArr.push(currentCoord[0]);
                latArr.push(currentCoord[1]);
            });
        }
    });

    // 3. train dataSet

    const variogram = kriging.train(valueArr, lngArr, latArr, 'exponential', 0, 100);

    // 4. render

    const grid = kriging.grid(bboxPolygon.geometry.coordinates, variogram, (maxY - minY) / 100);
    const colors = [
        "#0000ff",
        "#000eff",
        "#001dff",
        "#002bff",
        "#003aff",
        "#0048ff",
        "#0057ff",
        "#0065ff",
        "#0073ff",
        "#0082ff",
        "#0090ff",
        "#009fff",
        "#00adff",
        "#00bcff",
        "#00caff",
        "#00d9ff",
        "#00e7ff",
        "#00f5ff",
        "#05fffa",
        "#13ffec",
        "#22ffdd",
        "#30ffcf",
        "#3effc0",
        "#4dffb2",
        "#5bffa4",
        "#6aff95",
        "#78ff87",
        "#87ff78",
        "#95ff6a",
        "#a4ff5b",
        "#b2ff4d",
        "#c0ff3f",
        "#cfff30",
        "#ddff22",
        "#ecff13",
        "#faff05",
        "#fff500",
        "#ffe700",
        "#ffd900",
        "#ffca00",
        "#ffbc00",
        "#ffad00",
        "#ff9f00",
        "#ff9000",
        "#ff8200",
        "#ff7300",
        "#ff6500",
        "#ff5700",
        "#ff4800",
        "#ff3a00",
        "#ff2b00",
        "#ff1d00",
        "#ff0e00",
        "#ff0000",
    ];

    kriging.plot(canvas, grid, [minX, maxX], [minY, maxY], colors);

    // 5. return jpg
    return canvas.toDataURL("image/jpeg", 1.0);
}