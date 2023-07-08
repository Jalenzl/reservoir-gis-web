declare namespace map {
  import {Viewer, Scene, Globe, Clock} from 'cesium';

  export declare interface IMapInstance {
      viewer: Viewer;
      scene: Scene;
      globe: Globe;
      clock: Clock;
      [key: string]: any;
  }
}