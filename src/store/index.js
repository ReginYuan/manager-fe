/**
 * Vuex 状态管理
 */

import { createStore } from 'vuex'
import mutations from './mutations.js'
import storage from './../utils/storage.js'

const state = {
  userInfo: "" || storage.getItem("userInfo") //获取用户信息
}
export default createStore({
  state,
  mutations
})