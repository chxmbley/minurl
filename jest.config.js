const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const config = {
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  modulePathIgnorePatterns: ['cypress'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: { '^~(.*)$': '<rootDir>/src/$1' },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(config);
