const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    "url": "http://localhost:3000"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{tsx, ts}",
    "!<rootDir>/src/**/*.{spec, test}.{tsx, ts}"
  ],
  coverageReporters: ['clover', 'json', 'lcov'],
}

module.exports = createJestConfig(customJestConfig)
