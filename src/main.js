import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import request from './utils/request.js'
import storage from './utils/storage.js'
import api from './api/index.js'
import store from './store/index.js'
// 创建app实例
const app = createApp(App)
// 使用ElementPlus组件库
app.use(ElementPlus, { szie: 'small' })
// 现在获取环境变量的方式
console.log("环境变量=>", import.meta.env)
// 全局挂载request
app.config.globalProperties.$request = request;
//全局挂载api
app.config.globalProperties.$api = api;
// 全局挂载storage
app.config.globalProperties.$storage = storage;
app.use(router).use(store).mount('#app')