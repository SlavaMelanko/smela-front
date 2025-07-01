export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '.+\\.(css|sass|scss|png|jpg|svg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/i18n$': '<rootDir>/src/i18n.js'
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/', '/tests-examples/']
}
