<template>
  <img v-if="imgOptions.isShowImg" :src="`${imgOptions.img_base64}`" width="1300" height="800" alt="无法显示"/>
</template>

<script setup lang="ts">
import {post} from "@/utils/request";
import {computed, onBeforeMount, reactive, ref, watch} from "vue";
import {ElLoading} from "element-plus";

/*------子组件接收props-------*/
const velocityProp = defineProps(['velocityProp'])


let imgOptions = reactive({
  isShowImg: false,
  img_base64: ''
})
watch(velocityProp, async (options) => {
  try {
    /*----------------loading---------------*/
    const loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })

    const res = await post('https://fastapi.vip.cpolar.cn/api/v1/vectorPlotCalc', options.velocityProp)
    imgOptions.isShowImg = res.code === 200
    imgOptions.img_base64 = res.img_base64

    loading.close()
  } catch (e) {
    console.log(e)
  }
}, {immediate: true})
</script>

<style scoped lang="scss">
.img {
  width: 50%;
  height: 50%;
}
</style>