import type { Config } from 'jest';

const config: Config = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  // Add projects configuration for server and client tests
  projects: [
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/server/**/__tests__/**/*.[jt]s?(x)',
        '<rootDir>/server/**/*.test.[jt]s?(x)',
      ],
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: 'tsconfig.json'
        }]
      },
    },
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/client/**/__tests__/**/*.[jt]s?(x)',
        '<rootDir>/client/**/*.test.[jt]s?(x)',
      ],
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: 'tsconfig.json'
        }]
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    }
  ],

  // Remove the root-level transform since we're defining it in projects
  // transform: {
  //   "^.+\\.(ts|tsx)$": "ts-jest",
  //   "^.+\\.(js|jsx)$": "babel-jest",
  // },

  // Remove preset since we're configuring ts-jest in projects
  // preset: 'ts-jest',
}; 

export default config;