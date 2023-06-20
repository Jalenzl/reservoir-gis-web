import {Viewer, Scene, Globe, Clock} from 'cesium';

declare namespace map {

  export declare interface IMapInstance {
      viewer: Viewer;
      scene: Scene;
      globe: Globe;
      clock: Clock;
      [key: string]: any;
  }
}