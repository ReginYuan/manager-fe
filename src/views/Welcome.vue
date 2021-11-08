<template>
  <div class="welcome">
    <div class="content">
      <div class="sub-title">欢迎使用</div>
      <div class="title">紫荆科技人员管理系统</div>
      <div class="desc">
        -紫荆科技人员管理系统,管理本公司人员日常工作以及考勤
      </div>
    </div>
    <div class="img"></div>
  </div>
</template>
<script>
// vue3写法
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Welcome',
  props: ['msg'],
})
</script>
<style  lang="scss" scoped>
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fff;
  .content {
    position: relative;
    bottom: 40px;
    .sub-title {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }
    .title {
      font-size: 40px;
      line-height: 62px;
      color: #409eff;
    }
    .desc {
      text-align: right;
      font-size: 14px;
      color: #999;
    }
  }
  .img {
    margin-left: 105px;
    background-image: url('./../assets/images/welcome.png');
    width: 371px;
    height: 438px;
  }
}
</style>