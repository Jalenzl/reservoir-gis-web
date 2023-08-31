import {defineStore} from 'pinia'
import {reactive} from "vue";

export const useGridCoordDataStore = defineStore('gridData', () => {
    let gridCoordData = reactive<number[][]>([])
    const tileLength: number = 0.05
    const tileNumInCol1: number = 7
    const tileNumInCol2: number = 24
    const tileNumInCol3: number = 33
    const tileNumInCol4: number = 33
    const tileNumInCol5: number = 33
    const tileNumInCol6: number = 32
    const tileNumInCol7: number = 32
    const tileNumInCol8: number = 32
    const tileNumInCol9: number = 31
    const tileNumInCol10: number = 32
    const tileNumInCol11: number = 32
    const tileNumInCol12: number = 32
    const tileNumInCol13: number = 32
    const tileNumInCol14: number = 33
    const tileNumInCol15: number = 34
    const tileNumInCol16: number = 34
    const tileNumInCol17: number = 35
    const tileNumInCol18: number = 35
    const tileNumInCol19: number = 37
    const tileNumInCol20: number = 36
    const tileNumInCol21: number = 33
    const tileNumInCol22: number = 29
    const tileNumInCol23: number = 26
    const tileNumInCol24: number = 24
    const tileNumInCol25: number = 21
    const tileNumInCol26: number = 16
    const offsetX: number = 0.5
    const offsetY: number = -0.65

    for (let i = 0; i < tileNumInCol1; i++) {
        let arr: number[] = [tileLength * i + offsetX, offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol2; i++) {
        let arr = [tileLength * (-17 + i) + offsetX, tileLength + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol3; i++) {
        let arr = [tileLength * (-26 + i) + offsetX, tileLength * 2 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol4; i++) {
        let arr = [tileLength * (-26 + i) + offsetX, tileLength * 3 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol5; i++) {
        let arr = [tileLength * (-26 + i) + offsetX, tileLength * 4 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol6; i++) {
        let arr = [tileLength * (-26 + i) + offsetX, tileLength * 5 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol7; i++) {
        let arr = [tileLength * (-26 + i) + offsetX, tileLength * 6 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol8; i++) {
        let arr = [tileLength * (-26 + i) + offsetX, tileLength * 7 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol9; i++) {
        let arr = [tileLength * (-26 + i) + offsetX, tileLength * 8 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol10; i++) {
        let arr = [tileLength * (-27 + i) + offsetX, tileLength * 9 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol11; i++) {
        let arr = [tileLength * (-27 + i) + offsetX, tileLength * 10 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol12; i++) {
        let arr = [tileLength * (-28 + i) + offsetX, tileLength * 11 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol13; i++) {
        let arr = [tileLength * (-28 + i) + offsetX, tileLength * 12 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol14; i++) {
        let arr = [tileLength * (-29 + i) + offsetX, tileLength * 13 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol15; i++) {
        let arr = [tileLength * (-30 + i) + offsetX, tileLength * 14 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol16; i++) {
        let arr = [tileLength * (-30 + i) + offsetX, tileLength * 15 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol17; i++) {
        let arr = [tileLength * (-31 + i) + offsetX, tileLength * 16 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol18; i++) {
        let arr = [tileLength * (-31 + i) + offsetX, tileLength * 17 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol19; i++) {
        let arr = [tileLength * (-32 + i) + offsetX, tileLength * 18 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol20; i++) {
        let arr = [tileLength * (-31 + i) + offsetX, tileLength * 19 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol21; i++) {
        let arr = [tileLength * (-28 + i) + offsetX, tileLength * 20 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol22; i++) {
        let arr = [tileLength * (-24 + i) + offsetX, tileLength * 21 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol23; i++) {
        let arr = [tileLength * (-21 + i) + offsetX, tileLength * 22 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol24; i++) {
        let arr = [tileLength * (-19 + i) + offsetX, tileLength * 23 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol25; i++) {
        let arr = [tileLength * (-17 + i) + offsetX, tileLength * 24 + offsetY, 0]
        gridCoordData.push(arr)
    }
    for (let i = 0; i < tileNumInCol26; i++) {
        let arr = [tileLength * (-15 + i) + offsetX, tileLength * 25 + offsetY, 0]
        gridCoordData.push(arr)
    }

    return {
        gridCoordData
    }
})