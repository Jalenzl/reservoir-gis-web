import {defineStore} from 'pinia';
import {Color, Cartesian3, JulianDate} from "cesium";
import {reactive, ref} from "vue";

export const useGeneralParams = defineStore('generalParams', () => {
    // some params about transparent earth
    let originalColor = reactive(Color.BLACK);
    let originalNearDistance = ref(1000.0);
    let originalFarDistance = ref(1000000.0);
    let originalNearAlpha = ref(0.0);
    let originalFarAlpha = ref(1.0);

    // 3D terrain entity position
    const longitude = ref(118.55682422);
    const latitude = ref(37.52715143);
    const height = ref(-2200.0);
    const position = reactive(Cartesian3.fromDegrees(
        longitude.value,
        latitude.value,
        height.value
    ));

    // 3D terrain entity original hpr params
    let hprParamsInDegrees = reactive({
        heading: 0,
        pitch: -10,
        range: 2,
        roll: 0,
    })

    return {
        originalColor, originalNearDistance, originalFarDistance, originalNearAlpha, originalFarAlpha,
        longitude, latitude, height, position, hprParamsInDegrees
    }
})