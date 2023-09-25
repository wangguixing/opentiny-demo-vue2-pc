/*
 * @Author: wangguixing
 * @Date: 2023-08-08 10:26:04
 * @LastEditors: wangguixing
 * @LastEditTime: 2023-09-25 16:04:33
 * @FilePath: \jsconfig.js
 */
module.exports = {
  vueCompilerOptions: {
    target: 2.7,
  },
  compilerOptions: {
    baseUrl: './',
    paths: {
      '~/*': ['src/*'],
    },
  },
  include: ['src/**/*'],
  exclude: ['node_modules', 'dist'],
};
