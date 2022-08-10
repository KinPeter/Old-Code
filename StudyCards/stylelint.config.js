module.exports = {
  ignoreFiles: [
    '.nuxt/**/*',
    '.vscode/**/*',
    '@/**/*',
    'node_modules/**/*',
    'coverage/**/*',
    '.vscode/**/*',
    '.nuxt/**/*.css',
    '@/**/*',
  ],
  extends: 'stylelint-config-standard',
  defaultSeverity: 'warning',
  rules: {
    'max-line-length': 80,
  },
}
