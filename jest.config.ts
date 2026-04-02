import type { Config } from 'jest';

const config: Config = {
  projects: [
    {
      displayName: 'rn',
      haste: {
        defaultPlatform: 'ios',
        platforms: ['android', 'ios', 'native'],
      },
      testEnvironment: './jest.env.rn.js',
      resolver: 'react-native/jest/resolver.js',
      transform: {
        '\\.[jt]sx?$': [
          'babel-jest',
          {
            caller: { name: 'metro', bundler: 'metro', platform: 'ios' },
          },
        ],
      },
      transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|lucide-react-native)',
      ],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
      setupFiles: ['react-native/jest/setup.js', './jest.setup.ts'],
      testMatch: ['**/__tests__/**/*.test.ts?(x)'],
      testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
    },
  ],
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'stores/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!**/__tests__/**',
    '!**/node_modules/**',
  ],
};

export default config;
