/**
 * 工具函数封装
 */
export default {
  // 时间格式化工具
  fomateDate (date, rule) {

    let fmt = rule || 'yyyy-MM-dd hh:mm:ss';
    // 处理年份格式化
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, date.getFullYear())
    }
    const o = {
      // 'y+': date.getFullYear(),
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }

    for (let k in o) {
      // 动态正则表达式
      if (new RegExp(`(${k})`).test(fmt)) {
        const val = o[k] + '';
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? val : ('00' + val).substr(val.length));
      }
    }
    return fmt;
  }
}