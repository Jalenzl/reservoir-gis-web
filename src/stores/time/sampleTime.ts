import {defineStore} from 'pinia';
import {JulianDate} from "cesium";
import {reactive, ref} from "vue";

export const useSampleTime = defineStore('sampleTime', () => {
    // 1、3、4、6、7层样本时间 iso8601格式
    const pressure_t1 = "1989-01-01";
    const pressure_t2 = "1989-03-01";
    const pressure_t3 = "1989-08-01";
    const pressure_t4 = "1990-02-01";
    const pressure_t5 = "1991-01-01";
    const pressure_t6 = "1992-11-01";
    const pressure_t7 = "1995-08-01";
    const pressure_t8 = "1997-12-01";

    let timeArr: string[] = reactive([
        pressure_t1,
        pressure_t2,
        pressure_t3,
        pressure_t4,
        pressure_t5,
        pressure_t6,
        pressure_t7,
        pressure_t8,
    ]);

    // 1、3、4、6、7层样本时间 julianDate格式
    const pressure_t1_j = JulianDate.fromIso8601(pressure_t1);
    const pressure_t2_j = JulianDate.fromIso8601(pressure_t2);
    const pressure_t3_j = JulianDate.fromIso8601(pressure_t3);
    const pressure_t4_j = JulianDate.fromIso8601(pressure_t4);
    const pressure_t5_j = JulianDate.fromIso8601(pressure_t5);
    const pressure_t6_j = JulianDate.fromIso8601(pressure_t6);
    const pressure_t7_j = JulianDate.fromIso8601(pressure_t7);
    const pressure_t8_j = JulianDate.fromIso8601(pressure_t8);

    let timeArr_j: JulianDate[] = reactive([
        pressure_t1_j,
        pressure_t2_j,
        pressure_t3_j,
        pressure_t4_j,
        pressure_t5_j,
        pressure_t6_j,
        pressure_t7_j,
        pressure_t8_j,
    ])

    // 第6层样本时间 iso8601格式
    const pressure_t1_layer6 = "1989-01-01"
    const pressure_t2_layer6 = "1989-02-01"
    const pressure_t3_layer6 = "1989-03-01"
    const pressure_t4_layer6 = "1989-08-01"
    const pressure_t5_layer6 = "1991-01-01"
    const pressure_t6_layer6 = "1991-12-01"
    const pressure_t7_layer6 = "1993-08-01"
    const pressure_t8_layer6 = "1995-08-01"
    const pressure_t9_layer6 = "1997-12-01"

    let timeArr_layer6: string[] = reactive([
        pressure_t1_layer6,
        pressure_t2_layer6,
        pressure_t3_layer6,
        pressure_t4_layer6,
        pressure_t5_layer6,
        pressure_t6_layer6,
        pressure_t7_layer6,
        pressure_t8_layer6,
        pressure_t9_layer6,
    ]);

    // 第6层样本时间 julianDate格式
    const pressure_t1_layer6_j = JulianDate.fromIso8601(pressure_t1_layer6);
    const pressure_t2_layer6_j = JulianDate.fromIso8601(pressure_t2_layer6);
    const pressure_t3_layer6_j = JulianDate.fromIso8601(pressure_t3_layer6);
    const pressure_t4_layer6_j = JulianDate.fromIso8601(pressure_t4_layer6);
    const pressure_t5_layer6_j = JulianDate.fromIso8601(pressure_t5_layer6);
    const pressure_t6_layer6_j = JulianDate.fromIso8601(pressure_t6_layer6);
    const pressure_t7_layer6_j = JulianDate.fromIso8601(pressure_t7_layer6);
    const pressure_t8_layer6_j = JulianDate.fromIso8601(pressure_t8_layer6);
    const pressure_t9_layer6_j = JulianDate.fromIso8601(pressure_t9_layer6);

    let timeArr_layer6_j: JulianDate[] = reactive([
        pressure_t1_layer6_j,
        pressure_t2_layer6_j,
        pressure_t3_layer6_j,
        pressure_t4_layer6_j,
        pressure_t5_layer6_j,
        pressure_t6_layer6_j,
        pressure_t7_layer6_j,
        pressure_t8_layer6_j,
        pressure_t9_layer6_j,
    ])

    return { timeArr, timeArr_j, timeArr_layer6, timeArr_layer6_j }
})