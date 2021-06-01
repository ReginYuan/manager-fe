<template>
  <div class="login">
    <h1>欢迎来到Login页面</h1>
    <Welcome :msg="msg" />
    <el-button type="default" @click="goHome">返回welcome页</el-button>
  </div>
</template>
<script>
// vue2写法
import Welcome from './Welcome.vue'
export default {
  name: "Login",
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