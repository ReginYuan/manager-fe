<template>
  <div class="home">
    <div class="basic-layout">
      <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
        <!-- 系统logo -->
        <div class="logo">
          <img src="./../assets/logo1.png" alt="" />
          <span>Manager</span>
        </div>
        <!-- 导航菜单 -->
        <el-menu
          :default-active="activeMenu"
          background-color="#001529"
          text-color="#fff"
          router
          :collapse="isCollapse"
          class="nav-menu"
        >
          <TreeMenu :userMenu="menuList" />
        </el-menu>
      </div>
      <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
        <div class="nav-top">
          <div class="nav-left">
            <!-- 左侧菜单栏隐藏按钮 -->
            <div class="menu-fold" @click="toggle">
              <i class="el-icon-s-fold"></i>
            </div>
            <!-- 面包屑 -->
            <div class="bread">
              <BreadCrumb />
            </div>
          </div>
          <div class="user-info">
            <!-- 通知 -->
            <el-badge
              :is-dot="noticeCount > 0 ? true : false"
              class="notice"
              type="danger"
            >
              <i class="el-icon-bell"></i>
            </el-badge>
            <!-- 退出和用户信息 -->
            <el-dropdown @command="handleLogout" :hide-on-click="false">
              <span class="user-link">
                {{ userInfo.userName }}
                <i class="el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="email">
                    邮箱：{{ userInfo.userEmail }}
                  </el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="wrapper">
          <div class="main-page">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TreeMenu from './../components/TreeMenu.vue'
import BreadCrumb from './../components/BreadCrumb.vue'
export default {
  name: "Home",
  data () {
    return {
      isCollapse: false,//控制侧边菜单显示
      userInfo: this.$store.state.userInfo,//获取登录用户信息
      noticeCount: 0,//通知数量
      menuList: [], //菜单列表
      activeMenu: location.hash.slice(1) //默认选中菜单
    }
  },
  components: {
    TreeMenu,
    BreadCrumb
  },
  mounted () {
    this.getNoticeCount();
    this.getMenuList();
  },
  methods: {
    // 退出功能
    handleLogout (key) {
      if (key == 'email') return;
      // 设置localStorage数据为空
      this.$store.commit('saveUserInfo', '');
      // 清空当前数据
      this.userInfo = null;
      this.$router.push('/login')
    },
    // 控制左侧菜单隐藏
    toggle () {
      this.isCollapse = !this.isCollapse
    },
    // 获取通知信息总数
    async getNoticeCount () {
      try {
        // 请求消息api,获取通知数量
        const count = await this.$api.noticeCount();
        this.noticeCount = count;
      } catch (error) {
        console.error(error);
      }
    },
    // 获取菜单列表
    async getMenuList () {
      try {
        // 请求消息api,获取菜单列表
        const list = await this.$api.getMenuList();
        this.menuList = list;
      } catch (error) {
        console.error(error);
      }
    },
  }
}
</script>

<style  lang="scss" scoped>
.basic-layout {
  position: relative;
  /**左侧导航样式**/
  .nav-side {
    position: fixed;
    width: 200px;
    //100vh 自动计算高度
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;

    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      height: calc(100vh-50px);
      border-right: none;
    }
    // 合并左侧菜单
    &.fold {
      width: 64px;
    }
    // 展开左侧菜单
    &.unfold {
      width: 200px;
    }
  }
  /** 右侧页面内容样式**/
  .content-right {
    margin-left: 200px;
    // 合并左侧菜单
    &.fold {
      margin-left: 64px;
    }
    // 展开左侧菜单
    &.unfold {
      margin-left: 200px;
    }
    /** 右侧导航内容样式**/
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-right: 15px;
          font-size: 18px;
        }
      }
      .user-info {
        .notice {
          line-height: 30px;
          margin-right: 15px;
        }
        .user-link {
          cursor: pointer;
          color: #409fff;
        }
      }
    }
    /**内容样式**/
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      //100vh 自动计算高度
      height: calc(100vh - 50px);
      .main-page {
        background: #ffffff;
        height: 100%;
      }
    }
  }
}
</style>