declare module "@turf/turf" {
    export { default as isolines } from "@turf/isolines";
    export { default as convex } from "@turf/convex";
    export { default as pointsWithinPolygon } from "@turf/points-within-polygon";
    export { default as concave } from "@turf/concave";
    export { default as collect } from "@turf/collect";
    export { default as flip } from "@turf/flip";
    export { default as simplify } from "@turf/simplify";
    export { default as bezierSpline } from "@turf/bezier-spline";
    export { default as tag } from "@turf/tag";
    export { default as sample } from "@turf/sample";
    export { default as envelope } from "@turf/envelope";
    export { default as square } from "@turf/square";
    export { default as circle } from "@turf/circle";
    export { default as midpoint } from "@turf/midpoint";
    export { default as center } from "@turf/center";
    export { default as centerOfMass } from "@turf/center-of-mass";
    export { default as centroid } from "@turf/centroid";
    export { default as combine } from "@turf/combine";
    export { default as distance } from "@turf/distance";
    export { default as explode } from "@turf/explode";
    export { default as bbox } from "@turf/bbox";
    export { default as tesselate } from "@turf/tesselate";
    export { default as bboxPolygon } from "@turf/bbox-polygon";
    export { default as booleanPointInPolygon } from "@turf/boolean-point-in-polygon";
    export { default as nearestPoint } from "@turf/nearest-point";
    export { default as nearestPointOnLine } from "@turf/nearest-point-on-line";
    export { default as nearestPointToLine } from "@turf/nearest-point-to-line";
    export { default as planepoint } from "@turf/planepoint";
    export { default as tin } from "@turf/tin";
    export { default as bearing } from "@turf/bearing";
    export { default as destination } from "@turf/destination";
    export { default as kinks } from "@turf/kinks";
    export { default as pointOnFeature } from "@turf/point-on-feature";
    export { default as area } from "@turf/area";
    export { default as along } from "@turf/along";
    export { default as length } from "@turf/length";
    export { default as lineSlice } from "@turf/line-slice";
    export { default as lineSliceAlong } from "@turf/line-slice-along";
    export { default as pointGrid } from "@turf/point-grid";
    export { default as truncate } from "@turf/truncate";
    export { default as flatten } from "@turf/flatten";
    export { default as lineIntersect } from "@turf/line-intersect";
    export { default as lineChunk } from "@turf/line-chunk";
    export { default as unkinkPolygon } from "@turf/unkink-polygon";
    export { default as greatCircle } from "@turf/great-circle";
    export { default as lineSegment } from "@turf/line-segment";
    export { default as lineSplit } from "@turf/line-split";
    export { default as lineArc } from "@turf/line-arc";
    export { default as polygonToLine } from "@turf/polygon-to-line";
    export { default as lineToPolygon } from "@turf/line-to-polygon";
    export { default as bboxClip } from "@turf/bbox-clip";
    export { default as lineOverlap } from "@turf/line-overlap";
    export { default as sector } from "@turf/sector";
    export { default as rhumbBearing } from "@turf/rhumb-bearing";
    export { default as rhumbDistance } from "@turf/rhumb-distance";
    export { default as rhumbDestination } from "@turf/rhumb-destination";
    export { default as polygonTangents } from "@turf/polygon-tangents";
    export { default as rewind } from "@turf/rewind";
    export { default as isobands } from "@turf/isobands";
    export { default as transformRotate } from "@turf/transform-rotate";
    export { default as transformScale } from "@turf/transform-scale";
    export { default as transformTranslate } from "@turf/transform-translate";
    export { default as lineOffset } from "@turf/line-offset";
    export { default as polygonize } from "@turf/polygonize";
    export { default as booleanDisjoint } from "@turf/boolean-disjoint";
    export { default as booleanContains } from "@turf/boolean-contains";
    export { default as booleanCrosses } from "@turf/boolean-crosses";
    export { default as booleanClockwise } from "@turf/boolean-clockwise";
    export { default as booleanOverlap } from "@turf/boolean-overlap";
    export { default as booleanPointOnLine } from "@turf/boolean-point-on-line";
    export { default as booleanEqual } from "@turf/boolean-equal";
    export { default as booleanWithin } from "@turf/boolean-within";
    export { default as clone } from "@turf/clone";
    export { default as cleanCoords } from "@turf/clean-coords";
    export { default as clustersDbscan } from "@turf/clusters-dbscan";
    export { default as clustersKmeans } from "@turf/clusters-kmeans";
    export { default as pointToLineDistance } from "@turf/point-to-line-distance";
    export { default as booleanParallel } from "@turf/boolean-parallel";
    export { default as shortestPath } from "@turf/shortest-path";
    export { default as voronoi } from "@turf/voronoi";
    export { default as ellipse } from "@turf/ellipse";
    export { default as centerMean } from "@turf/center-mean";
    export { default as centerMedian } from "@turf/center-median";
    export { default as standardDeviationalEllipse } from "@turf/standard-deviational-ellipse";
    export { default as angle } from "@turf/angle";
    export { default as polygonSmooth } from "@turf/polygon-smooth";
    export { default as moranIndex } from "@turf/moran-index";
    export { default as distanceWeight } from "@turf/distance-weight";
    export * from "@turf/projection";
    export * from "@turf/random";
    export * from "@turf/clusters";
    export * from "@turf/helpers";
    export * from "@turf/invariant";
    export * from "@turf/meta";
    import * as projection from "@turf/projection";
    import * as random from "@turf/random";
    import * as clusters from "@turf/clusters";
    import * as helpers from "@turf/helpers";
    import * as invariant from "@turf/invariant";
    import * as meta from "@turf/meta";
    export { projection, random, clusters, helpers, invariant, meta };

// JSTS Modules
    export { default as difference } from "@turf/difference";
    export { default as buffer } from "@turf/buffer";
    export { default as union } from "@turf/union";
    export { default as intersect } from "@turf/intersect";

// JSTS Sub-Models
    export { default as dissolve } from "@turf/dissolve";
    export { default as hexGrid } from "@turf/hex-grid";
    export { default as mask } from "@turf/mask";
    export { default as squareGrid } from "@turf/square-grid";
    export { default as triangleGrid } from "@turf/triangle-grid";
    export { default as interpolate } from "@turf/interpolate";

// Renamed modules (Backwards compatitble with v4.0)
// https://github.com/Turfjs/turf/issues/860
    export { default as pointOnSurface } from "@turf/point-on-feature";
    export { default as polygonToLineString } from "@turf/polygon-to-line";
    export { default as lineStringToPolygon } from "@turf/line-to-polygon";
    export { default as inside } from "@turf/boolean-point-in-polygon";
    export { default as within } from "@turf/points-within-polygon";
    export { default as bezier } from "@turf/bezier-spline";
    export { default as nearest } from "@turf/nearest-point";
    export { default as pointOnLine } from "@turf/nearest-point-on-line";
    export { default as lineDistance } from "@turf/length";

// Renamed methods (Backwards compatitble with v4.0)
// https://github.com/Turfjs/turf/issues/860
    export {
        radiansToDegrees as radians2degrees,
        degreesToRadians as degrees2radians,
        lengthToDegrees as distanceToDegrees,
        lengthToRadians as distanceToRadians,
        radiansToLength as radiansToDistance,
        bearingToAzimuth as bearingToAngle,
        convertLength as convertDistance,
    } from "@turf/helpers";

}

