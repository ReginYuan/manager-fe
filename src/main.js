import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import axios from 'axios'
import config from './config/index.js'

// 创建app实例
const app = createApp(App)
// 使用ElementPlus组件库
app.use(ElementPlus)
// 现在获取环境变量的方式
console.log("环境变量=>", import.meta.env)
axios.get(config.mockApi + '/login').then(res => {
  console.log(res)
})
app.use(router).mount('#app')