<template>
  <div class="dept-manage">
    <!-- 部门查询功能 -->
    <div class="query-form">
      <el-form
        ref="queryForm"
        v-model="queryForm"
        :inline="true"
        :model="queryForm"
      >
        <el-form-item label="部门查询">
          <el-input placeholder="请输入部门名称" v-model="queryForm.deptName" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleOpen">创建</el-button>
      </div>
      <el-table
        :data="deptList"
        row-key="_id"
        :tree-props="{ children: 'children' }"
        stripe
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDel(scope.row._id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 弹窗功能 -->
  <el-dialog :title="title" v-model="showModal">
    <el-form
      ref="dialogForm"
      :model="deptForm"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="上级部门" prop="parentId">
        <!-- 级联表单组件 -->
        <el-cascader
          placeholder="请选择上级部门"
          v-model="deptForm.parentId"
          :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
          :options="deptList"
          :show-all-levels="true"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="部门名称" prop="deptName">
        <el-input placeholder="请输入部门名称" v-model="deptForm.deptName" />
      </el-form-item>
      <el-form-item label="负责人" prop="user">
        <el-select
          placeholder="请输入部门负责人"
          v-model="deptForm.user"
          @change="handleUser"
        >
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.userName"
            :value="`${item.userId}/${item.userName}/${item.userEmail}`"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人邮箱" prop="userEmail">
        <el-input
          placeholder="请输入负责人邮箱"
          v-model="deptForm.userEmail"
          disabled
        />
      </el-form-item>
    </el-form>
    <!-- 插槽 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button size="mini" @click="handleClose"> 取消 </el-button>
        <el-button type="primary" size="mini" @click="handleSubmit">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import utils from "../utils/utils";
export default {
  name: "Dept",
  data() {
    return {
      //部门查询数据
      queryForm: {},
      // 列内容与标题
      columns: [
        {
          label: "部门名称",
          prop: "deptName"
        },
        {
          label: "负责人",
          prop: "userName"
        },
        {
          label: "更新时间",
          prop: "updateTime"
        },
        {
          label: "创建时间",
          prop: "createTime"
        }
      ],
      deptList: [], //部门数据
      pager: {
        pageNum: 1, //页数
        pageSize: 1 //数据总条数
      },
      action: "create", //创建 删除 修改
      showModal: false, //弹窗
      title: "新增部门", //弹窗名称
      deptList: [], //所有部门
      userList: [], //用户
      deptForm: {
        parentId: [null]
      }, //部门弹窗表单数据
      rules: {
        parentId: [
          {
            required: true,
            message: "请输选择上级部门",
            trigger: "blur"
          }
        ],
        deptName: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    // 调用部门列表
    this.getDeptList();
    // 调用用户列表
    this.getAllUserList();
  },
  methods: {
    /**
     * 查询部门列表
     */
    async getDeptList() {
      const list = await this.$api.getDeptList(this.queryForm);
      this.deptList = list;
    },
    /**
     * 查询所有用户列表
     */
    async getAllUserList() {
      this.userList = await this.$api.getAllUserList();
    },
    handleUser(val) {
      // 点击事件获取选项中的数据，并将用户的id 名字 邮箱从数组中结构出来
      const [userId, userName, userEmail] = val.split("/");
      // 将用户信息浅拷贝到部门表单中
      Object.assign(this.deptForm, { userId, userName, userEmail });
    },
    /**
     * 查询功能
     */
    handleQuery() {
      this.getDeptList();
    },
    /**
     * 重置表单
     */
    handleReset(form) {
      // 重置表单
      this.$refs[form].resetFields();
    },
    /**
     * 打开弹窗功能
     */
    handleOpen() {
      this.action = "create";
      this.showModal = true;
    },
    /**
     * 弹窗关闭功能
     */
    handleClose() {
      this.showModal = false;
      this.handleReset("dialogForm");
      this.getDeptList();
    },
    /**
     *编辑部门功能
     */
    handleEdit(row) {
      this.title = "编辑部门";
      this.action = "edit";
      this.showModal = true;
      this.$nextTick(() => {
        Object.assign(this.deptForm, row, {
          user: ` ${row.userId}/${row.userName}/${row.userEmail} `
        });
      });
    },
    /**
     * 删除部门功能
     */
    async handleDel(_id) {
      this.action = "delete";
      let params = { _id, action: this.action };
      await this.$api.deptOperate(params);
      this.$message.success("删除成功");
      this.getDeptList();
    },
    /**
     * 提交部门数据
     */
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let params = { ...this.deptForm, action: this.action };
          // 删除表单中多余的user
          delete params.user;
          await this.$api.deptOperate(params);
          this.$message.success("创建成功");
          this.handleClose();
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
