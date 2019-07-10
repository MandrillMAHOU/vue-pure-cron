/* eslint-disable */
const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoader = require('vue-loader/lib/plugin');

module.exports = {
  context: path.resolve(__dirname, '../'),
  output: {
    // publicPath: '/dist/',
    path: path.resolve(__dirname, '../dist'),
    filename: path.join('js', 'vuePureCron.min.js'),
    library: 'vue-pure-cron',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    new VueLoader(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Vue pure cron',
      filename: 'index.html',
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: path.join('css', '[name].css'),
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [
                path.resolve(__dirname, '../src/styles/mixins.scss'),
              ]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  }
};
