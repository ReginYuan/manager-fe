<template>
  <div class="welcome">
    <h1>欢迎来到Welcome页面-{{ msg }}</h1>
    <el-button type="default" @click="goLogin">去登录</el-button>
  </div>
</template>
<script>
// vue3写法
import { useRouter } from 'vue-router'
import { defineComponent, defineProps } from 'vue'
export default defineComponent({
  name: 'Welcome',
  props: ['msg'],
  setup () {
    const router = useRouter()
    const goLogin = () => {
      router.push('/login')
    }
    return {
      goLogin
    }
  }

})
</script>