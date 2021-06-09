/**
 * Mutations 业务层数据提交
 *
 */
import storage from './../utils/storage.js'


export default {
  // 保存数据信息
  saveUserInfo (stata, userInfo) {
    stata.userInfo = userInfo;
    storage.setItem('userInfo', userInfo)
  }
}