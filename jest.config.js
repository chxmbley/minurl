const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: { '^~(.*)$': '<rootDir>/src/$1' },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(config);
