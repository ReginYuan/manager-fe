<template>
  <div class="login">
    <h1>欢迎来到Login页面</h1>
    <el-button type="default" @click="goHome">返回welcome页</el-button>
  </div>
</template>
<script>
// vue2写法
import Welcome from './Welcome.vue'
export default {
  name: "Login",
  mounted () {
    // 第一种请求方式
    // this.$request({
    //   methods: 'get',
    //   url: '/login',
    //   data: {
    //     data: {
    //       name: 'ReginYuan'
    //     }
    //   }
    // }).then((res) => {
    //   console.log(res)
    // })
    // 第二种请求方式
    this.$request.get('/login', { name: 'Regin' }, { mock: true, loading: true }).then((res) => {
      console.log(res)
    })
  },
  components: {
    Welcome
  },
  data () {
    return {
      msg: 'ReginYuan'
    }
  },
  methods: {
    goHome () {
      this.$router.push('/welcome')
    }
  }
}
</script>