declare module "@turf/helpers" {
    import { BBox, CollectionTypes, Feature, FeatureCollection, GeoJSONObject, Geometries, Geometry, GeometryCollection, GeometryObject, GeometryTypes, Id, LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon, Position, Properties, Types } from "@turf/helpers/dist/js/lib/geojson";
    export { Id, Properties, BBox, Position, Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon, GeometryObject, GeoJSONObject, GeometryCollection, Geometry, GeometryTypes, Types, CollectionTypes, Geometries, Feature, FeatureCollection, };
    export declare type Coord = Feature<Point> | Point | Position;
    export declare type Units = "meters" | "millimeters" | "centimeters" | "kilometers" | "acres" | "miles" | "nauticalmiles" | "inches" | "yards" | "feet" | "radians" | "degrees" | "hectares";
    export declare type Grid = "point" | "square" | "hex" | "triangle";
    export declare type Corners = "sw" | "se" | "nw" | "ne" | "center" | "centroid";
    export declare type Lines = LineString | MultiLineString | Polygon | MultiPolygon;
    export declare type AllGeoJSON = Feature | FeatureCollection | Geometry | GeometryCollection;
    /**
     * @module helpers
     */
    /**
     * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
     *
     * @memberof helpers
     * @type {number}
     */
    export declare let earthRadius: number;
    /**
     * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
     *
     * @memberof helpers
     * @type {Object}
     */
    export declare let factors: {
        [key: string]: number;
    };
    /**
     * Units of measurement factors based on 1 meter.
     *
     * @memberof helpers
     * @type {Object}
     */
    export declare let unitsFactors: {
        [key: string]: number;
    };
    /**
     * Area of measurement factors based on 1 square meter.
     *
     * @memberof helpers
     * @type {Object}
     */
    export declare let areaFactors: any;
    /**
     * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
     *
     * @name feature
     * @param {Geometry} geometry input geometry
     * @param {Object} [properties={}] an Object of key-value pairs to add as properties
     * @param {Object} [options={}] Optional Parameters
     * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
     * @param {string|number} [options.id] Identifier associated with the Feature
     * @returns {Feature} a GeoJSON Feature
     * @example
     * var geometry = {
     *   "type": "Point",
     *   "coordinates": [110, 50]
     * };
     *
     * var feature = turf.feature(geometry);
     *
     * //=feature
     */
    export declare function feature<G = Geometry, P = Properties>(geom: G, properties?: P, options?: {
        bbox?: BBox;
        id?: Id;
    }): Feature<G, P>;
    /**
     * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
     * For GeometryCollection type use `helpers.geometryCollection`
     *
     * @name geometry
     * @param {string} type Geometry Type
     * @param {Array<any>} coordinates Coordinates
     * @param {Object} [options={}] Optional Parameters
     * @returns {Geometry} a GeoJSON Geometry
     * @example
     * var type = "Point";
     * var coordinates = [110, 50];
     * var geometry = turf.geometry(type, coordinates);
     * // => geometry
     */
    export declare function geometry(type: "Point" | "LineString" | "Polygon" | "MultiPoint" | "MultiLineString" | "MultiPolygon", coordinates: any[], _options?: Record<string, never>): Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon;
    /**
     * Creates a {@link Point} {@link Feature} from a Position.
     *
     * @name point
     * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
     * @param {Object} [properties={}] an Object of key-value pairs to add as properties
     * @param {Object} [options={}] Optional Parameters
     * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
     * @param {string|number} [options.id] Identifier associated with the Feature
     * @returns {Feature<Point>} a Point feature
     * @example
     * var point = turf.point([-75.343, 39.984]);
     *
     * //=point
     */
    export declare function point<P = Properties>(coordinates: Position, properties?: P, options?: {
        bbox?: BBox;
        id?: Id;
    }): Feature<Point, P>;
    /**
     * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
     *
     * @name points
     * @param {Array<Array<number>>} coordinates an array of Points
     * @param {Object} [properties={}] Translate these properties to each Feature
     * @param {Object} [options={}] Optional Parameters
     * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
     * associated with the FeatureCollection
     * @param {string|number} [options.id] Identifier associated with the FeatureCollection
     * @returns {FeatureCollection<Point>} Point Feature
     * @example
     * var points = turf.points([
     *   [-75, 39],
     *   [-80, 45],
     *   [-78, 50]
     * ]);
     *
     * //=points
     */
    export declare function points<P = Properties>(coordinates: Position[], properties?: P, options?: {
        bbox?: BBox;
        id?: Id;
    }): FeatureCollection<Point, P>;
    /**
     * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
     *
     * @name polygon
     * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
     * @param {Object} [properties={}] an Object of key-value pairs to add as properties
     * @param {Object} [options={}] Optional Parameters
     * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
     * @param {string|number} [options.id] Identifier associated with the Feature
     * @returns {Feature<Polygon>} Polygon Feature
     * @example
     * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
     *
     * //=polygon
     */
    export declare function polygon<P = Properties>(coordinates: Position[][], properties?: P, options?: {
        bbox?: BBox;
        id?: Id;
    }): Feature<Polygon, P>;
    /**
     * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
     *
     * @name polygons
     * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
     * @param {Object} [properties={}] an Object of key-value pairs to add as properties
     * @param {Object} [options={}] Optional Parameters
     * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
     * @param {string|number} [options.id] Identifier associated with the FeatureCollection
     * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
     * @example
     * var polygons = turf.polygons([
     *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
     *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
     * ]);
     *
     * //=polygons
     */
    export declare function polygons<P = Properties>(coordinates: Position[][][], properties?: P, options?: {
        bbox?: BBox;
        id?: Id;
    }): FeatureCollection<Polygon, P>;
    /**
     * Creates a {@link LineString} {@link Feature} from an Array of Positions.
     *
     * @name lineString
     * @param {Array<Array<number>>} coordinates an array of Positions
     * @param {Object} [properties={}] an Object of key-value pairs to add as properties
     * @param {Object} [options={}] Optional Parameters
     * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
     * @param {string|number} [options.id] Identifier associated with the Feature
     * @returns {Feature<LineString>} LineString Feature
     * @example
     * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
     * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
     *
     * //=linestring1
     * //=linestring2
     */
    export declare function lineString<P = Properties>(coordinates: Position[], properties?: P, options?: {
        bbox?: BBox;
        id?: Id;
    }): Feature<LineString, P>;
    /**
     * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
     *
     * @name lineStrings
     * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
     * @param {Object} [properties={}] an Object of key-value pairs to add as properties
     * @param {Object} [options={}] Optional Parameters
     * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
     * associated with the FeatureCollection
     * @param {string|number} [options.id] Identifier associated with the FeatureCollection
     * @returns {FeatureCollection<LineString>} LineString FeatureCollection
     * @example
     * var linestrings = turf.lineStrings([
     *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
     *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
     * ]);
     *
     * //=linestrings
     */
    export declare function lineStrings<P = Properties>(coordinates: Position[][], properties?: P, options?: {
        bbox?: BBox;
        id?: Id;
    }): FeatureCollection<LineString, P>;
    /**
     * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
     *
     * @name featureCollection
     * @param {Feature[]} features input features
     * @param {Object} [options={}] Optional Parameters
     * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
     * @param {string|number} [options.id] Identifier associated with the Feature
     * @returns {FeatureCollection} FeatureCollection of Features
     * @example
     * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
     * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
     * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
     *
     * var collection = turf.featureCollection([
     *   locationA,
     *   locationB,
     *   locationC
     * ]);
     *
     * //=collection
     */
    export declare function featureCollection<G = Geometry, P = Properties>(features: Array<Feature<G, P>>, options?: {
        bbox?: BBox;
        id?: Id;
    }): FeatureCollection<G, P>;
    /**
     * Creates a {@link Feature<MultiLineString>} based on a
     * coordinate array. Properties can be added optionally.
     *
     * @name multiLineString
     * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
     * @param {Object} [properties={}] an Object of key-value pairs to add as properties
     * @param {Object} [options={}] Optional Parameters
     * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
     * @param {string|number} [options.id] Identifier associated with the Feature
     * @returns {Feature<MultiLineString>} a MultiLineString feature
     * @throws {Error} if no coordinates are passed
     * @example
     * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
     *
     * //=multiLine
     */
    export declare function multiLineString<P = Properties>(coordinates: Position[][], properties?: P, options?: {
        bbox?: BBox;
        id?: Id;
    }): Feature<MultiLineString, P>;
    /**
     * Creates a {@link Feature<MultiPoint>} based on a
     * coordinate array. Properties can be added optionally.
     *
     * @name multiPoint
     * @param {Array<Array<number>>} coordinates an array of Positions
     * @param {Object} [properties={}] an Object of key-value pairs to add as properties
     * @param {Object} [options={}] Optional Parameters
     * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
     * @param {string|number} [options.id] Identifier associated with the Feature
     * @returns {Feature<MultiPoint>} a MultiPoint feature
     * @throws {Error} if no coordinates are passed
     * @example
     * var multiPt = turf.multiPoint([[0,0],[10,10]]);
     *
     * //=multiPt
     */
    export declare function multiPoint<P = Properties>(coordinates: Position[], properties?: P, options?: {
        bbox?: BBox;
        id?: Id;
    }): Feature<MultiPoint, P>;
    /**
     * Creates a {@link Feature<MultiPolygon>} based on a
     * coordinate array. Properties can be added optionally.
     *
     * @name multiPolygon
     * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
     * @param {Object} [properties={}] an Object of key-value pairs to add as properties
     * @param {Object} [options={}] Optional Parameters
     * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
     * @param {string|number} [options.id] Identifier associated with the Feature
     * @returns {Feature<MultiPolygon>} a multipolygon feature
     * @throws {Error} if no coordinates are passed
     * @example
     * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
     *
     * //=multiPoly
     *
     */
    export declare function multiPolygon<P = Properties>(coordinates: Position[][][], properties?: P, options?: {
        bbox?: BBox;
        id?: Id;
    }): Feature<MultiPolygon, P>;
    /**
     * Creates a {@link Feature<GeometryCollection>} based on a
     * coordinate array. Properties can be added optionally.
     *
     * @name geometryCollection
     * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
     * @param {Object} [properties={}] an Object of key-value pairs to add as properties
     * @param {Object} [options={}] Optional Parameters
     * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
     * @param {string|number} [options.id] Identifier associated with the Feature
     * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
     * @example
     * var pt = turf.geometry("Point", [100, 0]);
     * var line = turf.geometry("LineString", [[101, 0], [102, 1]]);
     * var collection = turf.geometryCollection([pt, line]);
     *
     * // => collection
     */
    export declare function geometryCollection<P = Properties>(geometries: Array<Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon>, properties?: P, options?: {
        bbox?: BBox;
        id?: Id;
    }): Feature<GeometryCollection, P>;
    /**
     * Round number to precision
     *
     * @param {number} num Number
     * @param {number} [precision=0] Precision
     * @returns {number} rounded number
     * @example
     * turf.round(120.4321)
     * //=120
     *
     * turf.round(120.4321, 2)
     * //=120.43
     */
    export declare function round(num: number, precision?: number): number;
    /**
     * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
     * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
     *
     * @name radiansToLength
     * @param {number} radians in radians across the sphere
     * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
     * meters, kilometres, kilometers.
     * @returns {number} distance
     */
    export declare function radiansToLength(radians: number, units?: Units): number;
    /**
     * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
     * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
     *
     * @name lengthToRadians
     * @param {number} distance in real units
     * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
     * meters, kilometres, kilometers.
     * @returns {number} radians
     */
    export declare function lengthToRadians(distance: number, units?: Units): number;
    /**
     * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
     * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
     *
     * @name lengthToDegrees
     * @param {number} distance in real units
     * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
     * meters, kilometres, kilometers.
     * @returns {number} degrees
     */
    export declare function lengthToDegrees(distance: number, units?: Units): number;
    /**
     * Converts any bearing angle from the north line direction (positive clockwise)
     * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
     *
     * @name bearingToAzimuth
     * @param {number} bearing angle, between -180 and +180 degrees
     * @returns {number} angle between 0 and 360 degrees
     */
    export declare function bearingToAzimuth(bearing: number): number;
    /**
     * Converts an angle in radians to degrees
     *
     * @name radiansToDegrees
     * @param {number} radians angle in radians
     * @returns {number} degrees between 0 and 360 degrees
     */
    export declare function radiansToDegrees(radians: number): number;
    /**
     * Converts an angle in degrees to radians
     *
     * @name degreesToRadians
     * @param {number} degrees angle between 0 and 360 degrees
     * @returns {number} angle in radians
     */
    export declare function degreesToRadians(degrees: number): number;
    /**
     * Converts a length to the requested unit.
     * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
     *
     * @param {number} length to be converted
     * @param {Units} [originalUnit="kilometers"] of the length
     * @param {Units} [finalUnit="kilometers"] returned unit
     * @returns {number} the converted length
     */
    export declare function convertLength(length: number, originalUnit?: Units, finalUnit?: Units): number;
    /**
     * Converts a area to the requested unit.
     * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches, hectares
     * @param {number} area to be converted
     * @param {Units} [originalUnit="meters"] of the distance
     * @param {Units} [finalUnit="kilometers"] returned unit
     * @returns {number} the converted area
     */
    export declare function convertArea(area: number, originalUnit?: Units, finalUnit?: Units): number;
    /**
     * isNumber
     *
     * @param {*} num Number to validate
     * @returns {boolean} true/false
     * @example
     * turf.isNumber(123)
     * //=true
     * turf.isNumber('foo')
     * //=false
     */
    export declare function isNumber(num: any): boolean;
    /**
     * isObject
     *
     * @param {*} input variable to validate
     * @returns {boolean} true/false
     * @example
     * turf.isObject({elevation: 10})
     * //=true
     * turf.isObject('foo')
     * //=false
     */
    export declare function isObject(input: any): boolean;
    /**
     * Validate BBox
     *
     * @private
     * @param {Array<number>} bbox BBox to validate
     * @returns {void}
     * @throws Error if BBox is not valid
     * @example
     * validateBBox([-180, -40, 110, 50])
     * //=OK
     * validateBBox([-180, -40])
     * //=Error
     * validateBBox('Foo')
     * //=Error
     * validateBBox(5)
     * //=Error
     * validateBBox(null)
     * //=Error
     * validateBBox(undefined)
     * //=Error
     */
    export declare function validateBBox(bbox: any): void;
    /**
     * Validate Id
     *
     * @private
     * @param {string|number} id Id to validate
     * @returns {void}
     * @throws Error if Id is not valid
     * @example
     * validateId([-180, -40, 110, 50])
     * //=Error
     * validateId([-180, -40])
     * //=Error
     * validateId('Foo')
     * //=OK
     * validateId(5)
     * //=OK
     * validateId(null)
     * //=Error
     * validateId(undefined)
     * //=Error
     */
    export declare function validateId(id: any): void;

}

