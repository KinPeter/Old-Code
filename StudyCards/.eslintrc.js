module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    // There is a typescript counterpart which work better
    'no-useless-constructor': ['off'],

    'no-unused-vars': ['off'],
    '@typescript-eslint/no-unused-vars': ['warn'],

    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],

    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        'newlines-between': 'never',
      },
    ],

    'vue/attributes-order': [
      'warn',
      {
        // This is the official order recommended by Vue's style guide
        // This should be the default, but just to be safe, we explicitly define it here
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
      },
    ],
  },
}
