<template>
  <div class="home">
    <div class="basic-layout">
      <div class="nav-side"></div>
      <div class="content-right">
        <div class="nav-top">
          <div class="bread">面包屑</div>
          <div class="user-info">用户</div>
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
export default {
  name: "Home"
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
  }
  /** 右侧页面内容样式**/
  .content-right {
    margin-left: 200px;
    /** 右侧导航内容样式**/
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
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