declare module "@turf/meta" {
    import {
        Point,
        LineString,
        Polygon,
        MultiLineString,
        MultiPolygon,
        FeatureCollection,
        Feature,
        GeometryObject,
        GeometryCollection,
        AllGeoJSON,
        Properties,
        Geometries,
        Lines,
        BBox,
        Id,
    } from "@turf/helpers";

    /**
     * http://turfjs.org/docs/#coordreduce
     */
    export function coordReduce<Reducer extends any>(
        geojson: AllGeoJSON,
        callback: (
            previousValue: Reducer,
            currentCoord: number[],
            coordIndex: number,
            featureIndex: number,
            multiFeatureIndex: number,
            geometryIndex: number
        ) => Reducer,
        initialValue?: Reducer
    ): Reducer;

    /**
     * http://turfjs.org/docs/#coordeach
     */
    export function coordEach(
        geojson: AllGeoJSON,
        callback: (
            currentCoord: number[],
            coordIndex: number,
            featureIndex: number,
            multiFeatureIndex: number,
            geometryIndex: number
        ) => void,
        excludeWrapCoord?: boolean
    ): void;

    /**
     * http://turfjs.org/docs/#propeach
     */
    export function propEach<Props extends Properties>(
        geojson: Feature<any> | FeatureCollection<any> | Feature<GeometryCollection>,
        callback: (currentProperties: Props, featureIndex: number) => void
    ): void;

