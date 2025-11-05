// import type { Config } from 'jest'
// import nextJest from 'next/jest.js'

// const createJestConfig = nextJest({
//   dir: './',
// })

// const config: Config = {
//   coverageProvider: 'v8',
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//   },
//   testMatch: [
//     '**/__tests__/**/*.test.(ts|tsx)',
//     '**/?(*.)+(spec|test).(ts|tsx)',
//   ],
// }

// export default createJestConfig(config)
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Mapeo de alias para Jest
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/production/(.*)$': '<rootDir>/src/production/$1',
    '^@/Shared/(.*)$': '<rootDir>/src/Shared/$1',
    '^@/Insfraestructure/(.*)$': '<rootDir>/src/Insfraestructure/$1',
  },
  testMatch: [
    '**/__tests__/**/*.test.(ts|tsx)',
    '**/?(*.)+(spec|test).(ts|tsx)',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
}

export default createJestConfig(config)
