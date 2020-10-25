module.exports = {
  parserPreset: 'conventional-changelog-conventionalcommits',
  // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build', // 影响构建系统或外部依赖关系的更改
        'chore', // 重新打包或更新了依赖等其他信息
        'ci', // 更改了持续集成文件和脚本
        'docs', // 文档更新
        'feat', // 新功能
        'fix', // 修复问题
        'perf', // 性能优化
        'refactor', // 重构代码，即没有添加功能也没有修复错误
        'revert', // 退回提交信息
        'style', // 样式更新或变更
        'test', // 测试信息
      ],
    ],
  },
};
