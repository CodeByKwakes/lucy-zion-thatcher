module.exports = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
  rules: {
    'scope-enum': [2, 'always', ['web-app', 'blogs', 'core', 'pages', 'shared']]
  }
};
