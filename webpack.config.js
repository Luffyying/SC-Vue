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