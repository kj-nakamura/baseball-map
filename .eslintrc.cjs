module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vitest-globals/env': true
  },
  ignorePatterns: ['dist/', 'node_modules/', '*.min.js', '*.bundle.js'],
  extends: [
    'eslint:recommended'
  ],
  plugins: [
    'vitest-globals'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // コードスタイル
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    
    // ベストプラクティス
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    
    // ES6+
    'prefer-const': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-spacing': 'error',
    
    // セキュリティ
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-script-url': 'error'
  },
  globals: {
    google: 'readonly'
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      rules: {
        'no-console': 'off'
      }
    }
  ]
};