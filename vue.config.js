// 1. npm run build 打包代码
// 2. 把代码(dist)文件夹给后端
// 3. 后端把前端代码放入后端工程
// 4. 后端重启后端服务
// * 容易出问题的就是下面的配置

// webpack配置项
module.exports = {
  publicPath: "./" //publicPath一定要等于根路径的位置
};
