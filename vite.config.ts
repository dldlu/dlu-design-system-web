import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({
      // options
    }),
  ],
  server: {
    proxy: {
        '/api': {
            target: 'http://localhost:8080',
            // target: 'http://1.13.172.65:7001',
            changeOrigin: true,
        },
    },
},
resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
},
})