    /**
     * http://turfjs.org/docs/#propreduce
     */
    export function propReduce<Reducer extends any, P = Properties>(
        geojson:
            | Feature<any, P>
            | FeatureCollection<any, P>
            | Geometries
            | GeometryCollection,
        callback: (
            previousValue: Reducer,
            currentProperties: P,
            featureIndex: number
        ) => Reducer,
        initialValue?: Reducer
    ): Reducer;

    /**
     * http://turfjs.org/docs/#featurereduce
     */
    export function featureReduce<
        Reducer extends any,
        G extends Geometries,
        P = Properties
    >(
        geojson:
            | Feature<G, P>
            | FeatureCollection<G, P>
            | Feature<GeometryCollection, P>,
        callback: (
            previousValue: Reducer,
            currentFeature: Feature<G, P>,
            featureIndex: number
        ) => Reducer,
        initialValue?: Reducer
    ): Reducer;

    /**
     * http://turfjs.org/docs/#featureeach
     */
    export function featureEach<G extends any, P = Properties>(
        geojson:
            | Feature<G, P>
            | FeatureCollection<G, P>
            | Feature<GeometryCollection, P>,
        callback: (currentFeature: Feature<G, P>, featureIndex: number) => void
    ): void;

    /**
     * http://turfjs.org/docs/#coordall
     */
    export function coordAll(geojson: AllGeoJSON): number[][];

