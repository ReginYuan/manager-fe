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
      data: {}
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
      data: {}
    })
  }
}