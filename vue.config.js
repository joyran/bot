module.exports = {
  devServer: {
    port: 8027,
    disableHostCheck: true // 解决127.0.0.1指向其他域名时出现"Invalid Host header"问题
  },
  productionSourceMap: false
}
