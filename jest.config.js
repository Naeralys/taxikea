/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  collectCoverage: true,
  coverageReporters: [
    'text-summary'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    'ts-jest/utils': './node_modules/ts-jest/utils/dist'
  },
  transform: {
    '^.+\\.(?:ts|js)?$': 'ts-jest'
  },
  modulePaths: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  roots: ['<rootDir>']
}
