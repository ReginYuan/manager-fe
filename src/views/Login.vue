<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form>
        <div class="title">紫荆企业人员管理平台</div>
        <el-form-item>
          <el-input prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="el-icon-view" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="goHome"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
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
<style  lang="scss" scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title {
      font-size: 30px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>