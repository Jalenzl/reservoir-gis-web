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
        if (currentIndex % 15 === 0) {
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
        "#0073ff",
        "#0082ff",
        "#0090ff",
        "#009fff",
        "#00adff",
        "#00bcff",
        "#00caff",
        "#00d9ff",
        "#00e7ff",
        "#00f6ff",
        "#00fff6",
        "#00ffde",
        "#00ffc6",
        "#00ffae",
        "#00ff96",
        "#00ff7e",
        "#00ff66",
        "#00ff4e",
        "#00ff36",
        "#00ff1e",
        "#00ff06",
        "#10ff00",
        "#22ff00",
        "#33ff00",
        "#45ff00",
        "#56ff00",
        "#68ff00",
        "#79ff00",
        "#8bff00",
        "#9cff00",
        "#aeff00",
        "#bfff00",
        "#d1ff00",
        "#e2ff00",
        "#f4ff00",
        "#fff600",
        "#ffd500",
        "#ffc300",
        "#ffb200",
        "#ffa000",
        "#ff8f00",
        "#ff7d00",
        "#ff6c00",
        "#ff5a00",
        "#ff4900",
        "#ff3700",
        "#ff2600",
        "#ff1400",
        "#ff0300",
        "#ff0000",
    ];

    kriging.plot(canvas, grid, [minX, maxX], [minY, maxY], colors);

    // 5. return jpg
    return canvas.toDataURL("image/jpeg", 1.0);
}