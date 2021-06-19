/**
 * api管理
 */

import request from './../utils/request.js'
export default {

  /**
   * 登录接口
   * @param {Object} params 
   * @return 
   */
  login (params) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params
    })
  },
  /**
* 通知数量接口
* @param {number} params
* @return
*/
  noticeCount () {
    return request({
      url: '/leave/count',
      method: 'get',
      data: {},
      mock: true
    })
  },
  /**
  * 菜单列表接口
  * @param {Object} params
  * @return
  */
  getMenuList () {
    return request({
      url: '/menu/list',
      method: 'get',
      data: {},
      mock: true
    })
  },
  /**
  * 用户管理列表接口
  * @param {Object} params
  * @return
  */
  getUserList (params) {
    return request({
      url: '/users/list',
      method: 'get',
      data: params,
      mock: true
    })
  },

  /**
  * 用户删除接口
  * @param {Object} params
  * @return
  */
  UserDel (params) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params,
      mock: true
    })
  },

  /**
 * 获取部门列表接口
 * @param {Object} params
 * @return
 */
  getDeptList () {
    return request({
      url: '/dept/list',
      method: 'get',
      data: {},
      mock: true
    })
  },
  /**
  * 获取角色列表接口
  * @param {Object} params
  * @return
  */
  getRoleList () {
    return request({
      url: '/roles/allList',
      method: 'get',
      data: {},
      mock: true
    })
  },
  /**
 * 新增用户接口
 * @param {Object} params
 * @return
 */
  userSubmit (params) {
    return request({
      url: '/users/operate',
      method: 'post',
      data: params,
      mock: true
    })
  }
}