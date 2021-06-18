<template>
  <div class="user-manage">
    <!-- 搜索模块 -->
    <div class="query-form">
      <el-form ref="refForm" :inline="true" :model="user">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="user.state">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 用户列表模块 -->
    <div class="base-table">
      <div class="action">
        <el-button type="primary">新增</el-button>
        <el-button @click="handlePatchDel" type="danger">批量删除</el-button>
      </div>
      <el-table :data="userList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" @click="handleDel(scope.row)" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
export default {
  name: 'User',
  setup () {

    // 获取composition API上下文对象
    const { ctx } = getCurrentInstance()

    // 初始化用表单对象
    const user = reactive({
      state: 0
    });
    // 初始化用户列表数据
    const userList = ref([]);
    // 选择中用户列表的对象
    const checkedUserIds = ref([]);
    //初始化用户分页对象
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 24
    })
    // 定义动态表格-格式
    const columns = reactive([
      {
        label: '用户ID',
        prop: 'userId',
      },
      {
        label: '用户名',
        prop: 'userName',
      },
      {
        label: '用户邮箱',
        prop: 'userEmail',
      },
      {
        label: '用户角色',
        prop: 'role',
        formatter (row, column, value) {
          return {
            0: '管理员',
            1: '普通用户'
          }[value]
        }
      },
      {
        label: '用户状态',
        prop: 'state',
        formatter (row, column, value) {
          return {
            1: '在职',
            2: '离职',
            3: '试用期'
          }[value]
        }
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

    // 初始化接口调用
    onMounted(() => {
      getUserList()
    });
    // 获取用户列表
    const getUserList = async () => {
      // 解构用户数据和分页数据
      let params = { ...user, ...pager };

      try {
        // 通过上下文对象获取vue3中的请求对象,并将数据传输到接口
        const { list, page } = await ctx.$api.getUserList(params)
        userList.value = list;
        pager.total = page.total;

      } catch (error) {

      }

    }
    //  查询事件,获取用户列表
    const handleQuery = () => {
      getUserList();
    }
    //重置查询列表
    const handleReset = () => {
      ctx.$refs.refForm.resetFields();
    }

    // 分页事件处理 current页数
    const handleCurrentChange = (current) => {
      pager.pageNum = current;
      getUserList();
    }

    // 用户单个删除
    const handleDel = async (row) => {
      await ctx.$api.UserDel({
        userIds: [row.userId] //可单个删除,也可批量删除
      })
      ctx.$message.success('删除成功');
      getUserList();
    }

    // 批量删除
    const handlePatchDel = async () => {
      if (checkedUserIds.value.length == 0) {
        ctx.$message.error('请选择要删除的用户')
        return
      }
      const res = await ctx.$api.UserDel({
        userIds: checkedUserIds.value //可单个删除,也可批量删除
      })
      if (res.nModified > 0) {
        ctx.$message.success('删除成功');
        getUserList();
      } else {
        ctx.$message.error('删除失败');
      }

    }
    //表格多选
    const handleSelectionChange = (list) => {
      let arr = [];
      list.map(item => {
        arr.push(item.userId)
      })
      checkedUserIds.value = arr;
    }

    return {
      user, userList, pager, columns, checkedUserIds, getUserList, handleQuery, handleReset, handleCurrentChange, handleDel, handlePatchDel, handleSelectionChange
    }
  }
}
</script> 
<style lang="scss" scoped>
</style>