<template>
  <div class="role-manage">
    <!-- 搜索模块 -->
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 角色列表模块 -->
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleRoleCreate">创建</el-button>
      </div>

      <el-table :data="roleList">
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="260">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleOpenPermission(scope.row)"
              >设置权限</el-button
            >
            <el-button
              type="danger"
              @click="handleDel(scope.row._id)"
              size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 权限弹窗 -->
    <el-dialog title="权限设置" v-model="showPermission">
      <el-form label-width="100px">
        <el-form-item label="角色名称">
          {{ curRoleName }}
        </el-form-item>
        <el-form-item label="选择权限">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            default-expand-all
            node-key="_id"
            :props="{ label: 'menuName' }"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <!-- 确认取消按钮 插槽 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handlePermissionClose">取 消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 角色弹窗  -->
    <el-dialog :title="roleTitle" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="roleForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="2"
            v-model="roleForm.remark"
            placeholder="请填写备注"
          />
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
import utils from "../utils/utils";
export default {
  name: "Role",
  data() {
    return {
      // 角色查询数据
      queryForm: {
        roleName: "" //菜单状态
      },
      roleList: [], //角色列表数据
      // 分页数据
      pager: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      // 新增角色表单数据
      roleForm: {},
      // 具体操作
      action: "",
      roleTitle: "创建角色", //角色弹窗标题
      columns: [
        {
          label: "角色名称",
          prop: "roleName",
          width: 180
        },
        {
          label: "备注",
          prop: "remark"
        },
        {
          label: "权限列表",
          width: 200,
          prop: "permissionList",
          formatter: (row, column, value) => {
            let names = [];
            let list = value.halfCheckedKeys || [];
            list.map((key) => {
              let name = this.actionMap[key];
              if (key && name) names.push(name);
              console.log(name);
            });
            return names.join(",");
          }
        },
        {
          label: "创建时间",
          prop: "createTime",
          width: 150,
          formatter(row, column, value) {
            return utils.fomateDate(new Date(value));
          }
        },
        {
          label: "更新时间",
          prop: "updateTime",
          width: 150,
          formatter(row, column, value) {
            return utils.fomateDate(new Date(value));
          }
        }
      ],
      showModal: false, //角色弹窗开关
      showPermission: false, //权限弹窗开关
      curId: "", //权限Id
      curRoleName: "", //角色名称
      action: "",
      menuList: [], //菜单列表
      actionMap: {}, //菜单映射表
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入权限名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 10,
            message: "长度在2-8个字符",
            trigger: ["blur"]
          }
        ]
      }
    };
  },
  mounted() {
    // 在计算属性中添加获取角色列表的方法
    this.getRoleList();
    this.getMenuList();
  },
  methods: {
    /**
     *角色列表初始化
     * */
    async getRoleList() {
      try {
        const { list, page } = await this.$api.getRoleList({
          ...this.queryForm,
          ...this.pager
        });
        // 将查询的菜单类表数据放进菜单列表集合中
        this.roleList = list;
        this.pager.total = page.total;
      } catch (e) {
        throw new Error(e);
      }
    },
    /**
     *菜单列表列表
     * */
    async getMenuList() {
      try {
        const list = await this.$api.getMenuList();
        // 将查询的菜单类表数据放进菜单列表集合中
        this.menuList = list;
        // 字典映射，解决选中权限存储问题，将key值转换成字典
        this.getActionMap(list);
      } catch (e) {
        throw new Error(e);
      }
    },
    /**
     * 查询
     * */
    handleQuery() {
      // 在计算属性中添加获取菜单的方法
      this.getRoleList();
    },
    /**
     * 重置表单
     */
    handleReset(form) {
      // 重置表单
      this.$refs[form].resetFields();
    },
    async handleDel(_id) {
      await this.$api.roleOperate({ _id, action: "delete" });
      this.$message.success("删除成功");
      // 加载菜单列表
      this.getRoleList();
    },
    // 创建角色
    handleRoleCreate() {
      this.action = "create";
      this.roleTitle = "创建角色";
      this.showModal = true;
    },
    // 角色编辑
    handleEdit(row) {
      this.action = "edit";
      this.roleTitle = "编辑角色";
      this.showModal = true;
      // Dom渲染完以后再赋值
      this.$nextTick(() => {
        this.roleForm = {
          _id: row._id,
          roleName: row.roleName,
          remark: row.remark
        };
      });
    },
    // 创建角色弹窗关闭
    handleClose() {
      this.showModal = false;
      this.handleReset("dialogForm");
      this.getRoleList();
    },
    // 提交角色数据
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { roleForm, action } = this;
          let params = { ...roleForm, action };
          let res = await this.$api.roleOperate(params);
          if (res) {
            this.showModal = false;
            if (params.action === "create") {
              this.$message.success("创建成功");
            } else {
              this.$message.success("编辑成功");
            }
            this.handleReset("dialogForm");
            this.getRoleList();
          }
        }
      });
    },

    // 关闭权限弹窗
    handlePermissionClose() {
      this.showPermission = false;
    },

    // 开启权限弹窗
    handleOpenPermission(row) {
      this.curRoleId = row._id;
      this.curRoleName = row.roleName;
      this.showPermission = true;
      // 将菜单功能的checkedKeys获取
      let { checkedKeys } = row.permissionList;
      setTimeout(() => {
        // 获取权限数据，并设置选中节点
        this.$refs.tree.setCheckedKeys(checkedKeys);
      });
    },

    // 提交权限修改功能
    async handlePermissionSubmit() {
      // 获取修改权限节点
      let nodes = this.$refs.tree.getCheckedNodes();
      // 获取最高级权限
      let halfKeys = this.$refs.tree.getHalfCheckedKeys();
      let checkedKeys = []; //存放选中的按钮
      let parentKeys = []; //存放选中的菜单
      // 循环输出菜单和按钮并分开存储
      nodes.map((node) => {
        if (!node.children) {
          checkedKeys.push(node._id);
        } else {
          parentKeys.push(node._id);
        }
      });
      let params = {
        _id: this.curRoleId, //选中权限Id
        permissionList: {
          checkedKeys, //选中按钮
          halfCheckedKeys: parentKeys.concat(halfKeys) //将菜单与最高权限菜单合并
        }
      };
      await this.$api.updatePermission(params);
      this.showPermission = false;
      this.$message.success("设置成功");
      this.getRoleList();
    },
    /**
     * 权限列表递归处理
     */
    getActionMap(list) {
      let actionMap = {};
      const deep = (arr) => {
        while (arr.length) {
          // 取数组列表中的最后一个元素
          let item = arr.pop();
          console.log(item);
          // action还有说明不是最后一级
          if (item.children && item.action) {
            actionMap[item._id] = item.menuName;
          }
          // action没有说明是最后一级,就再次遍历菜单
          if (item.children && !item.action) {
            deep(item.children);
          }
        }
      };
      deep(JSON.parse(JSON.stringify(list)));
      this.actionMap = actionMap;
    },

    // 分页
    handleCurrentChange(current) {
      this.pager.pageNum = current;
      this.getRoleList();
    }
  }
};
</script>
<style lang="scss" scoped></style>
