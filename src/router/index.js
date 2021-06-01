import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Login from '../views/Login.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        meta: {
          title: '欢迎页'
        },
        component: Welcome,
      },
      {
        path: '/login',
        name: 'login',
        meta: {
          title: '登录页'
        },
        component: Login,
      }
    ]
  }
]

const router = createRouter({
  // 设置为哈西路由
  history: createWebHashHistory(),
  // 加载路由数据
  routes
})

export default router