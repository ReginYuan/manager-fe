/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
  dev: { //开发环境
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/b6c70fa8747a78b3dfd8acdde935d3f3/api'
  },
  test: { //测试环境
    baseApi: '//tets.futurefe.com/api',
    mockApi: 'https://www.fastmock.site/mock/b6c70fa8747a78b3dfd8acdde935d3f3/api'
  },
  prod: { //生产环境
    baseApi: '//futurefe.com/api',
    mockApi: 'https://www.fastmock.site/mock/b6c70fa8747a78b3dfd8acdde935d3f3/api'
  }
}
export default {
  env,//开发环境
  mock: true, //是否启用mock
  ...EnvConfig[env] //解构出对应的开发环境
}