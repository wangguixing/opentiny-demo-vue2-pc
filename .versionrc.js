module.exports = {
  // 自定义CHANGELOG.md的头部标题
  header: '# 标准框架 \n## 版本更新记录',
  // 自定义release tag 的信息
  issueUrlFormat: 'http://10.10.24.62/bug-view-{{id}}.html',
  commitUrlFormat: 'https://codeup.aliyun.com//60668a6432fceefde379c549/zcStandar/zc-standar-fontend/commit/{{hash}}',

  /**
   * 自定义commit类型
   * 可以定义有哪些类型；
   * section：控制类型在CHANGELOG.md中的标题是什么
   * hidden：是否将此类型写入CHANGELOG.md
   */
  types: [
    { type: 'feat', section: '  Features' },
    { type: 'feature', section: 'Features' },
    { type: 'fix', section: 'Bug Fixes' },
    { type: 'perf', section: 'Performance Improvements' },
    { type: 'revert', section: 'Reverts' },
    { type: 'docs', section: 'Documentation' },
    { type: 'style', section: 'Styles' },
    { type: 'chore', section: 'Miscellaneous Chores' },
    { type: 'refactor', section: 'Code Refactoring' },
    { type: 'test', section: 'Tests', hidden: true },
    { type: 'build', section: 'Build System', hidden: true },
    { type: 'ci', section: 'Continuous Integration' },
  ],
};
