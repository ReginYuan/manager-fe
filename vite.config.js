import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  // vite可别名配置,解决./../问题,类似于vue里面的@
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: 'localhost',//配置主机名
    port: 8080,//配置端口号
    proxy: {//代理
      "/api": {
        target: "http://localhost:3000"
      }
    }
  },
  plugins: [vue()]
})
