/*
 * @Author: MingWei.Wu <wu_mingwei@yeah.net>
 * @Copyright: 2021-present, ZhongCheng, Inc. All rights reserved.
 * @Date: 2022-10-14 09:00:55
 * @LastEditTime: 2023-07-13 14:46:05
 * @LastEditors: wangguixing
 */
module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'entry',
        corejs: '3.6.5',
        jsx: false,
      },
    ],
    ['@vue/babel-preset-jsx', { compositionAPI: true, injectH: true }],
  ],
  env: {
    development: {
      plugins: ['dynamic-import-node'],
    },
  },
};
