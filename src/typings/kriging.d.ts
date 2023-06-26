declare module "@/utils/interpolation/space-interpolation/kriging/kriging.js" {

    export declare interface variogram {
        t: number[];
        x: number[];
        y: number[];
        nugget: number;
        range: number;
        sill: number;
        A: number;
        n: number;
        model: string;
    }

    export declare function kriging(): kriging;

    export declare function train(t, x, y, model, sigma2, alpha): variogram;

    export declare function grid(polygons: number[][][], variogram: variogram, width): any[];

    export declare function plot(canvas: HTMLCanvasElement, grid, xlim: number[], ylim: number[], colors: string[]): number;

    export declare function predict(x, y, variogram: variogram): number;

}