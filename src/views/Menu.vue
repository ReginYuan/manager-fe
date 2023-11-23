<template>
  <div class="user-manage">
    <!-- 搜索模块 -->
    <div class="query-form">
      <el-form ref="refForm" :inline="true" :model="queryForm">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryForm.menuName" placeholder="请输入菜单名" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="queryForm.menuState">
            <el-option :value="1" label="正常"></el-option>
            <el-option :value="2" label="停用"></el-option>
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
        <el-button @click="handleAdd(1)" type="primary">新增</el-button>
      </div>

      <el-table
        :data="menuList"
        row-key="_id"
        :tree-props="{ children: 'children' }"
      >
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
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button @click="handleAdd(2, scope.row)" size="mini"
              >新增</el-button
            >
            <el-button @click="handleEdit(scope.row)" size="mini"
              >编辑</el-button
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
    </div>

    <!-- 增加用户弹窗 -->
    <el-dialog :title="title" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="menuForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
            v-model="menuForm.parentId"
            :options="menuList"
            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
            clearable
          />
          <span>不选,则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item
          label="菜单图标"
          prop="icon"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.icon" placeholder="请输入图标" />
        </el-form-item>
        <el-form-item
          label="路由地址"
          prop="path"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item
          label="权限标识"
          prop="menuCode"
          v-show="menuForm.menuType == 2"
        >
          <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item
          label="组件路径"
          prop="component"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.component" placeholder="请输入组件路径" />
        </el-form-item>

        <el-form-item
          label="菜单状态"
          prop="menuState"
          v-show="menuForm.menuType == 1"
        >
          <el-radio-group v-model="menuForm.menuState">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
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
  name: "Menu",
  data() {
    return {
      refForm: {},
      // 菜单状态数据
      queryForm: {
        menuState: 1 //菜单状态
      },
      menuList: [], //菜单列表数据
      columns: [
        {
          label: "菜单名称",
          prop: "menuName",
          width: 180
        },
        {
          label: "图标",
          prop: "icon"
        },
        {
          label: "菜单类型",
          prop: "menuType",
          formatter(row, column, value) {
            return {
              1: "菜单",
              2: "按钮"
            }[value];
          }
        },
        {
          label: "权限标识",
          prop: "menuCode"
        },
        {
          label: "路由地址",
          prop: "path"
        },
        {
          label: "组件路径",
          prop: "component"
        },
        {
          label: "菜单状态",
          prop: "menuState",
          width: 90,
          formatter(row, column, value) {
            return {
              1: "正常",
              2: "停用"
            }[value];
          }
        },
        {
          label: "创建时间",
          prop: "createTime",
          width: 150,
          formatter(row, column, value) {
            return utils.fomateDate(new Date(value));
          }
        }
      ],
      showModal: false,
      // 菜单数据
      menuForm: {
        parentId: [null],
        menuType: 1,
        menuState: 1
      },
      action: "",
      title: "新增菜单", //弹窗名称
      rules: {
        menuName: [
          {
            required: true,
            message: "请输入菜单名称",
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
    // 在计算属性中添加获取菜单的方法
    this.getMenuList();
  },
  methods: {
    /**
     * 菜单列表初始化
     * */
    async getMenuList() {
      try {
        const list = await this.$api.getMenuList(this.queryForm);
        // 将查询的菜单类表数据放进菜单列表集合中
        this.menuList = list;
      } catch (e) {
        throw new Error(e);
      }
    },
    /**
     * 查询
     * */
    handleQuery() {
      // 在计算属性中添加获取菜单的方法
      this.getMenuList();
    },
    /**
     * 重置表单
     */
    handleReset(form) {
      // 重置表单
      this.$refs[form].resetFields();
    },
    /**
     *  新增菜单
     * */
    handleAdd(type, row) {
      this.showModal = true;
      // 新增设置
      this.action = "add";
      if (type == 2) {
        this.menuForm.parentId = [...row.parentId, row._id].filter(
          (item) => item
        );
      } else if (type == 1) {
        this.$nextTick(() => {
          this.menuForm = {};
        });
      }
    },
    /**
     * 编辑菜单
     */
    handleEdit(row) {
      this.showModal = true;
      this.title="编辑菜单";
      this.action = "edit";
      // dom更新之后,再将数据更新到表单上
      this.$nextTick(() => {
        // 浅拷贝
        Object.assign(this.menuForm, row);
      });
    },
    async handleDel(_id) {
      await this.$api.menuSubmit({ _id, action: "delete" });
      this.$message.success("删除成功");
      // 加载菜单列表
      this.getMenuList();
    },
    /**
     * 提交菜单数据
     * */
    handleSubmit() {
      //获取表单数据验证数据
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          // 在全局变量中获取 新增菜单状态
          let { action, menuForm } = this;
          // 结构新增菜单的数据和操作状态
          let params = { ...menuForm, action };
          // 提交新增或修改数据提交
          await this.$api.menuSubmit(params);
          this.showModal = false;
          this.$message.success("操作成功");
          // 重置提交表单
          this.handleReset("dialogForm");
          // 加载菜单列表
          this.getMenuList();
        }
      });
    },
    /**
     * 关闭弹窗功能
     */
    handleClose() {
      this.showModal = false;
      this.handleReset("dialogForm");
    }
  }
};
</script>
<style lang="scss" scoped></style>