    /**
     * http://turfjs.org/docs/#geomreduce
     */
    export function geomReduce<
        Reducer extends any,
        G extends Geometries,
        P = Properties
    >(
        geojson:
            | Feature<G, P>
            | FeatureCollection<G, P>
            | G
            | GeometryCollection
            | Feature<GeometryCollection, P>,
        callback: (
            previousValue: Reducer,
            currentGeometry: G,
            featureIndex: number,
            featureProperties: P,
            featureBBox: BBox,
            featureId: Id
        ) => Reducer,
        initialValue?: Reducer
    ): Reducer;

    /**
     * http://turfjs.org/docs/#geomeach
     */
    export function geomEach<G extends Geometries | null, P = Properties>(
        geojson:
            | Feature<G, P>
            | FeatureCollection<G, P>
            | G
            | GeometryCollection
            | Feature<GeometryCollection, P>,
        callback: (
            currentGeometry: G,
            featureIndex: number,
            featureProperties: P,
            featureBBox: BBox,
            featureId: Id
        ) => void
    ): void;

    /**
     * http://turfjs.org/docs/#flattenreduce
     */
    export function flattenReduce<
        Reducer extends any,
        G extends Geometries,
        P = Properties
    >(
        geojson:
            | Feature<G, P>
            | FeatureCollection<G, P>
            | G
            | GeometryCollection
            | Feature<GeometryCollection, P>,
        callback: (
            previousValue: Reducer,
            currentFeature: Feature<G, P>,
            featureIndex: number,
            multiFeatureIndex: number
        ) => Reducer,
        initialValue?: Reducer
    ): Reducer;

