const nextJest = require('next/jest')

const createJestConfig = nextJest({ 
  dir: './',
})

//  config  
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
 
  
  // Test files pattern
  testMatch: [
    '**/__tests__/**/*.(test|spec).(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],
   
  testPathIgnorePatterns: [
    '/node_modules/', 
    '/.next/',
    '/__tests__/mocks/'
  ],
   
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}
 
module.exports = createJestConfig(customJestConfig)