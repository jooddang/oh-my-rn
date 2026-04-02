import type { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'oh-my-rn',
  slug: 'oh-my-rn',
  extra: {
    API_URL: process.env.API_URL ?? 'http://localhost:3000',
    APP_ENV: process.env.APP_ENV ?? 'development',
  },
  plugins: ['expo-router', 'expo-secure-store', 'expo-font'],
});
