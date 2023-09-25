/*
 * @Author: wangguixing
 * @Date: 2023-05-25 21:00:23
 * @LastEditors: wangguixing
 * @LastEditTime: 2023-09-25 16:19:40
 * @FilePath: \build\webpack.common.js
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const nodePolyfill = require('node-polyfill-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { getExternals, getCdnConfig, resolve } = require('./utils');

module.exports = {
  entry: {
    index: './src/main.js',
  },
  output: {
    uniqueName: 'vue2Template',
    filename: 'static/js/[name].[fullhash:8].js',
    path: resolve('dist'),
    publicPath: process.env.ENV !== 'development' ? '/' : '/',
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [resolve('.env.development'), resolve('.env.production')],
    },
    compression: 'gzip',
    cacheDirectory: resolve('.temp_cache'),
  },
  externals: getExternals(),
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(png|gif|webp|jpe?g)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: 'static/img/[name].[ext]',
        },
        type: 'javascript/auto',
      },
      {
        test: /\.svg$/,
        include: resolve('src/assets/icons'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
            },
          },
        ],
        generator: {
          filename: 'static/icons/[name].[ext]',
        },
        type: 'javascript/auto',
      },
      {
        test: /\.(ttf|woff2?|eot)$/,
        type: 'asset/resource', // 指定静态资源类复制
        generator: {
          filename: 'static/fontAssets/[name][ext]', // 放入font目录下
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new nodePolyfill(),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
      inject: 'body',
      minify: {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空符与换符
        minifyCSS: true, // 压缩内联css
      },
      cdnConfig: getCdnConfig(),
      output: {
        path: resolve('dist'),
      },
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('public'),
          to: resolve('dist'),
          globOptions: {
            dot: true,
            gitignore: false,
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
  resolve: {
    symlinks: false,
    extensions: ['.vue', '.js', '.mjs'],
    alias: {
      vue$: 'vue/dist/vue.common.js',
      '~': resolve('src'),
      static: resolve('static'),
    },
  },
};
