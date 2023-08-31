/// <reference types="vite/client" />
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module '*.glsl' {
    const src: string;
    export default src;
}

declare module '@types/three'

declare module '@turf/turf'

declare module '@types/dat.gui'

declare module '@types/cesium'
