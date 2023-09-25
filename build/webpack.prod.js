/*
 * @Author: wangguixing
 * @Date: 2023-07-24 11:47:04
 * @LastEditors: wangguixing
 * @LastEditTime: 2023-09-25 15:59:47
 * @FilePath: \build\webpack.prod.js
 */
const { merge } = require('webpack-merge');
const { readEnv } = require('./utils');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { DefinePlugin } = require('webpack');
const webpackCommonConfig = require('./webpack.common.js');
const { resolve } = require('./utils');
let config = {};
if (process && process.env && process.env.npm_config_zcst_lowcode_api_host) {
  const oldConfig = readEnv('./.env.production');
  config = { ...oldConfig, VUE_APP_SERVER_URL: JSON.stringify(process.env.npm_config_zcst_lowcode_api_host) };
} else if (process && process.env && process.env.BUILD_ENV) {
  config = readEnv(`./.env.${process.env.BUILD_ENV}`);
} else {
  config = readEnv('./.env.production');
}
//读取环境变量
module.exports = merge(webpackCommonConfig, {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: resolve('src'),
        exclude: /(node_modules|bower_components)/, // 排除文件
        use: [
          {
            loader: 'thread-loader',
            options: { workers: 3 },
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 自动babel缓存
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'thread-loader',
            options: { workers: 2 },
          },
          'vue-loader',
        ],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      BASE_URL: JSON.stringify('/'),
      'process.env': config,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]_[contenthash:8].css',
      ignoreOrder: true,
    }),
    // 进度条
    new WebpackBar({
      reporters: ['fancy', 'profile'],
      profile: true,
    }),
    new CompressionPlugin({
      filename: '[path][base].gz',
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    moduleIds: 'natural',
    nodeEnv: 'production',
    runtimeChunk: false,
    minimize: true,
    mergeDuplicateChunks: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      // swcMinify后微服务调用异常，恢复旧的TerserPlugin
      new TerserPlugin({
        parallel: true,
        minify: TerserPlugin.esbuildMinify,
        terserOptions: {
          minify: true,
          minifyWhitespace: true,
          minifyIdentifiers: true,
          minifySyntax: true,
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial', // only package third parties that are initially dependent
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});
