module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '**/*.spec.js'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/tests'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest'
  }
}
