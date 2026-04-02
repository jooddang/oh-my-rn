import Constants from 'expo-constants';

type AppEnv = 'development' | 'staging' | 'production';

interface Env {
  API_URL: string;
  APP_ENV: AppEnv;
}

const extra = Constants.expoConfig?.extra;

const APP_ENV_VALUES: readonly AppEnv[] = ['development', 'staging', 'production'];

function parseAppEnv(value: unknown): AppEnv {
  if (typeof value === 'string' && APP_ENV_VALUES.includes(value as AppEnv)) {
    return value as AppEnv;
  }
  return 'development';
}

const parsedAppEnv = parseAppEnv(extra?.APP_ENV);
const rawApiUrl = typeof extra?.API_URL === 'string' ? extra.API_URL : 'http://localhost:3000';

if (parsedAppEnv !== 'development' && !rawApiUrl.startsWith('https://')) {
  console.error(
    `[env] API_URL is not using HTTPS in ${parsedAppEnv} environment. This is a security risk. Set API_URL to an https:// URL.`,
  );
}

export const env: Env = {
  API_URL: rawApiUrl,
  APP_ENV: parsedAppEnv,
};
