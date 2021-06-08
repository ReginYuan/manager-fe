import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: () => import('../views/Home.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        meta: {
          title: '欢迎页'
        },
        component: () => import('../views/Welcome.vue'),
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页'
    },
    component: () => import('../views/Login.vue'),
  }
]

const router = createRouter({
  // 设置为哈西路由
  history: createWebHashHistory(),
  // 加载路由数据
  routes
})

export default router