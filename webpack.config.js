var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackDevServer = require('webpack-dev-server');
module.exports = {
  entry:  __dirname + "/test/test.js",
  output: {
    path: __dirname + "/dist",
    filename: "index.js"
  },
  module: {
    loaders: [
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: __dirname + "/dist/index.html",
      inject:true,
      template:__dirname +"/test/test.html"
    })
  ],
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
}
/*
  服务器端，文件一般都在本地，是同步加载文件的，但是浏览器端要求异步加载，所以node中的commonJs就不再适用（
  每个node模块都有一个package.json文件）
  于是异步加载 AMD (define方法定义模块,经典的是requireJS), CMD应运而生  怎么就是异步加载了呢？
  UMD：兼容commonJS and AMD
*/