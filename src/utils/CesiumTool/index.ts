import {
    Viewer,
    Scene,
    Globe,
    Clock,
    DirectionalLight,
    Cartesian3,
    ClockRange,
    HeadingPitchRoll,
    JulianDate, Cartesian2, ConstantProperty
} from 'cesium';
import type {CesiumFieldMap} from "@/utils/GridFieldMap/CesiumFieldMap";
import type {GridFieldMap} from "@/utils/GridFieldMap";

type SampleData = interp.CesiumInterpolation.CesiumInterpSampleData

export class CesiumTool {

    public static initMap(cesiumContainerId: string) {
        let viewer: Viewer | undefined
        let scene: Scene | undefined
        let globe: Globe | undefined
        let clock: Clock | undefined

        viewer = new Viewer(cesiumContainerId, {
            animation: true,
            baseLayerPicker: true,
            fullscreenButton: false,
            geocoder: false,
            homeButton: false,
            infoBox: true,
            sceneModePicker: true,
            selectionIndicator: false,
            timeline: true,
            navigationHelpButton: false,
            scene3DOnly: false,
            sceneMode: 3,
        });

        scene = viewer.scene
        globe = scene.globe
        scene.screenSpaceCameraController.enableCollisionDetection = true
        scene.debugShowFramesPerSecond = true; //  帧率显示
        // @ts-ignore
        viewer.cesiumWidget.creditContainer.style.display = 'none' // 去除cesium商标
        // 消除时间对光照的影响
        viewer.scene.light = new DirectionalLight({
            direction: new Cartesian3(0.354925, -0.890918, -0.283358)
        })
        // viewer.animation.container.style.visibility = 'hidden'
        // viewer.animation.container.style.visibility = 'visible'
        // viewer.timeline.container.style.visibility = 'hidden'
        // viewer.timeline.container.style.visibility = 'visible'

        // 设置时间轴起始时间
        clock = viewer.clock
        const timelineModel = {
            timeSpeed: 86400 * 180, // 86400代表1s一天 这里设置1s一年
            originalTime: JulianDate.fromIso8601("1989-01-01"),
            endTime: JulianDate.fromIso8601("1998-01-01"),
        }
        const originalTime = timelineModel.originalTime
        const endTime = timelineModel.endTime
        clock.startTime = originalTime.clone()
        clock.stopTime = endTime.clone()
        clock.currentTime = originalTime.clone()
        clock.clockRange = ClockRange.LOOP_STOP // 时间段内循环播放
        viewer.timeline.zoomTo(originalTime, endTime) // 固定时间轴显示的时间段
        viewer.clockViewModel.multiplier = timelineModel.timeSpeed   // 设置时间流速

        // 调整视角
        viewer.camera.setView({
            destination: Cartesian3.fromDegrees(118.54700, 37.520409, 1400),
            orientation: new HeadingPitchRoll(1.0639406240008213, -Math.PI / 4, 0.00002273530734786533)
        })

        return {
            viewer,
            scene,
            globe,
            clock
        }
    }

    public static getVec2Position5 = (position: Cartesian3[][]) => {
        let tileNum = 778
        let positionArrX: number[][] = []
        let positionArrY: number[][] = []
        let positionArrVec2: Cartesian2[][] = []
        for (let i = 0; i < tileNum; i++) {
            const iposition: Cartesian3[] = position[i];
            let ipositionArrX: number[] = []
            let ipositionArrY: number[] = []
            let ipositionArrVec2: Cartesian2[] = []
            for (let j = 0; j < 5; j++) {
                const ipositionX = iposition[j].x
                const ipositionY = iposition[j].y
                ipositionArrX.push(ipositionX)
                ipositionArrY.push(ipositionY)
                ipositionArrVec2.push(new Cartesian2(ipositionX, ipositionY))
            }
            positionArrX.push(ipositionArrX)
            positionArrY.push(ipositionArrY)
            positionArrVec2.push(ipositionArrVec2)
        }
        return { positionArrX, positionArrY, positionArrVec2 }
    }

    public static showExtrudedHeight(cesiumFieldMap: CesiumFieldMap, sampleData: SampleData) {
        cesiumFieldMap.destory()
        cesiumFieldMap.getCurrentPropValue(sampleData).then((currentPropVal) => {
            cesiumFieldMap.init(currentPropVal as number[])
            cesiumFieldMap.addWell()
        })
    }

    public static hideExtrudedHeight(cesiumFieldMap: CesiumFieldMap) {
        const viewer = cesiumFieldMap.viewer
        for (let i = 0; i < cesiumFieldMap.getTileNum(); i++) {
            const entity = viewer.entities.values[i]
            entity.polygon!.extrudedHeight = new ConstantProperty(false)
        }
    }

}