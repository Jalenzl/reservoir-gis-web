import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cesium(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 6060,
    https: false,
  },
  define: {
    "process.env": {
      VITE_GEOSERVER_API:
        "https://geoserver.vip.cpolar.cn/geoserver"
    }
  },
  assetsInclude: ['**/*.glb', "**/*.gltf", "**/*.obj"],
})
