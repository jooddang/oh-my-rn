import type { ConfigContext, ExpoConfig } from 'expo/config';

const EAS_PROJECT_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const APP_ENV_VALUES = ['development', 'staging', 'production'] as const;
const LOOPBACK_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1']);

function getExtraEnv(easProjectId?: string): Record<string, string> {
  const rawApiUrl = process.env.API_URL?.trim();
  const rawAppEnv = process.env.APP_ENV?.trim();
  const appEnv = rawAppEnv ?? 'development';

  if (!APP_ENV_VALUES.includes(appEnv as (typeof APP_ENV_VALUES)[number])) {
    throw new Error(`APP_ENV must be one of: ${APP_ENV_VALUES.join(', ')}.`);
  }

  if (easProjectId && (!rawApiUrl || !rawAppEnv)) {
    throw new Error(
      'Set API_URL and APP_ENV in the active environment. For local development after linking a project, copy .env.example to .env.',
    );
  }

  if (appEnv !== 'development') {
    if (!rawApiUrl) {
      throw new Error(`API_URL is required when APP_ENV is ${appEnv}.`);
    }

    let apiUrl: URL;
    try {
      apiUrl = new URL(rawApiUrl);
    } catch {
      throw new Error('API_URL must be a valid URL.');
    }

    const hostname = apiUrl.hostname.replace(/^\[|\]$/g, '');
    if (apiUrl.protocol !== 'https:' || LOOPBACK_HOSTS.has(hostname)) {
      throw new Error(`API_URL must be a non-loopback HTTPS URL when APP_ENV is ${appEnv}.`);
    }
  }

  return {
    API_URL: rawApiUrl ?? 'http://localhost:3000',
    APP_ENV: appEnv,
  };
}

export function getEasProjectId(
  projectId: unknown,
  isEasBuildRequired = false,
): string | undefined {
  if (projectId !== undefined && typeof projectId !== 'string') {
    throw new Error('extra.eas.projectId in app.json must be a string.');
  }

  const trimmedProjectId = projectId?.trim();

  if (!trimmedProjectId) {
    if (isEasBuildRequired) {
      throw new Error('Run "eas init" before building or publishing an EAS update.');
    }
    return undefined;
  }

  if (!EAS_PROJECT_ID_PATTERN.test(trimmedProjectId)) {
    throw new Error('extra.eas.projectId in app.json must be an EAS project UUID.');
  }

  return trimmedProjectId;
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const isEasBuild =
    Boolean(process.env.EAS_BUILD_PROFILE) || process.env.EAS_REQUIRE_PROJECT_ID === 'true';
  const easProjectId = getEasProjectId(config.extra?.eas?.projectId, isEasBuild);
  const extraEnv = getExtraEnv(easProjectId);

  return {
    ...config,
    name: 'oh-my-rn',
    slug: 'oh-my-rn',
    ...(easProjectId
      ? {
          runtimeVersion: { policy: 'fingerprint' as const },
          updates: {
            url: `https://u.expo.dev/${easProjectId}`,
            checkAutomatically: 'ON_LOAD' as const,
            fallbackToCacheTimeout: 0,
          },
        }
      : {}),
    extra: {
      ...config.extra,
      ...extraEnv,
      ...(easProjectId ? { eas: { ...config.extra?.eas, projectId: easProjectId } } : {}),
    },
    plugins: [
      'expo-router',
      'expo-secure-store',
      'expo-font',
      [
        'expo-splash-screen',
        {
          backgroundColor: '#ffffff',
          image: './assets/images/splash-icon.png',
          resizeMode: 'contain',
        },
      ],
      'expo-status-bar',
    ],
  };
};
