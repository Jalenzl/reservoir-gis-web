<template>
  <canvas class="webgl" id="webgl" ref="webgl"></canvas>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import { storeToRefs } from "pinia";
import {useGridCoordDataStore} from "@/stores/grid/gridCoordData";
import {AxesHelper, Scene, OrthographicCamera, WebGLRenderer, AmbientLight, Group} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Render} from "@/utils/Three/tile/render"
import {Tile} from "@/utils/Three/tile/tile";
import {post} from "@/utils/request";
import { ElLoading } from 'element-plus'
import fragmentShaderWater from '@/shaders/flowVelocityShader/water/fragment.glsl?raw'
import vertexShaderWater from '@/shaders/flowVelocityShader/water/vertex.glsl?raw'
import fragmentShaderOil from '@/shaders/flowVelocityShader/oil/fragment.glsl?raw'
import vertexShaderOil from '@/shaders/flowVelocityShader/oil/vertex.glsl?raw'

/*------pinia-------*/
const gridCoordDataStore = useGridCoordDataStore();
let { gridCoordData } = storeToRefs(gridCoordDataStore);

/*------DOM-------*/
const webgl = ref<null | HTMLCanvasElement>(null);

/*------子组件接收props-------*/
const velocityProp = defineProps(['velocityProp'])


onMounted(() => {
  /*----------------loading---------------*/
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  /*----------------init three---------------*/
  const drawVelocityFieldMap = async (type: string, layer: number, time: number): Promise<void> => {
    // 获取canvas
    const canvas: null | HTMLCanvasElement = webgl.value;

    // 获取场景
    const scene: Scene = new Scene();

    // 创建相机
    const sizes: {} = {
      width: 800,
      height: 800,
    };
    const aspectRatio: number = sizes.width / sizes.height;
    const camera: OrthographicCamera = new OrthographicCamera(
        -1 * aspectRatio,
        aspectRatio,
        1,
        -1,
        0.1,
        1000
    );

    // 设置相机位置
    camera.position.set(1, 1, 1);
    scene.add(camera);

    // 初始化渲染器
    const renderer: WebGLRenderer = new WebGLRenderer({
      canvas: canvas as HTMLCanvasElement, // 获取DOM 将渲染器对象放置于DOM元素内
    });

    // 设置渲染的尺寸大小
    renderer.setSize(sizes.width, sizes.height);
    // 设置背景色
    renderer.setClearColor(0xbdbdbd, 0.8);

    // light
    const ambientLight: AmbientLight = new AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // 创建轨道控制器
    new OrbitControls(camera, canvas as HTMLCanvasElement);

    // 创建坐标轴
    const axesHelper = new AxesHelper(5);
    scene.add(axesHelper);

    /*-----------------plane geometry-----------*/
    try {
      const tileGroup: Group = new Group();
      const res = await post('https://fastapi.vip.cpolar.cn/api/v1/clacFlowVelocity', {
        "layer": layer,
        "time": time
      })
      const v_water = res.velocity_water
      const v_oil = res.velocity_oil

      for (let i = 0; i < gridCoordData.value.length; i++) {
        const tile = new Tile(gridCoordData.value[i], i + 1)
        if (type === 'water') {
          const mesh = new Render(tile).meshByProp(v_water, 'aWaterVelocity', vertexShaderWater, fragmentShaderWater)
          tileGroup.add(mesh)
        } else if (type === 'oil') {
          const mesh = new Render(tile).meshByProp(v_oil, 'aOilVelocity', vertexShaderOil, fragmentShaderOil)
          tileGroup.add(mesh)
        }
      }

      scene.add(tileGroup);
    } catch (e) {
      console.log(e)
    }

    /*---------------render---------------*/
    const render = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    render();

    loading.close()
  }

  watch(velocityProp, (options) => {
    drawVelocityFieldMap(options.velocityProp.type, options.velocityProp.layer, options.velocityProp.time)
  }, {immediate: true})

})
</script>

<style scoped lang="scss">
.canvas {
  width: 100%;
  height: 100%;
}
</style>