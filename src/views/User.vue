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
          <el-button @click="handleReset('refForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 用户列表模块 -->
    <div class="base-table">
      <div class="action">
        <el-button @click="handleCrate" type="primary">新增</el-button>
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
            <el-button @click="handleEdit(scope.row)" size="mini"
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
    <!-- 增加用户弹窗 -->
    <el-dialog title="新增用户" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="userForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="userForm.userName"
            placeholder="请输入用户名称"
            :disabled="action == 'edit'"
          />
        </el-form-item>
        <el-form-item label="用户邮箱" prop="userEmail">
          <el-input
            v-model="userForm.userEmail"
            placeholder="请输入用户邮箱"
            :disabled="action == 'edit'"
          >
            <!-- 插槽 -->
            <template #append> qq.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="userForm.job" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="userForm.state">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="系统角色" prop="roleList">
          <el-select
            v-model="userForm.roleList"
            placeholder="请选择用户系统角色"
            multiple
            style="width: 100%"
          >
            <el-option
              v-for="item in roleList"
              :key="item._id"
              :value="item._id"
              :label="item.roleName"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属部门" prop="deptId">
          <!-- 级联选择器 -->
          <el-cascader
            v-model="userForm.deptId"
            placeholder="请选择所属部门"
            :options="deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <!-- 确认取消按钮 插槽 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref, toRaw } from 'vue'
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

    // 弹窗显示对象
    const showModal = ref(false);

    // 新增用户对象
    const userForm = reactive({
      userName: '',
      state: 3
    })
    //初始化用户分页对象
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 24
    })


    //  所有角色列表
    const roleList = ref([])
    // 定义用户操作行为
    const action = ref('create')
    // 部门列表
    const deptList = ref([])

    // 定义表单验证规则
    const rules = reactive({
      userName: [
        {
          required: true,
          message: '请输入用户名称',
          trigger: 'blur'
        }
      ],
      userEmail: [
        {
          required: true,
          message: '请输入用户的邮箱',
          trigger: 'blur'
        }
      ],
      mobile: [
        {
          pattern: /1\d{10}/,
          message: '请输入正确的手机号格式',
          trigger: 'blur'
        }
      ],
      deptId: [
        {
          required: true,
          message: '请选择所属部门',
          trigger: 'blur'
        }
      ]
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
      getUserList();
      getDeptList();
      getRoleList();
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
    const handleReset = (form) => {
      // 通过form动态控制所有表单的ref重置
      ctx.$refs[form].resetFields();
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

    // 新增用户
    const handleCrate = () => {
      // 设置操作为新增
      action.value = 'add';
      showModal.value = true;

    }

    // 部门列表查询
    const getDeptList = async () => {
      let list = await ctx.$api.getDeptList();
      deptList.value = list;
    }

    // 角色列表查询
    const getRoleList = async () => {

      let list = await ctx.$api.getRoleList();
      roleList.value = list;
    }

    // 新增用户弹窗关闭
    const handleClose = () => {
      showModal.value = false;
      // 重置查询列表
      handleReset('dialogForm');
    }

    // 新增用户提交
    const handleSubmit = () => {
      // 校验表单用户数据是否为空
      ctx.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          // 将json格式对象转换成普通对象
          let params = toRaw(userForm);
          // 在邮箱结尾添加后缀
          params.userEmail += "@qq.com";
          // 确定是新增还是修改行为
          params.action = action.value;
          let res = await ctx.$api.userSubmit(params);
          if (res) {
            showModal.value = false;
            ctx.$message.success('用户创建成功');
            // 重置用户新增表单
            handleReset('dialogForm');
            // 查询用户数据
            getUserList();
          }
        }
      })
    }

    // 编辑用户
    const handleEdit = (row) => {
      action.value = "edit";
      showModal.value = true;

      // $nextTick()获取修改后,崭新的DOM
      ctx.$nextTick(() => {
        // 浅拷贝将row中的对应用户数据拷贝进userForm
        Object.assign(userForm, row)
      })

    }

    return {
      user,
      userList,
      pager,
      rules,
      columns,
      userForm,
      showModal,
      action,
      handleCrate,
      checkedUserIds,
      getUserList,
      handleQuery,
      handleReset,
      handleCurrentChange,
      handleDel,
      handlePatchDel,
      handleSelectionChange,
      deptList,
      roleList,
      handleClose,
      handleSubmit,
      handleEdit
    }
  }
}
</script> 
<style lang="scss" scoped>
</style>