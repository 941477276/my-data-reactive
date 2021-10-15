const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    port: 8092,
    compress: false, // 不压缩代码
    open: true, // 打开浏览器
    static: {
      directory: path.resolve(__dirname, 'public'), // 静态资源文件夹，会读取这里个文件夹里的 index.html
    },
    client: {
      overlay: true, // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
    },
  }
}
