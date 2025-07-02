import vitest from 'eslint-plugin-vitest-globals';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '**/*.min.js', '**/*.bundle.js', '.astro/**', '**/*.d.ts']
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        google: 'readonly',
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        // Vitestグローバル
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly'
      }
    },
    plugins: {
      'vitest-globals': vitest
    },
    rules: {
      // コードスタイル
      'indent': ['error', 2],
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
    }
  },
  {
    files: ['tests/**/*.js'],
    rules: {
      'no-console': 'off'
    }
  }
];