/**
 * api管理
 */

import request from './../utils/request.js'
export default {

  /**
   * 登录接口
   * @param {*} params 
   * @returns 
   */
  login (params) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params,
      mock: true
    })
  }
}