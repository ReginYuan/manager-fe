<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
      <router-link to="/welcome" v-if="index == 0">
        {{ item.meta.title }}
      </router-link>
      <router-link :to="item.path" v-else>
        {{ item.meta.title }}
      </router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  computed: {
    // 获取路由中的matched数据
    breadList () {
      return this.$route.matched;
    }
  },
  mounted () {
    // 路由详情
    console.log('路由:routes=>', this.$route)
  }
}
</script>