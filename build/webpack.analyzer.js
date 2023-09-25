/*
 * @Author: wangguixing
 * @Date: 2023-07-24 11:47:04
 * @LastEditors: wangguixing
 * @LastEditTime: 2023-09-05 10:21:47
 * @FilePath: \build\webpack.analyzer.js
 */
const { merge } = require('webpack-merge');
const webpackProConfig = require('./webpack.prod.js');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(webpackProConfig, {
  plugins: [new BundleAnalyzerPlugin()],
});
