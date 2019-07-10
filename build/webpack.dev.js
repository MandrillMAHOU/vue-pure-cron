/* eslint-disable */
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: './demo/index.js',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    publicPath: '/dev/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vue pure cron',
      filename: 'index.html',
      template: './demo/index.html'
    })
  ]
})