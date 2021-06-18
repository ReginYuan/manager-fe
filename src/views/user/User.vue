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
    <!-- 增加用户弹窗 -->
    <el-dialog title="新增用户" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="userForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="用户邮箱" prop="userEmail">
          <el-input v-model="userForm.userEmail" placeholder="请输入用户邮箱">
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
          >
          </el-select>
        </el-form-item>

        <el-form-item label="所属部门" prop="deptId">
          <!-- 级联选择器 -->
          <el-cascader
            v-model="userForm.deptId"
            placeholder="请选择所属部门"
            :options="[]"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <!-- 确认取消按钮 插槽 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { UserListEffect } from './UserListEffect.js'
export default {
  name: 'User',
  setup () {


    // 初始化接口调用
    onMounted(() => {
      getUserList()
    });


    const { user, userList, pager, rules, columns, checkedUserIds, showModal, userForm, getUserList, handleQuery, handleReset, handleCurrentChange, handleSelectionChange, handleDel, handlePatchDel, handleCrate } = UserListEffect();
    return {
      user, userList, pager, rules, columns, userForm, showModal, handleCrate, checkedUserIds, getUserList, handleQuery, handleReset, handleCurrentChange, handleDel, handlePatchDel, handleSelectionChange
    }
  }
}
</script> 
<style lang="scss" scoped>
</style>