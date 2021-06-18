
import { getCurrentInstance, reactive, ref } from 'vue'

export const UserListEffect = () => {


  // 获取composition API上下文对象
  const { ctx } = getCurrentInstance()

  // 初始化用表单对象
  const user = reactive({
    state: 0
  });
  // 初始化用户列表数据
  const userList = ref([]);

  //初始化用户分页对象
  const pager = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 24
  })


  // 选择中用户列表的对象
  const checkedUserIds = ref([]);

  // 弹窗显示对象
  const showModal = ref(false);

  // 新增用户对象
  const userForm = reactive({
    userName: '',
    state: 3
  })

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

  //表格多选
  const handleSelectionChange = (list) => {
    let arr = [];
    list.map(item => {
      arr.push(item.userId)
    })
    checkedUserIds.value = arr;
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

  // 新增用户
  const handleCrate = () => {
    showModal.value = true
  }


  return {
    user, userList, pager, checkedUserIds, showModal, userForm, rules, columns, getUserList, handleQuery, handleReset, handleCurrentChange, handleSelectionChange, handleDel, handlePatchDel, handleCrate
  }
}
