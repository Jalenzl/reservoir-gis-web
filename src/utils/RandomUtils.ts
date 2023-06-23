import {init as initEchart} from "echarts"
import type {EChartsType} from "echarts"

export const deepClone = (obj: any) => {
    const isObject = (args: any) => (typeof args === 'object' || typeof args === 'function') && typeof args !== null
    if (!isObject) throw new Error('Not Reference Types')
    let newObj = Array.isArray(obj) ? [...obj] : {...obj}
    Reflect.ownKeys(newObj).map(key => {
        newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    })
    return newObj
}

export const createSectionChart = (canvas: HTMLCanvasElement, xData: any[], yData: any[]) => {
    const myCharts: EChartsType = initEchart(canvas)
    myCharts.setOption({
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xData,
            name: 'distance/m',
            nameTextStyle: {
                align: 'center',
                verticalAlign: 'bottom',
                padding: [0, 0, -15, 0],
                fontWeight: 800
            },
            nameLocation: 'middle',
        },
        yAxis: {
            type: 'value',
            name: 'pressure/kPa',
            nameTextStyle: {
                padding: [0, 0, 30, 0],
                fontWeight: 800
            },
            nameRotate: 90,
            nameLocation: 'middle',
        },
        series: [
            {
                type: 'line',
                data: yData,
                symbol: 'emptyCircle',
                symbolSize: 2,
                smooth: true,
            },
        ]
    })

    return myCharts
}

export const createTimePropValChart = (canvas: HTMLCanvasElement, data: any[]): EChartsType => {
    const myCharts: EChartsType = initEchart(canvas)
    const option = {
        tittle: {
            text: 'abc',
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            name: 'time',
            nameTextStyle: {
                align: 'center',
                verticalAlign: 'bottom',
                padding: [0, 0, -15, 0],
                fontWeight: 800
            },
            nameLocation: 'middle',
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            name: 'pressure/kPa',
            nameTextStyle: {
                padding: [0, 0, 30, 0],
                fontWeight: 800
            },
            nameRotate: 90,
            nameLocation: 'middle',
        },
        series: [
            {
                name: 'pressure',
                type: 'line',
                showSymbol: false,
                data: data,
                symbol: 'emptyCircle',
                symbolSize: 2,
                smooth: true,
            }
        ]
    }
    myCharts.setOption(option)

    return myCharts
}

export const uniqueArr = (arr: any[][]): any[][] => { // 二维数组去重
    // return Array.from(new Set(arr))
    let obj = {}
    // @ts-ignore
    arr.forEach((item: any) => obj[item] = item)
    return Object.values(obj)
}