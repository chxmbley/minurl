const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const config = {
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 100,
      lines: 95,
      statements: 95,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: { '^~(.*)$': '<rootDir>/src/$1' },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(config);
