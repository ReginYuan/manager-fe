<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userFrom" :model="user" status-icon :rules="rules">
        <div class="title">紫荆企业人员管理平台</div>
        <el-form-item prop="userName">
          <el-input prefix-icon="el-icon-user" v-model="user.userName" />
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input
            prefix-icon="el-icon-view"
            show-password
            v-model="user.userPwd"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// vue2写法
export default {
  name: "Login",
  data () {
    return {
      user: {
        userName: '',
        userPwd: ''
      },
      // 校验规则
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    // 登录功能
    login () {
      // 请求登录接口
      this.$refs.userFrom.validate((valid) => {
        if (valid) {
          this.$api.login(this.user).then((res) => {
            console.log(res)
            // 保存数据
            this.$store.commit('saveUserInfo', res)
            this.$router.push('/welcome')
          })
        } else {
          return false
        }
      })

    }
  }
}
</script>
<style  lang="scss" >
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