    /**
     * http://turfjs.org/docs/#flatteneach
     */
    export function flattenEach<G = Geometries, P = Properties>(
        geojson:
            | Feature<G, P>
            | FeatureCollection<G, P>
            | G
            | GeometryCollection
            | Feature<GeometryCollection, P>,
        callback: (
            currentFeature: Feature<G, P>,
            featureIndex: number,
            multiFeatureIndex: number
        ) => void
    ): void;

    /**
     * http://turfjs.org/docs/#segmentreduce
     */
    export function segmentReduce<Reducer extends any, P = Properties>(
        geojson:
            | FeatureCollection<Lines, P>
            | Feature<Lines, P>
            | Lines
            | Feature<GeometryCollection, P>
            | GeometryCollection,
        callback: (
            previousValue?: Reducer,
            currentSegment?: Feature<LineString, P>,
            featureIndex?: number,
            multiFeatureIndex?: number,
            segmentIndex?: number,
            geometryIndex?: number
        ) => Reducer,
        initialValue?: Reducer
    ): Reducer;

    /**
     * http://turfjs.org/docs/#segmenteach
     */
    export function segmentEach<P = Properties>(
        geojson: AllGeoJSON,
        callback: (
            currentSegment?: Feature<LineString, P>,
            featureIndex?: number,
            multiFeatureIndex?: number,
            segmentIndex?: number,
            geometryIndex?: number
        ) => void
    ): void;

