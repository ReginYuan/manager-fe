<template>
  <template v-for="menu in userMenu">
    <!--el-submenu父菜单  -->
    <el-submenu
      v-if="
        menu.children &&
        menu.children.length > 0 &&
        menu.children[0].menuType == 1
      "
      :key="menu._id"
      :index="menu.path"
    >
      <template #title>
        <i :class="menu.icon"></i>
        <span>{{ menu.menuName }}</span>
      </template>
      <!-- 子菜单 -->
      <tree-menu :userMenu="menu.children" />
    </el-submenu>
    <!-- 详情按钮 -->
    <el-menu-item
      v-else-if="menu.menuType == 1"
      :index="menu.path"
      :key="menu._id"
    >
      {{ menu.menuName }}
    </el-menu-item>
  </template>
</template>
<script>
export default {
  name: 'TreeMenu',
  props: {
    userMenu: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>