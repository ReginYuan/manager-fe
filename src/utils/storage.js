/**
 * Storage 二次封装
 * @author ReginYuan
 */

import config from './../config/index.js'
export default {
  /**
   * 将内容写入对应的存储空间
   * @param {*} key 
   * @param {*} val 
   */
  setItem (key, val) {
    // 调用获取存储空间
    let storage = this.getStorage();
    // 将空间内容存储
    storage[key] = val;
    // 根据全局的localStorage的缓存空间名,写入序列化的storage数据,将 JavaScript 值转换为 JSON 字符串
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  /**
   * 根据key获取对用的存储空间
   * @param {*} key 
   * @returns 
   */
  getItem (key) {
    return this.getStorage()[key]
  },
  /**
   * 获取存储及空间方法
   * @returns 
   */
  getStorage () {
    // 获取localStorage存储空间,数据转换为 JavaScript 对象,如果没有就设置成对象{}
    return JSON.parse(window.localStorage.getItem(config.namespace) || "{}");
  },
  /**
   * 根据key清空localStorage存储空间内容
   * @param {*} key 
   */
  clearStorage (key) {
    let storage = this.getStorage();
    delete storage[key]
  },
  /**
   * 清空所有localStorage存储空间内容
   */
  clearAll () {
    window.localStorage.clear()
  }
}