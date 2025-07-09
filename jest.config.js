export default {
  testEnvironment: 'jsdom',

  // Transform configuration
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '.+\\.(css|sass|scss|png|jpg|svg|ttf|woff|woff2)$': 'jest-transform-stub'
  },

  // Module resolution
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/i18n$': '<rootDir>/src/i18n.js'
  },

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.js'],

  // Test patterns
  testPathIgnorePatterns: ['/node_modules/', '/tests/', '/tests-examples/'],
  testMatch: ['**/__tests__/**/*.(js|jsx)', '**/?(*.)+(spec|test).(js|jsx)'],

  // Module file extensions
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  // Coverage configuration
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.stories.{js,jsx}',
    '!src/tests/**',
    '!src/index.jsx',
    '!src/vite-env.d.js',
    '!src/App.jsx',
    '!src/i18n.js'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },

  // Performance settings
  testTimeout: 10000,
  maxWorkers: '50%',

  // Mock settings
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  // Transform ignore patterns for ESM modules
  transformIgnorePatterns: [
    'node_modules/(?!(lucide-react|@tanstack|@hookform|react-toastify)/)'
  ],

  // Error handling
  verbose: true,
  errorOnDeprecated: true,

  // Global variables
  globals: {
    __DEV__: true
  }
}