    /**
     * http://turfjs.org/docs/#linereduce
     */
    export function lineReduce<Reducer extends any, P = Properties>(
        geojson:
            | FeatureCollection<Lines, P>
            | Feature<Lines, P>
            | Lines
            | Feature<GeometryCollection, P>
            | GeometryCollection,
        callback: (
            previousValue?: Reducer,
            currentLine?: Feature<LineString, P>,
            featureIndex?: number,
            multiFeatureIndex?: number,
            geometryIndex?: number
        ) => Reducer,
        initialValue?: Reducer
    ): Reducer;

    /**
     * http://turfjs.org/docs/#lineeach
     */
    export function lineEach<P = Properties>(
        geojson:
            | FeatureCollection<Lines, P>
            | Feature<Lines, P>
            | Lines
            | Feature<GeometryCollection, P>
            | GeometryCollection,
        callback: (
            currentLine?: Feature<LineString, P>,
            featureIndex?: number,
            multiFeatureIndex?: number,
            geometryIndex?: number
        ) => void
    ): void;

    /**
     * http://turfjs.org/docs/#findsegment
     */
    export function findSegment<
        G extends LineString | MultiLineString | Polygon | MultiPolygon,
        P = Properties
    >(
        geojson: Feature<G, P> | FeatureCollection<G, P> | G,
        options?: {
            featureIndex?: number;
            multiFeatureIndex?: number;
            geometryIndex?: number;
            segmentIndex?: number;
            properties?: P;
            bbox?: BBox;
            id?: Id;
        }
    ): Feature<LineString, P>;

    /**
     * http://turfjs.org/docs/#findpoint
     */
    export function findPoint<G extends GeometryObject, P = Properties>(
        geojson: Feature<G, P> | FeatureCollection<G, P> | G,
        options?: {
            featureIndex?: number;
            multiFeatureIndex?: number;
            geometryIndex?: number;
            coordIndex?: number;
            properties?: P;
            bbox?: BBox;
            id?: Id;
        }
    ): Feature<Point, P>;

}

