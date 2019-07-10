/* eslint-disable */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: './src/main.js',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    publicPath: '/dev/',
  }
})