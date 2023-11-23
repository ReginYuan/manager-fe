/**
 * api管理
 */

import request from "./../utils/request.js";
export default {
  /**
   * 登录接口
   * @param {Object} params
   * @return
   */
  login(params) {
    return request({
      url: "/users/login",
      method: "post",
      data: params,
      mock: false
    });
  },
  /**
   * 通知数量接口
   * @param {number} params
   * @return
   */
  noticeCount() {
    return request({
      url: "/leave/count",
      method: "get",
      data: {},
      mock: true
    });
  },

  /**
   * 用户管理列表接口
   * @param {Object} params
   * @return
   */
  getUserList(params) {
    return request({
      url: "/users/list",
      method: "get",
      data: params,
      mock: false
    });
  },
  /**
   *用户获取菜单权限接口
   */
  getPermissionList() {
    return request({
      url: "/users/getPermissionList",
      method: "get",
      data: {},
      mock: false
    });
  },

  /**
   * 所有用户(负责人)列表接口
   * @param {Object} params
   * @return
   */
  getAllUserList() {
    return request({
      url: "/users/all/list",
      method: "get",
      data: {},
      mock: false
    });
  },

  /**
   * 新增用户接口
   * @param {Object} params
   * @return
   */
  userSubmit(params) {
    return request({
      url: "/users/operate",
      method: "post",
      data: params,
      mock: false
    });
  },

  /**
   * 用户删除接口
   * @param {Object} params
   * @return
   */
  UserDel(params) {
    return request({
      url: "/users/delete",
      method: "post",
      data: params,
      mock: false
    });
  },

  /**
   * 获取部门列表接口
   * @param {Object} params
   * @return
   */
  getDeptList(params) {
    return request({
      url: "/dept/list",
      method: "get",
      data: params,
      mock: false
    });
  },

  /**
   * 部门创建、编辑、删除接口
   * @param {Object} params
   * @return
   */
  deptOperate(params) {
    return request({
      url: "/dept/operate",
      method: "post",
      data: params,
      mock: false
    });
  },

  /**
   * 菜单列表接口
   * @param {Object} params
   * @return
   */
  getMenuList(params) {
    return request({
      url: "/menu/list",
      method: "get",
      data: params,
      mock: false
    });
  },

  /**
   * 菜单增删改查接口
   * @param {Object} params
   * @return
   */
  menuSubmit(params) {
    return request({
      url: "/menu/operate",
      method: "post",
      data: params,
      mock: false
    });
  },

  /**
   * 获取角色列表接口
   * @param {Object} params
   * @return
   */
  getRoleAllList() {
    return request({
      url: "/roles/allList",
      method: "get",
      data: {},
      mock: false
    });
  },

  /**
   * 获取角色列表接口
   * @param {Object} params
   * @return
   */
  getRoleList(params) {
    return request({
      url: "/roles/list",
      method: "get",
      data: params,
      mock: false
    });
  },
  /**
   * 角色增删改接口
   * @param {Object} params
   * @return
   */
  roleOperate(params) {
    return request({
      url: "/roles/operate",
      method: "post",
      data: params,
      mock: false
    });
  },
  /**
   * 修改权限列表接口
   * @param {Object} params
   * @return
   */
  updatePermission(params) {
    return request({
      url: "/roles/update/permission",
      method: "post",
      data: params,
      mock: true
    });
  }
};
