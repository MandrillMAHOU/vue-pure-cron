const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  entry: './src/index.js',
  devtool: 'cheap-module-source-map',
});
