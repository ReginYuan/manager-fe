<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form inline="true" :model="user">
        <el-form-item>
          <el-input v-model="user.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="user.state">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">新增</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
      <el-table :data="userList">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
export default {
  name: 'User',
  setup () {
    // 响应式对象
    const user = reactive({});
    const userList = ref([
      {
        "state": 1,
        "role": "0",
        "rolelist": [
          "60180b07bleaed6c45fbebdb",
          "60150cb764de99631b2c3cd3",
          "60180b59bleaed6c45fbebde"
        ],
        "deptId": [
          "6016705999027b7d28520a61",
          "60167345c6a4417E2827506f"
        ],
        "userId": 1000002,
        "userName": "admin",
        "userEmail": "admin@imooc.com",
        "createTime": "2021-01-17T13:32:06.3812",
        "lastLoginTime": "2021-01-17T13:32:06.3812",
        "v": 0,
        "job": "前端架构师",
        "mobile": "17611020000"
      }

    ]);
    const columns = reactive([
      {
        label: '用户ID',
        prop: 'userId'
      },
      {
        label: '用户名',
        prop: 'userName'
      },
      {
        label: '用户邮箱',
        prop: 'userEmail'
      },
      {
        label: '用户角色',
        prop: 'role'
      },
      {
        label: '用户状态',
        prop: 'state'
      },
      {
        label: '注册时间',
        prop: 'createTime'
      },
      {
        label: '最后登录时间',
        prop: 'lastLoginTime'
      }
    ]);

    // 渲染
    onMounted(() => {
      console.log('init....')
    });

    return {
      user, userList, columns
    }
  }
}
</script>
<style lang="scss" scoped>
</style>